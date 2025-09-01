// Constants for sheet names
const USERS_SHEET_NAME = 'Users';
const ACCESS_LOGS_SHEET_NAME = 'Access Logs';
const CALENDAR_SHEET_NAME = 'Calendar Events';
const MENU_SHEET_NAME = 'Menu';

/**
 * Handles HTTP POST requests to the web app.
 * This function acts as the main router for all incoming requests from the client application.
 * @param {Object} e The event parameter for a POST request.
 * @return {ContentService.TextOutput} A JSON response.
 */
function doPost(e) {
  try {
    const request = JSON.parse(e.postData.contents);
    let responseData;

    switch (request.action) {
      case 'register':
        responseData = registerUser(request.email, request.password);
        break;
      case 'login':
        responseData = loginUser(request.email, request.password);
        break;
      case 'getCalendarEvents':
        responseData = { success: true, data: getCalendarEventsFromSheet() };
        break;
      case 'getMenuItems':
        responseData = { success: true, data: getMenuItemsFromSheet() };
        break;
      default:
        responseData = { success: false, message: 'Invalid action specified.' };
        break;
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    const errorResponse = { success: false, message: 'An internal server error occurred.', error: error.toString() };
    return ContentService
      .createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Registers a new user in the "Users" sheet.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @return {Object} An object indicating success or failure.
 */
function registerUser(email, password) {
  const usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  const usersData = usersSheet.getDataRange().getValues();
  const emailColumnIndex = 0;

  const userExists = usersData.some(row => row[emailColumnIndex] === email);

  if (userExists) {
    return { success: false, message: 'El correo ya está registrado.' };
  }

  // Note: Storing plain text passwords is not secure. This is a simple implementation.
  // For production, consider using a more secure authentication method.
  usersSheet.appendRow([email, password, new Date()]);
  logAccess(email, 'REGISTER', 'SUCCESS');
  return { success: true, message: 'Usuario registrado exitosamente.' };
}

/**
 * Logs in a user by checking credentials against the "Users" sheet.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @return {Object} An object indicating success or failure.
 */
function loginUser(email, password) {
  const usersSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  const usersData = usersSheet.getDataRange().getValues();
  const emailColumnIndex = 0;
  const passwordColumnIndex = 1;

  const userRow = usersData.find(row => row[emailColumnIndex] === email);

  if (!userRow) {
    logAccess(email, 'LOGIN', 'FAILURE - User not found');
    return { success: false, message: 'Usuario no encontrado.' };
  }

  if (userRow[passwordColumnIndex] !== password) {
    logAccess(email, 'LOGIN', 'FAILURE - Invalid password');
    return { success: false, message: 'Contraseña incorrecta.' };
  }

  logAccess(email, 'LOGIN', 'SUCCESS');
  return { success: true, message: 'Inicio de sesión exitoso.' };
}

/**
 * Logs an access attempt to the "Access Logs" sheet.
 * @param {string} email The email of the user attempting to access.
 * @param {string} eventType The type of event (e.g., LOGIN, REGISTER).
 * @param {string} status The status of the event (e.g., SUCCESS, FAILURE).
 */
function logAccess(email, eventType, status) {
  const logsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCESS_LOGS_SHEET_NAME);
  logsSheet.appendRow([new Date(), email, eventType, status]);
}

/**
 * Fetches calendar events and birthdays from the "Calendar Events" sheet.
 * @return {Array<Object>} An array of objects, each representing a day with its events and birthdays.
 */
function getCalendarEventsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CALENDAR_SHEET_NAME);
  if (!sheet) return [];
  
  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values[0];
  const data = values.slice(1);

  const dateIndex = headers.indexOf('Date');
  const eventIndex = headers.indexOf('Event');
  const birthdayIndex = headers.indexOf('Birthday');

  if (dateIndex === -1) return []; // Essential column 'Date' is missing.

  const eventsByDate = {};

  data.forEach(row => {
    const dateValue = row[dateIndex];
    if (dateValue instanceof Date && !isNaN(dateValue)) {
      const dateString = dateValue.toISOString();
      if (!eventsByDate[dateString]) {
        eventsByDate[dateString] = { date: dateString, events: [], birthdays: [] };
      }
      if (eventIndex > -1 && row[eventIndex]) {
        eventsByDate[dateString].events.push(row[eventIndex]);
      }
      if (birthdayIndex > -1 && row[birthdayIndex]) {
        eventsByDate[dateString].birthdays.push(row[birthdayIndex]);
      }
    }
  });

  return Object.values(eventsByDate);
}

/**
 * Fetches menu items from the "Menu" sheet.
 * @return {Array<Object>} An array of menu item objects.
 */
function getMenuItemsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MENU_SHEET_NAME);
  if (!sheet) return [];

  const range = sheet.getDataRange();
  const values = range.getValues();
  const headers = values[0].map(h => h.trim());
  const data = values.slice(1);

  // Get column indices based on headers
  const dayIndex = headers.indexOf('Day');
  const classicDishIndex = headers.indexOf('Classic Dish');
  const classicImgIndex = headers.indexOf('Classic Image URL');
  const dietDishIndex = headers.indexOf('Diet Dish');
  const dietImgIndex = headers.indexOf('Diet Image URL');
  const execDishIndex = headers.indexOf('Executive Dish');
  const execImgIndex = headers.indexOf('Executive Image URL');
  
  const menuItems = [];
  
  data.forEach((row, i) => {
    // IMPORTANT: Skip empty rows to prevent errors
    if (!row[dayIndex] && !row[classicDishIndex] && !row[dietDishIndex] && !row[execDishIndex]) {
      return;
    }

    const day = row[dayIndex];
    
    // Process Classic Menu
    if (row[classicDishIndex]) {
      menuItems.push({
        id: `cl-${i}`,
        day: day,
        name: row[classicDishIndex],
        description: `Plato clásico para el ${day}.`,
        imageUrl: row[classicImgIndex] || '',
        price: "100 Bs.",
        type: 'Clásico'
      });
    }

    // Process Diet Menu
    if (row[dietDishIndex]) {
      menuItems.push({
        id: `di-${i}`,
        day: day,
        name: row[dietDishIndex],
        description: `Opción de dieta para el ${day}.`,
        imageUrl: row[dietImgIndex] || '',
        price: "100 Bs.",
        type: 'Dieta'
      });
    }

    // Process Executive Menu
    if (row[execDishIndex]) {
      menuItems.push({
        id: `ex-${i}`,
        day: day,
        name: row[execDishIndex],
        description: `Menú ejecutivo para el ${day}.`,
        imageUrl: row[execImgIndex] || '',
        price: "13 $",
        type: 'Ejecutivo'
      });
    }
  });

  return menuItems;
}
