// Google Apps Script para gestionar usuarios en una Hoja de Cálculo de Google.
// Este script actúa como una API simple para registrar y autenticar usuarios.

// --- CONFIGURACIÓN ---
// 1. Reemplaza 'ID_DE_TU_HOJA_DE_CÁLCULO' con el ID real de tu Google Sheet.
//    Puedes encontrarlo en la URL de tu hoja: docs.google.com/spreadsheets/d/ID_DE_TU_HOJA_DE_CÁLCULO/edit
const SHEET_ID = 'ID_DE_TU_HOJA_DE_CÁLCULO';
// 2. Reemplaza 'NombreDeLaHoja' con el nombre de la hoja donde están los datos (ej. "Usuarios").
const SHEET_NAME = 'Usuarios'; 

/**
 * Punto de entrada principal para las solicitudes POST desde la aplicación web.
 * Se encarga de dirigir las acciones de 'register' y 'login'.
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;
    const email = requestData.email;
    const password = requestData.password;

    if (!email || !password) {
      return createJsonResponse({ success: false, message: 'Correo y contraseña son requeridos.' });
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) {
      throw new Error(`La hoja con el nombre "${SHEET_NAME}" no fue encontrada.`);
    }

    switch (action) {
      case 'register':
        return registerUser(sheet, email, password);
      case 'login':
        return loginUser(sheet, email, password);
      default:
        return createJsonResponse({ success: false, message: 'Acción no válida.' });
    }
  } catch (error) {
    Logger.log(error.toString());
    return createJsonResponse({ success: false, message: 'Error en el servidor: ' + error.toString() });
  }
}

/**
 * Registra un nuevo usuario en la hoja de cálculo.
 * Verifica si el usuario ya existe antes de añadirlo.
 */
function registerUser(sheet, email, password) {
  const data = sheet.getDataRange().getValues();
  const emails = data.map(row => row[0]); // La columna 0 es 'email'

  if (emails.includes(email)) {
    return createJsonResponse({ success: false, message: 'El usuario ya existe.' });
  }

  // En una aplicación real, NUNCA guardes contraseñas en texto plano.
  // Deberías usar un servicio de hashing o un proveedor de identidad.
  // Para este ejemplo, la guardamos directamente.
  sheet.appendRow([email, password]);

  return createJsonResponse({ success: true, message: 'Usuario registrado con éxito.' });
}

/**
 * Autentica a un usuario comparando sus credenciales con las de la hoja de cálculo.
 */
function loginUser(sheet, email, password) {
  const data = sheet.getDataRange().getValues();
  // Empezamos desde 1 para saltarnos la cabecera
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const storedEmail = row[0]; // Columna A
    const storedPassword = row[1]; // Columna B

    if (storedEmail === email && storedPassword === password) {
      return createJsonResponse({ success: true, message: 'Inicio de sesión correcto.' });
    }
  }

  return createJsonResponse({ success: false, message: 'Correo o contraseña incorrectos.' });
}

/**
 * Crea una respuesta JSON estandarizada para la aplicación web.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
