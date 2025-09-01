// This is for V8 runtime.
const SPREADSHEET_ID = "12849hS71gUf_1f-G2D-1y-a-5f33-b-dE9921_12345";
const USERS_SHEET = "Users";
const ACCESS_LOGS_SHEET = "Access Logs";
const CALENDAR_EVENTS_SHEET = "Calendar Events";
const MENU_SHEET = "Menu"; // New sheet for menu items

/**
 * Main entry point for web app requests.
 * This function acts as a controller, routing requests to the appropriate function based on the 'action' parameter.
 */
function doPost(e: GoogleAppsScript.Events.DoPost) {
  try {
    const request = JSON.parse(e.postData.contents);

    switch (request.action) {
      case 'register':
        return handleRegister(request);
      case 'login':
        return handleLogin(request);
      case 'getCalendarEvents':
        return handleGetCalendarEvents();
      case 'getMenuItems':
        return handleGetMenuItems(); // New case for menu items
      default:
        return createJsonResponse({ success: false, message: 'Invalid action' });
    }
  } catch (error) {
    Logger.log(error);
    return createJsonResponse({ success: false, message: 'An error occurred', error: error.toString() });
  }
}

/**
 * Handles user registration.
 */
function handleRegister(request: any) {
  if (!request.email || !request.password) {
    return createJsonResponse({ success: false, message: 'Email and password are required' });
  }
  return registerUser(request.email, request.password);
}

/**
 * Handles user login.
 */
function handleLogin(request: any) {
  if (!request.email || !request.password) {
    return createJsonResponse({ success: false, message: 'Email and password are required' });
  }
  return loginUser(request.email, request.password);
}

/**
 * Handles fetching calendar events.
 */
function handleGetCalendarEvents() {
  const data = getCalendarEventsFromSheet();
  return createJsonResponse({ success: true, data: data });
}

/**
 * Handles fetching menu items.
 */
function handleGetMenuItems() {
  const data = getMenuItemsFromSheet();
  return createJsonResponse({ success: true, data: data });
}

/**
 * Creates a JSON response object for the web app.
 */
function createJsonResponse(responseObject: object) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Registers a new user in the "Users" sheet.
 */
function registerUser(email: string, password: string) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(USERS_SHEET);
  if (!sheet) {
    return createJsonResponse({ success: false, message: 'Users sheet not found' });
  }
  const users = sheet.getDataRange().getValues();
  const userExists = users.some(row => row[0] === email);

  if (userExists) {
    return createJsonResponse({ success: false, message: 'User already exists' });
  }

  // Note: Storing plain text passwords is not secure. This is for demonstration only.
  // In a real application, you should use a secure authentication method.
  sheet.appendRow([email, password]);
  return createJsonResponse({ success: true, message: 'User registered successfully' });
}

/**
 * Logs a user in by checking credentials against the "Users" sheet.
 */
function loginUser(email: string, password: string) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(USERS_SHEET);
  if (!sheet) {
    return createJsonResponse({ success: false, message: 'Users sheet not found' });
  }
  const users = sheet.getDataRange().getValues();
  const user = users.find(row => row[0] === email && row[1] === password);

  if (user) {
    logAccess(email, 'SUCCESS');
    return createJsonResponse({ success: true, message: 'Login successful' });
  } else {
    logAccess(email, 'FAILURE');
    return createJsonResponse({ success: false, message: 'Invalid email or password' });
  }
}

/**
 * Logs an access attempt to the "Access Logs" sheet.
 */
function logAccess(email: string, status: 'SUCCESS' | 'FAILURE') {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(ACCESS_LOGS_SHEET);
  if (!sheet) {
    Logger.log('Access Logs sheet not found');
    return;
  }
  sheet.appendRow([new Date(), email, status]);
}

/**
 * Retrieves events and birthdays from the "Calendar Events" sheet.
 */
function getCalendarEventsFromSheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(CALENDAR_EVENTS_SHEET);
  if (!sheet) {
    Logger.log('Calendar Events sheet not found');
    return [];
  }
  const data = sheet.getDataRange().getValues();
  const headers = data.shift() || []; // Remove header row

  const dateIndex = headers.indexOf('Date');
  const eventIndex = headers.indexOf('Event');
  const birthdayIndex = headers.indexOf('Birthday');

  if (dateIndex === -1 || eventIndex === -1 || birthdayIndex === -1) {
    Logger.log('Required columns (Date, Event, Birthday) not found in Calendar Events sheet.');
    return [];
  }

  const eventsByDate = {};

  data.forEach(row => {
    const dateValue = row[dateIndex];
    if (dateValue) {
      const date = new Date(dateValue);
      const dateString = date.toISOString(); // Use ISO string as a key

      if (!eventsByDate[dateString]) {
        eventsByDate[dateString] = {
          date: dateString,
          events: [],
          birthdays: []
        };
      }
      
      const eventTitle = row[eventIndex];
      if (eventTitle) {
        eventsByDate[dateString].events.push(eventTitle);
      }
      
      const birthdayName = row[birthdayIndex];
      if (birthdayName) {
        eventsByDate[dateString].birthdays.push(birthdayName);
      }
    }
  });

  return Object.values(eventsByDate);
}


/**
 * Retrieves menu items from the "Menu" sheet.
 */
function getMenuItemsFromSheet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(MENU_SHEET);
  if (!sheet) {
    Logger.log('Menu sheet not found');
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data.shift() || []; // Remove header row and get headers

  // Find column indices by header name to be more flexible
  const dayIndex = headers.indexOf('Day');
  const classicDishIndex = headers.indexOf('Classic Dish');
  const classicImgIndex = headers.indexOf('Classic Image URL');
  const dietDishIndex = headers.indexOf('Diet Dish');
  const dietImgIndex = headers.indexOf('Diet Image URL');
  const execDishIndex = headers.indexOf('Executive Dish');
  const execImgIndex = headers.indexOf('Executive Image URL');
  
  if (dayIndex === -1 || classicDishIndex === -1 || dietDishIndex === -1 || execDishIndex === -1) {
    Logger.log('One or more required columns are missing in the Menu sheet.');
    return [];
  }

  const menuItems: object[] = [];

  data.forEach((row, i) => {
    const day = row[dayIndex];
    if (!day) return; // Skip if day is not specified

    // Classic Menu Item
    if (row[classicDishIndex]) {
      menuItems.push({
        id: `C${i}`,
        day: day,
        name: row[classicDishIndex],
        description: `Plato clásico del día: ${row[classicDishIndex]}`,
        imageUrl: row[classicImgIndex] || '', // Send empty string if no URL
        price: '100 Bs.',
        type: 'Clásico'
      });
    }

    // Diet Menu Item
    if (row[dietDishIndex]) {
      menuItems.push({
        id: `D${i}`,
        day: day,
        name: row[dietDishIndex],
        description: `Opción de dieta: ${row[dietDishIndex]}`,
        imageUrl: row[dietImgIndex] || '', // Send empty string if no URL
        price: '100 Bs.',
        type: 'Dieta'
      });
    }

    // Executive Menu Item
    if (row[execDishIndex]) {
      menuItems.push({
        id: `E${i}`,
        day: day,
        name: row[execDishIndex],
        description: `Menú ejecutivo: ${row[execDishIndex]}`,
        imageUrl: row[execImgIndex] || '', // Send empty string if no URL
        price: '13 $',
        type: 'Ejecutivo'
      });
    }
  });

  return menuItems;
}
