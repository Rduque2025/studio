// This is a Google Apps Script file. You should copy this content into your Apps Script project.

// --- CONFIGURATION ---
const USER_SHEET_NAME = "Users";
const ACCESS_LOG_SHEET_NAME = "Access Logs";
const CALENDAR_SHEET_NAME = "Calendar Events";
const MENU_SHEET_NAME = "Menu"; // New sheet for menu items

// --- CENTRAL REQUEST HANDLER ---
/**
 * Handles all POST requests from the web application.
 * This acts as a router, directing the request to the appropriate function based on the 'action' parameter.
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    let responseData;

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
      case 'getMenuItems':
        responseData = { success: true, data: getMenuItemsFromSheet() };
        break;
      default:
        throw new Error("Invalid action specified.");
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the detailed error for debugging
    Logger.log("Error in doPost: " + error.toString() + " at " + error.stack);
    
    // Return a structured error message to the client
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: "An error occurred: " + error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// --- USER MANAGEMENT FUNCTIONS ---
/**
 * Registers a new user in the "Users" sheet.
 * Hashes the password for security.
 */
function registerUser(email, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USER_SHEET_NAME);
  const users = sheet.getDataRange().getValues();
  
  // Check if user already exists
  for (let i = 1; i < users.length; i++) {
    if (users[i][0] === email) {
      return { success: false, message: "El correo electrónico ya está registrado." };
    }
  }
  
  // Hash password (simple base64 encoding for this example)
  const hashedPassword = Utilities.base64Encode(password);
  
  // Add new user
  sheet.appendRow([email, hashedPassword]);
  
  return { success: true, message: "Usuario registrado exitosamente." };
}

/**
 * Logs in a user by verifying their email and password against the "Users" sheet.
 */
function loginUser(email, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USER_SHEET_NAME);
  const users = sheet.getDataRange().getValues();
  
  for (let i = 1; i < users.length; i++) {
    if (users[i][0] === email) {
      const storedPassword = Utilities.newBlob(Utilities.base64Decode(users[i][1])).getDataAsString();
      if (password === storedPassword) {
        logAccess(email, "Login Success");
        return { success: true, message: "Inicio de sesión exitoso." };
      } else {
        logAccess(email, "Login Failed: Invalid Password");
        return { success: false, message: "Contraseña incorrecta." };
      }
    }
  }
  
  logAccess(email, "Login Failed: User Not Found");
  return { success: false, message: "Usuario no encontrado." };
}

/**
 * Logs an access attempt to the "Access Logs" sheet.
 */
function logAccess(email, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCESS_LOG_SHEET_NAME);
  sheet.appendRow([new Date(), email, status]);
}

// --- CALENDAR EVENT FUNCTION ---
/**
 * Retrieves events and birthdays from the "Calendar Events" sheet.
 * Assumes columns: Date, Event 1, Event 2, ..., Birthday 1, Birthday 2, ...
 */
function getCalendarEventsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CALENDAR_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const events = [];

  // Identify which columns are for events and which are for birthdays
  const eventColumns = [];
  const birthdayColumns = [];
  headers.forEach((header, index) => {
    if (header.toLowerCase().includes('event')) {
      eventColumns.push(index);
    } else if (header.toLowerCase().includes('birthday')) {
      birthdayColumns.push(index);
    }
  });

  // Start from row 1 to skip headers
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const date = new Date(row[0]);
    
    // Skip invalid or empty date rows
    if (!row[0] || isNaN(date.getTime())) {
      continue;
    }

    const dayData = {
      date: date.toISOString(),
      events: [],
      birthdays: []
    };
    
    eventColumns.forEach(colIndex => {
      if (row[colIndex]) dayData.events.push(row[colIndex]);
    });
    
    birthdayColumns.forEach(colIndex => {
      if (row[colIndex]) dayData.birthdays.push(row[colIndex]);
    });
    
    // Only add if there are any events or birthdays for that day
    if (dayData.events.length > 0 || dayData.birthdays.length > 0) {
      events.push(dayData);
    }
  }
  
  return events;
}

// --- MENU ITEMS FUNCTION ---
/**
 * Retrieves menu items from the "Menu" sheet.
 * It processes each day and creates separate entries for Classic, Diet, and Executive menus.
 */
function getMenuItemsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MENU_SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data[0].map(h => h.toLowerCase()); // Standardize headers
  const menuItems = [];

  // Find column indices based on headers
  const dayIndex = headers.indexOf('day');
  const classicDishIndex = headers.indexOf('classic dish');
  const classicImgIndex = headers.indexOf('classic image url');
  const dietDishIndex = headers.indexOf('diet dish');
  const dietImgIndex = headers.indexOf('diet image url');
  const execDishIndex = headers.indexOf('executive dish');
  const execImgIndex = headers.indexOf('executive image url');
  // Optional columns
  const priceIndex = headers.indexOf('price');
  const classicDescIndex = headers.indexOf('classic description');
  const dietDescIndex = headers.indexOf('diet description');
  const execDescIndex = headers.indexOf('executive description');
  const classicHintIndex = headers.indexOf('classic hint');
  const dietHintIndex = headers.indexOf('diet hint');
  const execHintIndex = headers.indexOf('executive hint');
  
  // Basic validation to ensure required columns are present
  if (dayIndex === -1 || classicDishIndex === -1 || dietDishIndex === -1 || execDishIndex === -1) {
      throw new Error("Missing one of the required columns in the Menu sheet: Day, Classic Dish, Diet Dish, Executive Dish");
  }

  // Start from row 1 to skip headers
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const day = row[dayIndex];
    
    // Skip empty rows to prevent errors
    if (!day) {
      continue;
    }

    const classicDish = row[classicDishIndex];
    const dietDish = row[dietDishIndex];
    const execDish = row[execDishIndex];

    if (classicDish) {
      menuItems.push({
        id: `menu-${day}-classic-${i}`,
        day: day,
        name: classicDish,
        description: (classicDescIndex > -1 && row[classicDescIndex]) || `Plato clásico del día: ${classicDish}`,
        imageUrl: (classicImgIndex > -1 && row[classicImgIndex]) || "",
        price: (priceIndex > -1 && row[priceIndex]) || "",
        type: 'Clásico',
        dataAiHint: (classicHintIndex > -1 && row[classicHintIndex]) || 'classic food'
      });
    }

    if (dietDish) {
      menuItems.push({
        id: `menu-${day}-diet-${i}`,
        day: day,
        name: dietDish,
        description: (dietDescIndex > -1 && row[dietDescIndex]) || `Opción de dieta para hoy: ${dietDish}`,
        imageUrl: (dietImgIndex > -1 && row[dietImgIndex]) || "",
        price: (priceIndex > -1 && row[priceIndex]) || "",
        type: 'Dieta',
        dataAiHint: (dietHintIndex > -1 && row[dietHintIndex]) || 'diet food'
      });
    }

    if (execDish) {
      menuItems.push({
        id: `menu-${day}-executive-${i}`,
        day: day,
        name: execDish,
        description: (execDescIndex > -1 && row[execDescIndex]) || `Nuestro plato ejecutivo: ${execDish}`,
        imageUrl: (execImgIndex > -1 && row[execImgIndex]) || "",
        price: (priceIndex > -1 && row[priceIndex]) || "",
        type: 'Ejecutivo',
        dataAiHint: (execHintIndex > -1 && row[execHintIndex]) || 'executive food'
      });
    }
  }
  
  return menuItems;
}
