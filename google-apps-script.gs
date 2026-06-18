// MoCo Fox Watch — Live Google Sheet Backend
// Already connected to your created Google Sheet ID.
// Deploy this file in Google Apps Script as a Web App:
// Execute as: Me
// Who has access: Anyone

const SPREADSHEET_ID = '1D74WbXKbM0H4J9PrSFYEFhgdLYzGiTjbxwOBSlyFq8I';
const SHEET_NAME = 'Sightings';

const HEADERS = [
  'Timestamp', 'Approved', 'Sighting Date', 'Time of Day', 'Area', 'Approx Location',
  'Latitude', 'Longitude', 'Behavior', 'Count', 'Notes', 'Photo URL', 'Reporter Email', 'Confidence'
];

function doGet(e) {
  const action = (e.parameter.action || 'list').toLowerCase();
  const callback = e.parameter.callback || '';
  const output = action === 'list' ? listApprovedSightings_() : { ok: false, error: 'Unknown action' };
  const json = JSON.stringify(output);

  // JSONP support so the browser map can load data without CORS issues.
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + json + ');')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = getSheet_();
  const p = e.parameter || {};
  sheet.appendRow([
    new Date(),
    'No', // Moderator changes this to Yes when safe/approved.
    p.sightingDate || '',
    p.timeOfDay || '',
    p.area || '',
    p.approxLocation || '',
    p.latitude || '',
    p.longitude || '',
    p.behavior || '',
    p.count || '1',
    p.notes || '',
    p.photoUrl || '',
    p.reporterEmail || '',
    'Community report'
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function listApprovedSightings_() {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return { ok: true, sightings: [] };

  const headers = values[0].map(String);
  const idx = name => headers.indexOf(name);
  const rows = values.slice(1);

  const sightings = rows
    .filter(r => String(r[idx('Approved')] || '').toLowerCase() === 'yes')
    .map(r => ({
      timestamp: stringifyDate_(r[idx('Timestamp')]),
      approved: r[idx('Approved')],
      sightingDate: stringifyDate_(r[idx('Sighting Date')]),
      timeOfDay: r[idx('Time of Day')],
      area: r[idx('Area')],
      approxLocation: r[idx('Approx Location')],
      latitude: Number(r[idx('Latitude')]),
      longitude: Number(r[idx('Longitude')]),
      behavior: r[idx('Behavior')],
      count: Number(r[idx('Count')] || 1),
      notes: r[idx('Notes')],
      photoUrl: r[idx('Photo URL')],
      confidence: r[idx('Confidence')] || 'Community report'
    }))
    .filter(s => isFinite(s.latitude) && isFinite(s.longitude));

  return { ok: true, sightings: sightings };
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  if (firstRow.join('') === '') sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  return sheet;
}

function stringifyDate_(value) {
  if (Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value)) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return value || '';
}
