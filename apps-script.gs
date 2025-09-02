
// =================================================================
//                 *** CONFIGURATION ***
// =================================================================
// Update these names to match the exact names of your sheets
// =================================================================
const USERS_SHEET_NAME = "Users";
const ACCESS_LOGS_SHEET_NAME = "Access Logs";
const CALENDAR_EVENTS_SHEET_NAME = "Calendar Events";
const MENU_SHEET_NAME = "Menu";


// =================================================================
//                 *** WEB APP ENTRY POINT ***
// =================================================================
// This function is the single entry point for all requests from your web app.
// It handles both GET and POST requests and routes them to the appropriate function
// based on the 'action' parameter in the request.
// =================================================================
function doPost(e) {
  try {
    // Log the incoming request for debugging
    logAccess(`Request received: ${e.postData.contents}`);


    const params = JSON.parse(e.postData.contents);
    const action = params.action;


    let responseData;


    switch (action) {
      case 'register':
        responseData = registerUser(params.email, params.password);
        break;
      case 'login':
        responseData = loginUser(params.email, params.password);
        break;
      case 'getCalendarEvents':
        responseData = { success: true, data: getCalendarEventsFromSheet() };
        break;
      case 'getMenuItems':
        responseData = { success: true, data: getMenuItemsFromSheet() };
        break;
      default:
        responseData = { success: false, message: "Invalid action specified." };
        break;
    }


    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);


  } catch (error) {
    console.error(`Error in doPost: ${error.toString()}`);
    logAccess(`Error processing request: ${error.toString()}`);
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: `Server error: ${error.toString()}` }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}




// =================================================================
//                 *** CALENDAR EVENTS FUNCTION ***
// =================================================================
// Retrieves events and birthdays from the "Calendar Events" sheet
// based on the specified column structure.
// =================================================================
function getCalendarEventsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CALENDAR_EVENTS_SHEET_NAME);
  if (!sheet) {
    console.error(`Sheet named "${CALENDAR_EVENTS_SHEET_NAME}" not found.`);
    return [];
  }


  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // Remove and get the header row


  // Define column indices based on the structure you provided
  const dateColumnIndex = 0; // Column A
  const eventStartColumn = 1;  // Column B
  const eventEndColumn = 5;    // Column F
  const birthdayStartColumn = 6; // Column G
  const birthdayEndColumn = 10;  // Column K


  const eventsData = data.map(row => {
    const dateValue = row[dateColumnIndex];
    if (!dateValue || !(dateValue instanceof Date)) {
      return null; // Skip rows without a valid date in the first column
    }


    const events = [];
    for (let i = eventStartColumn; i <= eventEndColumn; i++) {
      if (row[i]) {
        events.push(row[i].toString().trim());
      }
    }


    const birthdays = [];
    for (let i = birthdayStartColumn; i <= birthdayEndColumn; i++) {
      if (row[i]) {
        birthdays.push(row[i].toString().trim());
      }
    }


    // Only include the day if there are events or birthdays
    if (events.length > 0 || birthdays.length > 0) {
      return {
        date: dateValue.toISOString(),
        events: events,
        birthdays: birthdays,
      };
    }


    return null;
  }).filter(Boolean); // Filter out any null rows


  return eventsData;
}


// =================================================================
//                 *** MENU ITEMS FUNCTION ***
// =================================================================
// Retrieves the weekly menu from the "Menu" sheet.
// =================================================================
function getMenuItemsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MENU_SHEET_NAME);
  if (!sheet) {
    console.error(`Sheet named "${MENU_SHEET_NAME}" not found.`);
    return [];
  }


  const data = sheet.getDataRange().getValues();
  const headers = data.shift();


  const menuItems = data.map((row, index) => {
    const item = {};
    headers.forEach((header, i) => {
      // Create a unique ID for each menu item
      if (header.toLowerCase() === 'id' || !item.hasOwnProperty('id')) {
        item['id'] = `menu-${index + 1}`;
      }
      item[header.toLowerCase()] = row[i];
    });
    return item;
  });


  return menuItems;
}




// =================================================================
//                 *** AUTHENTICATION FUNCTIONS ***
// =================================================================
// Handles user registration and login.
// =================================================================


/**
 * Registers a new user in the "Users" sheet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {Object} - A result object with success status and a message.
 */
function registerUser(email, password) {
  const usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  if (!usersSheet) {
    return { success: false, message: "User sheet not found." };
  }


  const emails = usersSheet.getRange("A:A").getValues().flat();
  if (emails.includes(email)) {
    return { success: false, message: "El correo ya está registrado." };
  }


  usersSheet.appendRow([email, password]); // Plain text password storage (not recommended for production)
  return { success: true, message: "Registro exitoso." };
}


/**
 * Logs in a user by checking credentials in the "Users" sheet.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {Object} - A result object with success status and a message.
 */
function loginUser(email, password) {
  const usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  if (!usersSheet) {
    return { success: false, message: "User sheet not found." };
  }
  
  const data = usersSheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email && data[i][1] === password) {
      logAccess(`Successful login for user: ${email}`);
      return { success: true, message: "Inicio de sesión exitoso." };
    }
  }


  logAccess(`Failed login attempt for user: ${email}`);
  return { success: false, message: "Correo o contraseña incorrectos." };
}




// =================================================================
//                 *** UTILITY & LOGGING FUNCTIONS ***
// =================================================================


/**
 * Logs access attempts to the "Access Logs" sheet for auditing.
 * @param {string} message - The message to log.
 */
function logAccess(message) {
  try {
    const logsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCESS_LOGS_SHEET_NAME);
    if (logsSheet) {
      logsSheet.appendRow([new Date(), message]);
    }
  } catch (error) {
    console.error(`Failed to log access: ${error.toString()}`);
  }
}
