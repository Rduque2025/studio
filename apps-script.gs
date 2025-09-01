
const SS_ID = "1g4944-889-1-e-9-3-f-2-7-1-z-3-8-9-0-7-9-a-2"; // Reemplaza con el ID de tu Google Sheet
const ss = SpreadsheetApp.openById(SS_ID);
const usersSheet = ss.getSheetByName("Users");
const accessLogsSheet = ss.getSheetByName("Access Logs");
const calendarSheet = ss.getSheetByName("Calendar Events");
const menuSheet = ss.getSheetByName("Menu");

/**
 * Punto de entrada principal para todas las solicitudes POST desde la aplicación web.
 * Analiza la acción solicitada y la dirige a la función correspondiente.
 * @param {object} e - El objeto de evento de la solicitud POST.
 * @returns {ContentService.TextOutput} - Una respuesta JSON.
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
        throw new Error("Acción no válida solicitada.");
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(responseData))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log(error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Registra un nuevo usuario en la hoja "Users".
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {object} - Un objeto indicando el éxito o fracaso.
 */
function registerUser(email, password) {
  if (!email || !password) {
    return { success: false, message: "Correo y contraseña son requeridos." };
  }
  const users = usersSheet.getDataRange().getValues();
  const userExists = users.some(row => row[0] === email);
  if (userExists) {
    return { success: false, message: "El usuario ya existe." };
  }
  usersSheet.appendRow([email, password]);
  return { success: true, message: "Usuario registrado exitosamente." };
}

/**
 * Autentica a un usuario contra la hoja "Users".
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {object} - Un objeto indicando el éxito o fracaso.
 */
function loginUser(email, password) {
  if (!email || !password) {
    return { success: false, message: "Correo y contraseña son requeridos." };
  }
  const users = usersSheet.getDataRange().getValues();
  const user = users.find(row => row[0] === email && row[1].toString() === password.toString());
  if (user) {
    logAccess(email, "LOGIN_SUCCESS");
    return { success: true, message: "Inicio de sesión exitoso." };
  } else {
    logAccess(email, "LOGIN_FAILURE");
    return { success: false, message: "Credenciales inválidas." };
  }
}

/**
 * Registra un intento de acceso en la hoja "Access Logs".
 * @param {string} email - El correo electrónico utilizado.
 * @param {string} status - El resultado del intento de acceso.
 */
function logAccess(email, status) {
  accessLogsSheet.appendRow([new Date(), email, status]);
}

/**
 * Obtiene eventos y cumpleaños de la hoja "Calendar Events".
 * @returns {Array<object>} - Un array de objetos, cada uno representando un día con sus eventos y cumpleaños.
 */
function getCalendarEventsFromSheet() {
  const range = calendarSheet.getDataRange();
  const values = range.getValues();
  const eventsByDate = [];
  const headers = values[0];

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const eventDate = new Date(row[0]);
    if (isNaN(eventDate.getTime())) continue; // Omitir filas con fecha inválida

    eventsByDate.push({
      date: eventDate.toISOString(),
      events: [row[1]].filter(Boolean), // Columna "Event"
      birthdays: [row[2]].filter(Boolean), // Columna "Birthday"
    });
  }
  return eventsByDate;
}

/**
 * Obtiene los elementos del menú de la hoja "Menu".
 * @returns {Array<object>} - Un array de objetos, cada uno representando un plato del menú.
 */
function getMenuItemsFromSheet() {
  const range = menuSheet.getDataRange();
  const values = range.getValues();
  const menuItems = [];
  const headers = values[0];

  // Identificar los índices de las columnas dinámicamente
  const dayIndex = headers.indexOf('Day');
  const classicDishIndex = headers.indexOf('Classic Dish');
  const classicImgIndex = headers.indexOf('Classic Image URL');
  const dietDishIndex = headers.indexOf('Diet Dish');
  const dietImgIndex = headers.indexOf('Diet Image URL');
  const execDishIndex = headers.indexOf('Executive Dish');
  const execImgIndex = headers.indexOf('Executive Image URL');
  
  // Constante para el precio, ya que no está en la hoja
  const PRICE = "100 Bs.";

  for (let i = 1; i < values.length; i++) {
    const row = values[i];
    const day = row[dayIndex];
    if (!day) continue; // Omitir filas sin día

    // Menú Clásico
    if (row[classicDishIndex]) {
      menuItems.push({
        id: `menu-clasico-${i}`,
        day: day,
        name: row[classicDishIndex],
        description: `Delicioso plato clásico del día: ${row[classicDishIndex]}.`,
        imageUrl: row[classicImgIndex] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmb29kfGVufDB8fHx8MTc1MzA1MzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        price: PRICE,
        type: 'Clásico'
      });
    }
    
    // Menú Dieta
    if (row[dietDishIndex]) {
       menuItems.push({
        id: `menu-dieta-${i}`,
        day: day,
        name: row[dietDishIndex],
        description: `Opción saludable y ligera: ${row[dietDishIndex]}.`,
        imageUrl: row[dietImgIndex] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmb29kfGVufDB8fHx8MTc1MzA1MzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        price: PRICE,
        type: 'Dieta'
      });
    }

    // Menú Ejecutivo
    if (row[execDishIndex]) {
       menuItems.push({
        id: `menu-ejecutivo-${i}`,
        day: day,
        name: row[execDishIndex],
        description: `Plato ejecutivo especial del día: ${row[execDishIndex]}.`,
        imageUrl: row[execImgIndex] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxmb29kfGVufDB8fHx8MTc1MzA1MzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        price: "13 $", // Precio diferente para el ejecutivo
        type: 'Ejecutivo'
      });
    }
  }
  return menuItems;
}

    