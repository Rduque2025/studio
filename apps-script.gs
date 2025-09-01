// Define a global constant for the sheet name to avoid magic strings
const USERS_SHEET_NAME = "Users";
const ACCESS_LOGS_SHEET_NAME = "Access Logs";
const CALENDAR_EVENTS_SHEET_NAME = "Calendar Events";

/**
 * Handles all POST requests to the web app.
 * Acts as a router to call the appropriate function based on the 'action' parameter.
 * @param {Object} e - The event parameter containing the POST data.
 * @return {ContentService.TextOutput} - A JSON response.
 */
function doPost(e) {
  try {
    // Parse the request body
    const requestData = JSON.parse(e.postData.contents);
    let responseData;

    // Route the request based on the 'action' property
    switch (requestData.action) {
      case 'register':
        responseData = registerUser(requestData.email, requestData.password);
        break;
      case 'login':
        responseData = loginUser(requestData.email, requestData.password);
        break;
      case 'getCalendarEvents':
        responseData = { success: true, data: getCalendarEventsFromSheet() };
        break;
      default:
        // If no action or an unknown action is provided, return an error
        responseData = { success: false, message: 'Invalid action specified.' };
        break;
    }
    
    // Return the response as JSON
    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error for debugging
    console.error("Error in doPost:", error.toString());
    // Return a generic error message
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'An internal server error occurred.', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Registers a new user in the "Users" sheet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {Object} - An object indicating success or failure.
 */
function registerUser(email, password) {
  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  if (!sheet) {
    return { success: false, message: `Sheet "${USERS_SHEET_NAME}" not found.` };
  }
  
  const data = sheet.getDataRange().getValues();
  // Check if user already exists
  const userExists = data.some(row => row[0] === email);
  if (userExists) {
    return { success: false, message: 'User already exists.' };
  }
  
  // Add new user
  sheet.appendRow([email, password]);
  return { success: true, message: 'User registered successfully.' };
}

/**
 * Logs in a user by checking credentials in the "Users" sheet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {Object} - An object indicating success or failure.
 */
function loginUser(email, password) {
  if (!email || !password) {
    return { success: false, message: 'Email and password are required.' };
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
   if (!sheet) {
    return { success: false, message: `Sheet "${USERS_SHEET_NAME}" not found.` };
  }

  const data = sheet.getDataRange().getValues();
  // Find user and check password
  const user = data.find(row => row[0] === email && row[1] === password);
  
  if (user) {
    logAccess(email, 'Login Success');
    return { success: true, message: 'Login successful.' };
  } else {
    logAccess(email, 'Login Failed');
    return { success: false, message: 'Invalid credentials.' };
  }
}

/**
 * Logs an access attempt to the "Access Logs" sheet.
 * @param {string} email - The email used for the access attempt.
 * @param {string} status - The status of the attempt (e.g., 'Login Success', 'Login Failed').
 */
function logAccess(email, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCESS_LOGS_SHEET_NAME);
  if (sheet) {
    sheet.appendRow([new Date(), email, status]);
  } else {
    console.error(`Sheet "${ACCESS_LOGS_SHEET_NAME}" not found. Could not log access attempt.`);
  }
}

/**
 * Retrieves events and birthdays from the "Calendar Events" sheet.
 * @return {Array<Object>} - An array of objects, each representing a day with its events and birthdays.
 */
function getCalendarEventsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CALENDAR_EVENTS_SHEET_NAME);
  if (!sheet) {
    console.error(`Sheet named "${CALENDAR_EVENTS_SHEET_NAME}" not found.`);
    return []; // Return an empty array if sheet doesn't exist
  }

  // Get all data, assuming row 1 is the header
  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // Remove and get header row

  // Find column indices for events and birthdays
  const eventCols = headers.reduce((acc, header, index) => {
    if (header.startsWith('event_')) acc.push(index);
    return acc;
  }, []);
  
  const birthdayCols = headers.reduce((acc, header, index) => {
    if (header.startsWith('birthday_')) acc.push(index);
    return acc;
  }, []);

  // Process rows into the desired JSON structure
  const eventsData = data.map(row => {
    const date = row[0];
    if (!date) return null; // Skip rows without a date

    // Get all non-empty events and birthdays for the row
    const events = eventCols.map(colIndex => row[colIndex]).filter(Boolean);
    const birthdays = birthdayCols.map(colIndex => row[colIndex]).filter(Boolean);

    return {
      date: new Date(date).toISOString(), // Standardize date format to ISO string
      events: events,
      birthdays: birthdays,
    };
  }).filter(Boolean); // Filter out any null rows

  return eventsData;
}
