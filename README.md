## `.github/workflows/event_fetcher.yaml`

- Working:
	- Using `fetch_events.py` fetches events from google calendar at 1am UTC for the UTC day.
	- Among the events only 2 events `Prova` and `Avui prova` events are got.
	- These event's description is got and is written to `url_switcher.js` file with their starting time.

- Configuration required:
	1. Goto https://console.cloud.google.com and create a new project.
	2. Enable Google Calender API in this project.
	3. Goto credentials sections and create a service account.
	4. Create key for the service account and download it as JSON.
	5. Copy the contents of this JSON file and add it as a repository secret with name `GOOGLE_CREDENTIALS`.
	6. Share the correct google calender with the service account.

## `index.html`

- Webpage which redirects automatically based on the time of the day using `url_switcher.js`.