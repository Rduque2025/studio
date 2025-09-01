// Hoja de Cálculo ID - Opcional si el script está vinculado a la hoja
const SPREADSHEET_ID = ''; // Si el script no está vinculado, pega tu ID aquí
const USERS_SHEET_NAME = 'Base de Datos de Usuarios';
const LOGS_SHEET_NAME = 'Access Logs';
const EVENTS_SHEET_NAME = 'Calendar Events';

/**
 * Función principal que maneja las solicitudes POST.
 * Funciona como un enrutador para diferentes acciones.
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    let response;

    switch (requestData.action) {
      case 'register':
        response = handleRegister(requestData);
        break;
      case 'login':
        response = handleLogin(requestData);
        break;
      case 'getCalendarEvents':
        response = handleGetCalendarEvents();
        break;
      default:
        response = { success: false, message: 'Acción no reconocida' };
        break;
    }

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    logAccess('ERROR', `Error en doPost: ${error.toString()}`);
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: `Error en el servidor: ${error.toString()}` }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Maneja el registro de un nuevo usuario.
 */
function handleRegister(data) {
  const { email, password } = data;

  if (!email || !password) {
    return { success: false, message: 'Correo y contraseña son requeridos' };
  }

  const sheet = getSheet(USERS_SHEET_NAME);
  const users = sheet.getDataRange().getValues();
  const userExists = users.some(row => row[0].toLowerCase() === email.toLowerCase());

  if (userExists) {
    return { success: false, message: 'El correo ya está registrado' };
  }

  // En un entorno real, la contraseña debe ser hasheada.
  // Por simplicidad, aquí la guardamos en texto plano.
  sheet.appendRow([email, password]);
  
  return { success: true, message: 'Usuario registrado exitosamente' };
}

/**
 * Maneja el inicio de sesión de un usuario.
 */
function handleLogin(data) {
  const { email, password } = data;

  if (!email || !password) {
    return { success: false, message: 'Correo y contraseña son requeridos' };
  }

  const sheet = getSheet(USERS_SHEET_NAME);
  const users = sheet.getDataRange().getValues();
  const userRow = users.find(row => row[0].toLowerCase() === email.toLowerCase());

  if (userRow && userRow[1] === password) {
    logAccess(email, 'SUCCESS');
    return { success: true, message: 'Inicio de sesión exitoso' };
  } else {
    logAccess(email, 'FAILURE');
    return { success: false, message: 'Correo o contraseña incorrectos' };
  }
}

/**
 * Maneja la obtención de eventos del calendario.
 */
function handleGetCalendarEvents() {
  try {
    const sheet = getSheet(EVENTS_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data.shift(); // Saca la fila de encabezados

    const events = [];
    data.forEach(row => {
      const date = new Date(row[0]);
      if (isNaN(date.getTime())) return; // Salta si la fecha no es válida

      // Procesar eventos (columnas 1 a 5)
      for (let i = 1; i <= 5; i++) {
        if (row[i]) {
          events.push({
            date: Utilities.formatDate(date, "GMT", "yyyy-MM-dd'T'00:00:00.000'Z'"),
            title: row[i],
            type: 'event'
          });
        }
      }

      // Procesar cumpleaños (columnas 6 a 10)
      for (let i = 6; i <= 10; i++) {
        if (row[i]) {
          events.push({
            date: Utilities.formatDate(date, "GMT", "yyyy-MM-dd'T'00:00:00.000'Z'"),
            title: `Cumpleaños de ${row[i]}`,
            type: 'birthday'
          });
        }
      }
    });

    return { success: true, events: events };

  } catch (error) {
     logAccess('ERROR', `Error en getCalendarEvents: ${error.toString()}`);
     return { success: false, message: `Error obteniendo eventos: ${error.toString()}`, events: [] };
  }
}


/**
 * Registra un intento de acceso en la hoja de logs.
 */
function logAccess(email, status) {
  try {
    const logSheet = getSheet(LOGS_SHEET_NAME);
    const timestamp = new Date();
    logSheet.appendRow([timestamp, email, status]);
  } catch (error) {
    // No hacer nada para evitar bucles infinitos si el logging falla.
  }
}

/**
 * Obtiene una hoja por su nombre, creándola si no existe.
 */
function getSheet(sheetName) {
  const spreadsheet = SPREADSHEET_ID 
    ? SpreadsheetApp.openById(SPREADSHEET_ID) 
    : SpreadsheetApp.getActiveSpreadsheet();
    
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    // Configura las cabeceras si es una hoja nueva
    if (sheetName === USERS_SHEET_NAME) {
      sheet.appendRow(['email', 'password']);
    } else if (sheetName === LOGS_SHEET_NAME) {
      sheet.appendRow(['timestamp', 'email', 'status']);
    } else if (sheetName === EVENTS_SHEET_NAME) {
      sheet.appendRow(['date', 'event_1', 'event_2', 'event_3', 'event_4', 'event_5', 'birthday_1', 'birthday_2', 'birthday_3', 'birthday_4', 'birthday_5']);
    }
  }
  return sheet;
}
