/**
 * @OnlyCurrentDoc
 *
 * The above comment directs App Script to limit the scope of file access for this script
 * to only the current document containing it. This is a best practice for security.
 */

/**
 * Handles HTTP POST requests to the web app.
 * This is the main entry point for requests from the Next.js application.
 */
function doPost(e) {
  try {
    // Check if there's any POST data. If not, default to an empty object.
    const postData = e.postData ? JSON.parse(e.postData.contents) : {};
    const action = postData.action;

    let responseData;

    // Route the request based on the 'action' parameter
    switch (action) {
      case 'getCalendarEvents':
        responseData = getCalendarEventsFromSheet();
        break;
      // You can add more cases here for other actions in the future
      // case 'anotherAction':
      //   responseData = handleAnotherAction(postData);
      //   break;
      default:
        // If no action is specified or the action is unknown, return an error.
        return ContentService
          .createTextOutput(JSON.stringify({ success: false, message: 'Invalid or missing action.' }))
          .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Send a successful response back to the client
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, data: responseData }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error for debugging purposes
    Logger.log(error.toString());
    
    // Send an error response back to the client
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'An error occurred on the server: ' + error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fetches event and birthday data from the 'Calendar Events' sheet.
 * This function is called by doPost when the action is 'getCalendarEvents'.
 */
function getCalendarEventsFromSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Calendar Events');
  if (!sheet) {
    // If the sheet doesn't exist, return an empty array.
    Logger.log("Sheet 'Calendar Events' not found.");
    return [];
  }
  
  const range = sheet.getDataRange();
  const values = range.getValues();
  
  // Remove the header row
  const headers = values.shift(); 
  
  const eventsByDate = {};

  values.forEach(row => {
    const dateValue = row[0];
    if (dateValue instanceof Date && !isNaN(dateValue)) {
      // Format the date to YYYY-MM-DD to use as a key
      const dateString = Utilities.formatDate(dateValue, Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
      
      if (!eventsByDate[dateString]) {
        eventsByDate[dateString] = {
          date: dateString,
          events: [],
          birthdays: []
        };
      }
      
      // Collect events from columns B to F (indices 1 to 5)
      for (let i = 1; i <= 5; i++) {
        if (row[i]) {
          eventsByDate[dateString].events.push(row[i].toString());
        }
      }
      
      // Collect birthdays from columns G to K (indices 6 to 10)
      for (let i = 6; i <= 10; i++) {
        if (row[i]) {
          eventsByDate[dateString].birthdays.push(row[i].toString());
        }
      }
    }
  });
  
  // Convert the map object to an array of its values
  return Object.values(eventsByDate);
}