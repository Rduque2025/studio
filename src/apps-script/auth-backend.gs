// This Google Apps Script provides backend functionality for a user authentication system
// and calendar event management using a Google Sheet as a database.

// Set up the spreadsheet and its sheets
const db = SpreadsheetApp.getActiveSpreadsheet();
const usersSheet = db.getSheetByName("Base de Datos de Usuarios");
const logsSheet = db.getSheetByName("Access Logs");
const eventsSheet = db.getSheetByName("Calendar Events");

/**
 * Handles POST requests to the web app.
 * This function acts as the main router for different actions like register, login, and fetching events.
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    let response;

    switch (requestData.action) {
      case 'register':
        response = registerUser(usersSheet, requestData.email, requestData.password);
        break;
      case 'login':
        response = loginUser(usersSheet, logsSheet, requestData.email, requestData.password);
        break;
      case 'getCalendarEvents':
        response = { success: true, data: getCalendarEvents(eventsSheet) };
        break;
      default:
        response = { success: false, message: 'Invalid action' };
    }
    
    return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: 'Error: ' + error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Registers a new user in the spreadsheet.
 */
function registerUser(sheet, email, password) {
  if (!email || !password) {
    return { success: false, message: "Email and password are required." };
  }

  const userExists = findUser(sheet, email);
  if (userExists) {
    return { success: false, message: "User already exists." };
  }

  // In a real application, hash the password before storing it.
  // For simplicity, we are storing it as plain text here.
  sheet.appendRow([email, password]);
  return { success: true, message: "User registered successfully." };
}

/**
 * Logs in a user by checking their credentials against the spreadsheet.
 * Also logs the access attempt.
 */
function loginUser(userSheet, logSheet, email, password) {
  const userRow = findUser(userSheet, email);
  const timestamp = new Date().toISOString();

  if (userRow) {
    const storedPassword = userSheet.getRange(userRow, 2).getValue();
    if (password === storedPassword) {
      logSheet.appendRow([timestamp, email, "SUCCESS"]);
      return { success: true, message: "Login successful." };
    }
  }

  logSheet.appendRow([timestamp, email, "FAILED"]);
  return { success: false, message: "Invalid email or password." };
}

/**
 * Finds a user by email in the specified sheet.
 * Returns the row number if found, otherwise null.
 */
function findUser(sheet, email) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === email) {
      return i + 1; // Return row number (1-based)
    }
  }
  return null;
}

/**
 * Retrieves and formats calendar events and birthdays from the "Calendar Events" sheet.
 * Now supports time for events.
 */
function getCalendarEvents(sheet) {
  const eventsRange = sheet.getDataRange();
  const eventsValues = eventsRange.getValues();
  const headers = eventsValues[0];
  const events = [];

  for (let i = 1; i < eventsValues.length; i++) {
    const row = eventsValues[i];
    if (!row[0]) continue; // Skip empty rows

    const date = new Date(row[0]);
    // Format to ISO 8601 to preserve date and time information
    const formattedDateTime = date.toISOString();

    // Events (columns B to F)
    for (let j = 1; j <= 5; j++) { 
      if (row[j]) {
        events.push({
          date: formattedDateTime,
          type: 'event',
          title: row[j]
        });
      }
    }

    // Birthdays (columns G to K)
    for (let j = 6; j <= 10; j++) {
      if (row[j]) {
        events.push({
          date: formattedDateTime,
          type: 'birthday',
          title: `Cumpleaños: ${row[j]}`
        });
      }
    }
  }
  return events;
}
