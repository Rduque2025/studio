// apps-script.gs

// --- CONFIGURATION ---
const USERS_SHEET_NAME = "Users";
const ACCESS_LOGS_SHEET_NAME = "Access Logs";
const CALENDAR_EVENTS_SHEET_NAME = "Calendar Events";
const MENU_SHEET_NAME = "Menu";


// --- MAIN ROUTER ---
/**
 * Handles POST requests to the web app.
 * Acts as a router to call different functions based on the 'action' parameter.
 */
function doPost(e) {
  let responseData;
  let action;

  try {
    // Parse the request payload to get the action
    const payload = JSON.parse(e.postData.contents);
    action = payload.action;

    switch (action) {
      case 'register':
        responseData = handleRegister(payload);
        break;
      case 'login':
        responseData = handleLogin(payload);
        break;
      case 'getCalendarEvents':
        const events = getCalendarEventsFromSheet();
        responseData = { success: true, data: events };
        break;
      case 'getMenuItems':
        const menuItems = getMenuItemsFromSheet();
        responseData = { success: true, data: menuItems }; // Corrected line
        break;
      default:
        responseData = { success: false, message: `Unknown action: ${action}` };
    }
  } catch (error) {
    console.error(`Error in doPost for action "${action}": ${error.toString()}`);
    responseData = { success: false, message: `Server error: ${error.toString()}` };
  }

  // Return the response as a JSON object
  return ContentService
    .createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}


// --- ACTION HANDLERS ---

/**
 * Handles user registration.
 */
function handleRegister(payload) {
  if (!payload.email || !payload.password) {
    return { success: false, message: "Email and password are required." };
  }
  return registerUser(payload.email, payload.password);
}

/**
 * Handles user login.
 */
function handleLogin(payload) {
  if (!payload.email || !payload.password) {
    return { success: false, message: "Email and password are required." };
  }
  return loginUser(payload.email, payload.password);
}


// --- CORE FUNCTIONS ---

/**
 * Registers a new user in the "Users" sheet.
 */
function registerUser(email, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  const users = sheet.getDataRange().getValues();

  // Check if user already exists
  for (let i = 1; i < users.length; i++) {
    if (users[i][0] === email) {
      return { success: false, message: "User with this email already exists." };
    }
  }

  // Add new user
  sheet.appendRow([email, password]); // In a real app, hash the password!
  logAccess(email, "register", "success");
  return { success: true, message: "User registered successfully." };
}

/**
 * Logs in a user by checking credentials in the "Users" sheet.
 */
function loginUser(email, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  const users = sheet.getDataRange().getValues();

  for (let i = 1; i < users.length; i++) {
    if (users[i][0] === email && users[i][1] === password) {
      logAccess(email, "login", "success");
      return { success: true, message: "Login successful." };
    }
  }
  
  logAccess(email, "login", "failure");
  return { success: false, message: "Invalid email or password." };
}

/**
 * Logs an access attempt to the "Access Logs" sheet.
 */
function logAccess(email, type, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCESS_LOGS_SHEET_NAME);
  sheet.appendRow([new Date(), email, type, status]);
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

  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // Remove and get header row

  const eventCols = headers.reduce((acc, header, index) => {
    if (header.toLowerCase().startsWith('event_')) acc.push(index);
    return acc;
  }, []);
 
  const birthdayCols = headers.reduce((acc, header, index) => {
    if (header.toLowerCase().startsWith('birthday_')) acc.push(index);
    return acc;
  }, []);

  const eventsData = data.map(row => {
    const date = row[0];
    if (!date || !(date instanceof Date)) return null;

    const events = eventCols.map(colIndex => row[colIndex]).filter(String);
    const birthdays = birthdayCols.map(colIndex => row[colIndex]).filter(String);

    if (events.length === 0 && birthdays.length === 0) return null;

    return {
      date: date.toISOString(),
      events: events,
      birthdays: birthdays,
    };
  }).filter(Boolean);

  return eventsData;
}


/**
 * Retrieves menu items from the "Menu" sheet.
 */
function getMenuItemsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MENU_SHEET_NAME);
  if (!sheet) {
    console.error(`Sheet named "${MENU_SHEET_NAME}" not found.`);
    return [];
  }
  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // Remove header row

  // Map headers to indices for robustness
  const headerMap = headers.reduce((acc, header, index) => {
    acc[header.toLowerCase()] = index;
    return acc;
  }, {});

  const menuItems = data.map((row, index) => {
    // Basic validation to ensure required fields exist
    if (!row[headerMap['day']] || !row[headerMap['name']] || !row[headerMap['type']]) {
      return null;
    }
    return {
      id: `M${index + 1}`, // Generate a simple ID
      day: row[headerMap['day']],
      name: row[headerMap['name']],
      description: row[headerMap['description']] || "",
      imageUrl: row[headerMap['imageurl']] || "",
      price: row[headerMap['price']] || "",
      type: row[headerMap['type']],
    };
  }).filter(Boolean); // Filter out any null (invalid) rows

  return menuItems;
}
