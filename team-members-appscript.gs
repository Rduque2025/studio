
/**
 * Handles HTTP POST requests to the web app.
 * This function is the entry point for the Apps Script web app.
 * It reads data from a Google Sheet named "TeamMembers" and returns it as JSON.
 *
 * @param {Object} e The event parameter for a POST request.
 * @return {ContentService.TextOutput} The JSON response.
 */
function doPost(e) {
  try {
    // Access the active spreadsheet and the specific sheet by name
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TeamMembers");
    if (!sheet) {
      return createJsonResponse({ success: false, message: "Sheet 'TeamMembers' not found." });
    }

    // Get all data from the sheet, excluding empty rows/columns at the end
    var data = sheet.getDataRange().getValues();
    
    // Check if there is data to process
    if (data.length < 2) {
      return createJsonResponse({ success: true, data: [] }); // No data rows, just a header
    }

    // The first row is the header
    var headers = data[0];
    var jsonData = [];

    // Iterate over each row (starting from the second row) to create JSON objects
    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      // Skip empty rows
      if (row.join("").trim() === "") continue;

      var obj = {};
      for (var j = 0; j < headers.length; j++) {
        var header = headers[j];
        // Ensure the header is a non-empty string before using it as a key
        if (header) {
          obj[header] = row[j];
        }
      }
      jsonData.push(obj);
    }

    // Return a successful response with the data
    return createJsonResponse({ success: true, data: jsonData });

  } catch (error) {
    // Log the error for debugging
    console.error("Error in doPost: " + error.toString());
    // Return a generic error response
    return createJsonResponse({ success: false, message: "An unexpected error occurred: " + error.message });
  }
}

/**
 * Creates a JSON response object for the web app.
 *
 * @param {Object} responseObject The JavaScript object to stringify.
 * @return {ContentService.TextOutput} The content service object as a JSON string.
 */
function createJsonResponse(responseObject) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}
