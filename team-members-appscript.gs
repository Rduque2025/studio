/**
 * Google Apps Script to fetch team member data from a Google Sheet.
 * Sheet Name: TeamMembers
 * Returns data as a JSON array of objects.
 */

function doGet(e) {
  try {
    // Open the spreadsheet by its ID and select the "TeamMembers" sheet.
    // Replace 'YOUR_SPREADSHEET_ID_HERE' with your actual spreadsheet ID,
    // or run this script directly from the spreadsheet editor.
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("TeamMembers");
    if (!sheet) {
      throw new Error("Sheet 'TeamMembers' not found.");
    }

    // Get all data from the sheet, excluding the header row.
    var range = sheet.getDataRange();
    var values = range.getValues();
    
    // The first row is assumed to be the header.
    var headers = values.shift(); 
    
    var data = [];
    
    // Iterate over each row and create an object.
    values.forEach(function(row) {
      // Only process rows that have a non-empty value in the 'Nombre' column (Column A).
      if (row[0]) { 
        var rowObject = {};
        headers.forEach(function(header, index) {
          // Ensure the header is a string and trim it to use as a key.
          var key = String(header).trim();
          if (key) {
            rowObject[key] = row[index];
          }
        });
        data.push(rowObject);
      }
    });

    // Return the data as a JSON string.
    var jsonOutput = JSON.stringify(data);
    
    return ContentService.createTextOutput(jsonOutput)
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // In case of an error, return a JSON error message.
    var errorResponse = {
      success: false,
      message: error.toString()
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
