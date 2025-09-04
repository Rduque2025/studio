/**
 * @fileoverview Google Apps Script to fetch team member data from a Google Sheet.
 * This script is designed to be deployed as a web app and respond to GET requests.
 */

/**
 * Handles GET requests to the web app.
 * @param {Object} e The event parameter for a GET request.
 * @returns {ContentService.TextOutput} A JSON response containing the team member data.
 */
function doGet(e) {
  // Set the response content type to JSON. This is crucial.
  const response = ContentService.createTextOutput();
  response.setMimeType(ContentService.MimeType.JSON);

  try {
    // Get the active spreadsheet and the specific sheet by name.
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('TeamMembers');
    
    // Check if the sheet exists.
    if (!sheet) {
      response.setContent(JSON.stringify({ error: 'Sheet "TeamMembers" not found.' }));
      return response;
    }

    // Get all data from the sheet.
    // getDataRange() is efficient for getting all content.
    // getValues() returns a 2D array of values.
    const data = sheet.getDataRange().getValues();
    
    // The first row is assumed to be the headers.
    const headers = data.shift();
    
    // Map the remaining rows to an array of objects.
    const result = data.map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        // Ensure the header is a valid key and the row has a value for it.
        if (header && typeof header === 'string' && header.trim() !== '') {
          obj[header] = row[index];
        }
      });
      return obj;
    });

    // Set the script's output to the JSON stringified result.
    response.setContent(JSON.stringify(result));

  } catch (error) {
    // If any error occurs, return an error message in the JSON response.
    response.setContent(JSON.stringify({ error: 'An script error occurred: ' + error.toString() }));
  }
  
  // Return the final response.
  return response;
}
