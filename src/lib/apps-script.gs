// Versión: 2.1 - Script consolidado para Banesco Seguros Portal

// IDs de las hojas de cálculo para un acceso más fácil y mantenible.
const USER_SHEET_ID = "1234567890abcdefghijklmnopqrstuvwxyz"; // Reemplazar con el ID real
const SPREADSHEET = SpreadsheetApp.getActiveSpreadsheet();
const USERS_SHEET = SPREADSHEET.getSheetByName("Users");
const ACCESS_LOGS_SHEET = SPREADSHEET.getSheetByName("Access Logs");
const CALENDAR_SHEET = SPREADSHEET.getSheetByName("Calendar Events");
const MENU_SHEET = SPREADSHEET.getSheetByName("Menu");


/****************************************************************
 * GESTIÓN DE PETICIONES HTTP (Punto de entrada único)
 ****************************************************************/

/**
 * Función principal que maneja todas las solicitudes POST desde la aplicación.
 * Actúa como un enrutador que llama a otras funciones basadas en la acción solicitada.
 * @param {object} e - El objeto de evento de la solicitud POST.
 * @return {ContentService.TextOutput} - La respuesta en formato JSON.
 */
function doPost(e) {
  try {
    const requestData = JSON.parse(e.postData.contents);
    let responseData;

    // Enrutador de acciones
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
        responseData = { success: false, message: "Acción no reconocida." };
    }

    return ContentService.createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Manejo de errores centralizado
    Logger.log("Error en doPost: " + error.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: "Error interno del servidor: " + error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


/****************************************************************
 * FUNCIONES DE AUTENTICACIÓN Y REGISTRO DE USUARIOS
 ****************************************************************/

/**
 * Registra un nuevo usuario en la hoja "Users".
 * @param {string} email - El correo del usuario.
 * @param {string} password - La contraseña del usuario.
 * @return {object} - Un objeto indicando el éxito o fracaso de la operación.
 */
function registerUser(email, password) {
  if (!USERS_SHEET) return { success: false, message: "La hoja 'Users' no existe." };

  const users = USERS_SHEET.getDataRange().getValues();
  const userExists = users.some(row => row[0] === email);

  if (userExists) {
    return { success: false, message: "El usuario ya existe." };
  }

  USERS_SHEET.appendRow([email, password, new Date()]);
  return { success: true, message: "Usuario registrado exitosamente." };
}

/**
 * Valida las credenciales de un usuario contra la hoja "Users".
 * @param {string} email - El correo del usuario.
 * @param {string} password - La contraseña del usuario.
 * @return {object} - Un objeto indicando el éxito o fracaso de la operación.
 */
function loginUser(email, password) {
  if (!USERS_SHEET) return { success: false, message: "La hoja 'Users' no existe." };

  const users = USERS_SHEET.getDataRange().getValues();
  const user = users.find(row => row[0] === email && row[1] === password);

  if (user) {
    logAccess(email, "Login exitoso");
    return { success: true, message: "Inicio de sesión exitoso." };
  } else {
    logAccess(email, "Intento de login fallido");
    return { success: false, message: "Correo o contraseña incorrectos." };
  }
}

/**
 * Registra un intento de acceso en la hoja "Access Logs".
 * @param {string} email - El correo del usuario que intenta acceder.
 * @param {string} status - El resultado del intento de acceso.
 */
function logAccess(email, status) {
  if (!ACCESS_LOGS_SHEET) return;
  ACCESS_LOGS_SHEET.appendRow([new Date(), email, status]);
}


/****************************************************************
 * FUNCIÓN PARA OBTENER EVENTOS DEL CALENDARIO
 ****************************************************************/

/**
 * Lee los eventos y cumpleaños de la hoja "Calendar Events".
 * @return {Array<object>} - Un arreglo de objetos, cada uno representando un día con sus eventos.
 */
function getCalendarEventsFromSheet() {
  if (!CALENDAR_SHEET) {
    Logger.log("La hoja 'Calendar Events' no se encontró.");
    return [];
  }

  const data = CALENDAR_SHEET.getDataRange().getValues();
  const eventsByDate = {};
  
  // Omitir el encabezado (fila 1)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const date = new Date(row[0]);
    
    // Validar que la fecha sea válida
    if (isNaN(date.getTime())) continue;

    const isoDateString = date.toISOString();
    const event = row[1];
    const birthday = row[2];

    if (!eventsByDate[isoDateString]) {
      eventsByDate[isoDateString] = {
        date: isoDateString,
        events: [],
        birthdays: []
      };
    }

    if (event) {
      eventsByDate[isoDateString].events.push(event);
    }
    if (birthday) {
      eventsByDate[isoDateString].birthdays.push(birthday);
    }
  }

  return Object.values(eventsByDate);
}


/****************************************************************
 * FUNCIÓN PARA OBTENER EL MENÚ SEMANAL
 ****************************************************************/

/**
 * Lee los platos del menú desde la hoja "Menu".
 * @return {Array<object>} - Un arreglo de objetos, cada uno representando un plato del menú.
 */
function getMenuItemsFromSheet() {
  if (!MENU_SHEET) {
    Logger.log("La hoja 'Menu' no se encontró.");
    return [];
  }

  const menuData = MENU_SHEET.getDataRange().getValues();
  const menuItems = [];
  const headers = menuData[0].map(h => h.toLowerCase());

  // Mapeo de índices de columnas para flexibilidad
  const dayIndex = headers.indexOf('day');
  const classicDishIndex = headers.indexOf('classic dish');
  const classicImgIndex = headers.indexOf('classic image url');
  const dietDishIndex = headers.indexOf('diet dish');
  const dietImgIndex = headers.indexOf('diet image url');
  const execDishIndex = headers.indexOf('executive dish');
  const execImgIndex = headers.indexOf('executive image url');
  
  // Validar que las columnas necesarias existan
  if (dayIndex === -1 || classicDishIndex === -1 || dietDishIndex === -1 || execDishIndex === -1) {
    Logger.log("Faltan columnas esenciales en la hoja 'Menu'. Se requieren: Day, Classic Dish, Diet Dish, Executive Dish.");
    return [];
  }

  // Iterar desde la segunda fila para omitir encabezados
  for (let i = 1; i < menuData.length; i++) {
    const row = menuData[i];
    const day = row[dayIndex];

    // Ignorar filas vacías
    if (!day || day.trim() === "") continue;

    // Procesar Menú Clásico
    if (row[classicDishIndex]) {
      menuItems.push({
        id: `classic-${i}`,
        day: day,
        name: row[classicDishIndex],
        description: `Plato clásico del día: ${row[classicDishIndex]}`,
        imageUrl: classicImgIndex > -1 ? row[classicImgIndex] : '',
        price: "100 Bs.",
        type: "Clásico"
      });
    }

    // Procesar Menú Dieta
    if (row[dietDishIndex]) {
      menuItems.push({
        id: `diet-${i}`,
        day: day,
        name: row[dietDishIndex],
        description: `Opción de dieta: ${row[dietDishIndex]}`,
        imageUrl: dietImgIndex > -1 ? row[dietImgIndex] : '',
        price: "100 Bs.",
        type: "Dieta"
      });
    }

    // Procesar Menú Ejecutivo
    if (row[execDishIndex]) {
      menuItems.push({
        id: `exec-${i}`,
        day: day,
        name: row[execDishIndex],
        description: `Nuestro plato ejecutivo: ${row[execDishIndex]}`,
        imageUrl: execImgIndex > -1 ? row[execImgIndex] : '',
        price: "13 $",
        type: "Ejecutivo"
      });
    }
  }
  
  return menuItems;
}
