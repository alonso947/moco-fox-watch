MoCo Fox Watch — Connected Live Build

DATABASE CREATED IN GOOGLE DRIVE
Google Sheet URL:
https://docs.google.com/spreadsheets/d/1D74WbXKbM0H4J9PrSFYEFhgdLYzGiTjbxwOBSlyFq8I/edit?usp=drivesdk

Spreadsheet ID:
1D74WbXKbM0H4J9PrSFYEFhgdLYzGiTjbxwOBSlyFq8I

WHAT IS ALREADY DONE
- Database template created and converted to Google Sheets.
- Sightings tab has the exact required columns.
- Approved = Yes rows show publicly.
- Approved = No rows stay pending.
- The included Apps Script already contains your real Spreadsheet ID.
- The web app supports live red pins, auto-refresh, search/filtering, and pending submissions.

FINAL MANUAL DEPLOYMENT STEP REQUIRED BY GOOGLE
Google does not allow me to deploy an Apps Script Web App from here. To finish live mode:

1. Open the Google Sheet URL above.
2. Go to Extensions > Apps Script.
3. Delete any starter code.
4. Paste the contents of google-apps-script.gs.
5. Click Deploy > New deployment.
6. Select type: Web app.
7. Execute as: Me.
8. Who has access: Anyone.
9. Click Deploy and copy the Web App URL.
10. Open index.html and go to Live Setup, then paste that URL in the endpoint box.

Alternative launch URL:
index.html?api=YOUR_APPS_SCRIPT_WEB_APP_URL

COMMUNITY MODERATION
- New form reports are added to the Sheet as Approved = No.
- Review the row.
- Remove exact addresses/den details if needed.
- Change Approved to Yes.
- The public map refreshes automatically.

WILDLIFE SAFETY
Keep exact dens, private addresses, and juvenile fox locations approximate. The point of this map is awareness, not locating or disturbing wildlife.
