/**
 * @fileoverview Google Apps Script for fetching team member data from a Google Sheet.
 * This script is designed to be deployed as a web app and provides a JSON API
 * endpoint for the "TeamMembers" sheet.
 */

/**
 * Handles GET requests to the web app.
 * This is the main entry point for fetching data.
 * @param {GoogleAppsScript.Events.DoGet} e The event parameter for a GET request.
 * @returns {GoogleAppsScript.Content.TextOutput} A JSON response containing the team member data.
 */
function doGet(e) {
  try {
    // Open the spreadsheet by its ID and get the specific sheet by name
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("TeamMembers");

    if (!sheet) {
      return createJsonResponse({ error: true, message: "Sheet 'TeamMembers' not found." });
    }

    // Get all data from the sheet, excluding the header row
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    const headers = values.shift(); // Remove and get headers

    if (!headers || headers.length === 0) {
        return createJsonResponse([]); // Return empty if no headers
    }

    // Map the sheet data to an array of objects
    const data = values.map(row => {
      let obj = {};
      headers.forEach((header, index) => {
        // Ensure we don't try to access an index that doesn't exist in the row
        if (index < row.length) {
          obj[header] = row[index];
        }
      });
      return obj;
    });

    // Return the data as a JSON string
    return createJsonResponse(data);

  } catch (error) {
    // Log the error for debugging purposes
    Logger.log(error.toString());
    // Return a structured error message
    return createJsonResponse({ error: true, message: "An unexpected error occurred.", details: error.toString() });
  }
}


/**
 * Helper function to create a JSON response.
 * This ensures the correct MIME type is set for the response.
 * @param {Object} data The data to be returned as JSON.
 * @returns {GoogleAppsScript.Content.TextOutput} The JSON response object.
 */
function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
