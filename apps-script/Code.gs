/**
 * Google Apps Script web app that receives leads from themarketingking.org.
 *
 * Setup:
 * 1. Paste this file into the Apps Script project bound to the lead spreadsheet.
 * 2. The target tab must be named exactly "Sheet1".
 * 3. Deploy as a web app: Execute as "Me", Who has access "Anyone".
 * 4. After any code change: Manage deployments -> Edit -> Version: New version
 *    -> Deploy. The /exec URL does not pick up edits otherwise.
 *
 * If the script is standalone instead of bound to the spreadsheet, set
 * SPREADSHEET_ID below to the spreadsheet ID.
 */

var SPREADSHEET_ID = "";
var SHEET_NAME = "Sheet1";
var NOTIFICATION_EMAIL = "mnmarketing3454@gmail.com";
var REQUIRED_FIELDS = [
  "name",
  "email",
  "countryCode",
  "phone",
  "budget",
  "service",
];

function jsonResponse(success, message) {
  var payload = {
    success: !!success,
    status: success ? "success" : "error",
    message: message || "",
  };
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function firstValue(value) {
  if (Array.isArray(value)) {
    return firstValue(value.length ? value[0] : "");
  }
  if (value === undefined || value === null) {
    return "";
  }
  return String(value).trim();
}

function readRequest(e) {
  var payload = {};

  if (e && e.postData && e.postData.contents) {
    var raw = String(e.postData.contents).trim();
    try {
      var parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        Object.keys(parsed).forEach(function (key) {
          payload[key] = parsed[key];
        });
      }
    } catch (jsonError) {
      // Some clients post application/x-www-form-urlencoded instead of JSON.
      raw.split("&").forEach(function (pair) {
        var separator = pair.indexOf("=");
        if (separator === -1) {
          return;
        }
        try {
          var key = decodeURIComponent(
            pair.slice(0, separator).replace(/\+/g, " ")
          );
          var value = decodeURIComponent(
            pair.slice(separator + 1).replace(/\+/g, " ")
          );
          if (key) {
            payload[key] = value;
          }
        } catch (decodeError) {
          // Ignore malformed pairs; validation below handles missing fields.
        }
      });
    }
  }

  // Fallback for query-string posts, which arrive in e.parameter / e.parameters.
  if (e && e.parameter) {
    Object.keys(e.parameter).forEach(function (key) {
      if (!payload[key]) {
        payload[key] = e.parameter[key];
      }
    });
  }
  if (e && e.parameters) {
    Object.keys(e.parameters).forEach(function (key) {
      if (!payload[key]) {
        payload[key] = e.parameters[key];
      }
    });
  }

  return payload;
}

function getLeadSheet() {
  var spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet ? spreadsheet.getSheetByName(SHEET_NAME) : null;
}

function sendNotification(data) {
  try {
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: "New website lead: " + data.name,
      body: [
        "A new lead was submitted on themarketingking.org.",
        "",
        "Name: " + data.name,
        "Email: " + data.email,
        "Country code: " + data.countryCode,
        "WhatsApp: " + data.phone,
        "Budget: " + data.budget,
        "Service: " + data.service,
        "Submitted: " + new Date().toISOString(),
      ].join("\n"),
    });
  } catch (mailError) {
    // The lead is already saved; a mail quota issue must not fail the request.
    Logger.log("Notification email failed: " + mailError);
  }
}

function doPost(e) {
  try {
    var payload = readRequest(e);
    var data = {};
    REQUIRED_FIELDS.forEach(function (field) {
      data[field] = firstValue(payload[field]);
    });

    var missing = REQUIRED_FIELDS.filter(function (field) {
      return !data[field];
    });
    if (missing.length) {
      return jsonResponse(false, "Missing required fields: " + missing.join(", "));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return jsonResponse(false, "Invalid email address.");
    }

    var sheet = getLeadSheet();
    if (!sheet) {
      return jsonResponse(false, 'Sheet "' + SHEET_NAME + '" was not found.');
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Country Code",
        "Phone",
        "Budget",
        "Service",
      ]);
    }

    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.countryCode,
      data.phone,
      data.budget,
      data.service,
    ]);

    sendNotification(data);

    return jsonResponse(true, "Lead saved successfully.");
  } catch (error) {
    Logger.log("doPost failed: " + (error && error.stack ? error.stack : error));
    return jsonResponse(false, "Unable to save the lead. Please try again.");
  }
}

function doGet() {
  return jsonResponse(true, "TMK lead web app is live.");
}
