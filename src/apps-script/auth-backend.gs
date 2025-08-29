/**
 * =================================================================
 *  Backend de Autenticación con Google Apps Script para Banesco Seguros
 * =================================================================
 *
 * Instrucciones de Configuración:
 * -----------------------------
 * 1.  Crea una nueva Hoja de Cálculo de Google (Google Sheet).
 * 2.  Nómbrala "Base de Datos de Usuarios" o algo similar.
 * 3.  Crea dos hojas dentro de este archivo:
 *     a) Una llamada "Users":
 *        - En la celda A1, escribe "email".
 *        - En la celda B1, escribe "password".
 *     b) Una llamada "Access Logs":
 *        - En la celda A1, escribe "timestamp".
 *        - En la celda B1, escribe "email".
 *        - En la celda C1, escribe "status".
 * 4.  Crea un nuevo proyecto en Google Apps Script (script.google.com).
 * 5.  Pega este código en el editor de scripts.
 * 6.  Implementa el script como una Aplicación Web:
 *     - Ve a "Implementar" > "Nueva implementación".
 *     - Selecciona "Aplicación web" como tipo.
 *     - En "Ejecutar como", selecciona "Yo".
 *     - En "Quién tiene acceso", selecciona "Cualquier persona".
 *     - Haz clic en "Implementar", autoriza los permisos necesarios.
 *     - Copia la URL de la aplicación web generada. Esta es tu URL de backend.
 *
 * Funcionalidad:
 * --------------
 * - Registra nuevos usuarios en la hoja "Users".
 * - Valida las credenciales de los usuarios existentes.
 * - Registra cada intento de inicio de sesión (exitoso o fallido) en la hoja "Access Logs".
 *
 * IMPORTANTE: Este es un sistema básico. La contraseña se guarda como texto plano.
 * Para un entorno de producción real, considera usar un sistema de hashing
 * o una solución de autenticación más robusta como Firebase Authentication.
 *
 */

// Hoja de Usuarios
const USER_SHEET_NAME = 'Users';

// Hoja de Registro de Accesos
const LOG_SHEET_NAME = 'Access Logs';

/**
 * Punto de entrada principal para las solicitudes POST desde la aplicación web.
 * Maneja las acciones de 'register' y 'login'.
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const email = data.email ? data.email.toLowerCase() : undefined;
    const password = data.password;

    if (!action || !email || !password) {
      return createJsonResponse({ success: false, message: 'Faltan parámetros requeridos.' });
    }

    switch (action) {
      case 'register':
        return handleRegister(email, password);
      case 'login':
        return handleLogin(email, password);
      default:
        return createJsonResponse({ success: false, message: 'Acción no reconocida.' });
    }
  } catch (error) {
    return createJsonResponse({ success: false, message: `Error en el servidor: ${error.message}` });
  }
}

/**
 * Maneja el registro de un nuevo usuario.
 * @param {string} email - El correo del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {GoogleAppsScript.Content.TextOutput} - Respuesta JSON.
 */
function handleRegister(email, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USER_SHEET_NAME);
  if (!sheet) {
    return createJsonResponse({ success: false, message: `La hoja "${USER_SHEET_NAME}" no fue encontrada.` });
  }

  const data = sheet.getDataRange().getValues();
  const userExists = data.some(row => row[0].toLowerCase() === email);

  if (userExists) {
    return createJsonResponse({ success: false, message: 'El usuario ya existe.' });
  }

  sheet.appendRow([email, password]);
  return createJsonResponse({ success: true, message: 'Usuario registrado con éxito.' });
}

/**
 * Maneja el inicio de sesión de un usuario.
 * @param {string} email - El correo del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {GoogleAppsScript.Content.TextOutput} - Respuesta JSON.
 */
function handleLogin(email, password) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(USER_SHEET_NAME);
  if (!sheet) {
    logAccess(email, 'LOGIN_ERROR_NO_SHEET');
    return createJsonResponse({ success: false, message: `La hoja "${USER_SHEET_NAME}" no fue encontrada.` });
  }

  const data = sheet.getDataRange().getValues();
  const userRow = data.find(row => row[0].toLowerCase() === email);

  if (userRow) {
    const storedPassword = userRow[1];
    if (storedPassword === password) {
      logAccess(email, 'SUCCESS');
      return createJsonResponse({ success: true, message: 'Inicio de sesión correcto.' });
    } else {
      logAccess(email, 'FAILURE_WRONG_PASSWORD');
      return createJsonResponse({ success: false, message: 'Correo o contraseña incorrectos.' });
    }
  } else {
    logAccess(email, 'FAILURE_USER_NOT_FOUND');
    return createJsonResponse({ success: false, message: 'Correo o contraseña incorrectos.' });
  }
}

/**
 * Registra un intento de acceso en la hoja de logs.
 * @param {string} email - El correo electrónico del intento de acceso.
 * @param {string} status - El resultado del intento ('SUCCESS', 'FAILURE_WRONG_PASSWORD', etc.).
 */
function logAccess(email, status) {
  try {
    const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(LOG_SHEET_NAME);
    if (logSheet) {
      const timestamp = new Date();
      logSheet.appendRow([timestamp, email, status]);
    }
  } catch (error) {
    // Si el log falla, no queremos que afecte el flujo de login/registro.
    // Simplemente lo registramos en los logs de Apps Script.
    console.error(`Fallo al registrar el acceso para ${email}: ${error.message}`);
  }
}


/**
 * Crea una respuesta JSON estandarizada.
 * @param {object} responseObject - El objeto a serializar en JSON.
 * @returns {GoogleAppsScript.Content.TextOutput} - Objeto de respuesta.
 */
function createJsonResponse(responseObject) {
  return ContentService
    .createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}
