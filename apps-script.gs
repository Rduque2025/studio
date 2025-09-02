
// Hoja de cálculo de Google
const USERS_SHEET_NAME = "Users";
const ACCESS_LOGS_SHEET_NAME = "Access Logs";
const CALENDAR_EVENTS_SHEET_NAME = "Calendar Events";
const MENU_SHEET_NAME = "Menu";

// Función principal que se ejecuta cuando se recibe una solicitud POST
function doPost(e) {
  let result;
  try {
    const requestData = JSON.parse(e.postData.contents);

    // Objeto para la respuesta
    const response = {
      success: true,
      data: null,
      message: ''
    };

    // Switch para manejar diferentes acciones
    switch (requestData.action) {
      case 'register':
        const { email: registerEmail, password: registerPassword } = requestData;
        const registerMessage = registerUser(registerEmail, registerPassword);
        response.message = registerMessage;
        if (registerMessage !== "Registro exitoso.") {
          response.success = false;
        }
        break;
      case 'login':
        const { email: loginEmail, password: loginPassword } = requestData;
        const loginMessage = loginUser(loginEmail, loginPassword);
        response.message = loginMessage;
        if (loginMessage !== "Inicio de sesión exitoso.") {
          response.success = false;
        }
        break;
      case 'getMenuItems':
        response.data = getMenuItemsFromSheet(); // CORRECCIÓN: Asignar los datos del menú a la respuesta
        break;
      case 'getCalendarEvents':
        response.data = getCalendarEventsFromSheet();
        break;
      default:
        response.success = false;
        response.message = "Acción no reconocida.";
        break;
    }
    result = response;
  } catch (error) {
    // Manejo de errores
    result = {
      success: false,
      message: "Error en el servidor de Apps Script: " + error.toString(),
      data: null
    };
  }

  // Devolver la respuesta en formato JSON
  return ContentService.createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}


// --- FUNCIONES DE AUTENTICACIÓN ---

/**
 * Registra un nuevo usuario en la hoja "Users".
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @return {string} - Mensaje de éxito o error.
 */
function registerUser(email, password) {
  if (!email || !password) {
    return "Correo electrónico y contraseña son requeridos.";
  }
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  if (!sheet) {
    return `Hoja "${USERS_SHEET_NAME}" no encontrada.`;
  }
  
  const data = sheet.getDataRange().getValues();
  const userExists = data.some(row => row[0] === email);

  if (userExists) {
    return "El usuario ya existe.";
  }

  sheet.appendRow([email, password, new Date()]);
  logAccess(email, "register", "success");
  return "Registro exitoso.";
}

/**
 * Valida las credenciales de un usuario en la hoja "Users".
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @return {string} - Mensaje de éxito o error.
 */
function loginUser(email, password) {
  if (!email || !password) {
    return "Correo electrónico y contraseña son requeridos.";
  }
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USERS_SHEET_NAME);
  if (!sheet) {
    return `Hoja "${USERS_SHEET_NAME}" no encontrada.`;
  }
  
  const data = sheet.getDataRange().getValues();
  const userRow = data.find(row => row[0] === email);

  if (!userRow) {
    logAccess(email, "login", "failure - user not found");
    return "Usuario no encontrado.";
  }

  if (userRow[1] !== password) {
    logAccess(email, "login", "failure - incorrect password");
    return "Contraseña incorrecta.";
  }
  
  logAccess(email, "login", "success");
  return "Inicio de sesión exitoso.";
}

/**
 * Registra un intento de acceso en la hoja "Access Logs".
 * @param {string} email - El correo electrónico del intento.
 * @param {string} type - El tipo de acceso ('login' o 'register').
 * @param {string} status - El resultado del intento.
 */
function logAccess(email, type, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ACCESS_LOGS_SHEET_NAME);
  if (sheet) {
    sheet.appendRow([new Date(), email, type, status]);
  }
}


// --- FUNCIONES DE DATOS ---

/**
 * Obtiene los elementos del menú desde la hoja "Menu".
 * @return {Array<Object>} - Un arreglo de objetos, cada uno representando un plato del menú.
 */
function getMenuItemsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(MENU_SHEET_NAME);
  if (!sheet) {
    console.error(`Sheet named "${MENU_SHEET_NAME}" not found.`);
    return [];
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // Remove header row
  
  const menuItems = data.map(row => {
    let item = {};
    headers.forEach((header, index) => {
      item[header] = row[index];
    });
    return item;
  });
  
  return menuItems;
}


/**
 * Obtiene eventos y cumpleaños de la hoja "Calendar Events".
 * @return {Array<Object>} - Un arreglo de objetos, cada uno representando un día con sus eventos y cumpleaños.
 */
function getCalendarEventsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CALENDAR_EVENTS_SHEET_NAME);
  if (!sheet) {
    console.error(`Sheet named "${CALENDAR_EVENTS_SHEET_NAME}" not found.`);
    return [];
  }

  const data = sheet.getDataRange().getValues();
  const headers = data.shift(); // Remove and get header row

  const dateColIndex = 0; // La columna A es el índice 0

  const eventCols = headers.reduce((acc, header, index) => {
    if (header.startsWith('event_')) acc.push(index);
    return acc;
  }, []);
 
  const birthdayCols = headers.reduce((acc, header, index) => {
    if (header.startsWith('birthday_')) acc.push(index);
    return acc;
  }, []);

  const eventsData = data.map(row => {
    const dateValue = row[dateColIndex];
    if (!dateValue) return null;

    const date = new Date(dateValue);
    // Verificar si la fecha es válida. Si no lo es, getTime() devolverá NaN.
    if (isNaN(date.getTime())) return null;

    const events = eventCols.map(colIndex => row[colIndex]).filter(Boolean);
    const birthdays = birthdayCols.map(colIndex => row[colIndex]).filter(Boolean);

    return {
      date: date.toISOString(),
      events: events,
      birthdays: birthdays,
    };
  }).filter(Boolean); // Filtrar filas nulas (sin fecha o con fecha inválida)

  return eventsData;
}
