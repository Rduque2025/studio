/**
 * Handles HTTP GET requests to the web app.
 * @param {Object} e - The event parameter for a GET request.
 * @returns {ContentService.TextOutput} - JSON stringified data from the sheet.
 */
function doGet(e) {
  try {
    // Open the spreadsheet by its ID or get the active one if the script is bound
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TeamMembers");
    if (!sheet) {
      throw new Error("Sheet 'TeamMembers' not found.");
    }

    // Get all data from the sheet, excluding the header row
    var range = sheet.getDataRange();
    var values = range.getValues();
    var headers = values.shift(); // Get and remove the header row

    // Map the values to an array of objects
    var data = values.map(function(row) {
      var obj = {};
      headers.forEach(function(header, i) {
        obj[header] = row[i];
      });
      return obj;
    });

    // Return the data as a JSON response
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Log the error for debugging
    console.error("Error in doGet: " + error.toString());

    // Return an error message in JSON format
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
