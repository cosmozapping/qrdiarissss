import datetime
from google.oauth2 import service_account
from googleapiclient.discovery import build

def fetch_events():
    credentials = service_account.Credentials.from_service_account_file(
        "./credentials.json",
        scopes=["https://www.googleapis.com/auth/calendar.readonly"]
    )

    service = build("calendar", "v3", credentials=credentials)

    # Calculate start and end times for the day.
    today = datetime.datetime.now().date()
    start_time = datetime.datetime(today.year, today.month, today.day, 0, 0, 0).isoformat() + "Z"
    end_time = datetime.datetime(today.year, today.month, today.day, 23, 59, 59).isoformat() + "Z"

    # Fetch events for the day of the calender ID
    events_result = service.events().list(
        calendarId="cosmozapping@gmail.com",
        timeMin=start_time,
        timeMax=end_time,
        singleEvents=True,
        orderBy="startTime",
    ).execute()

    # Only get `Prova` and `Avui prova` events
    events = events_result.get("items", [])
    if not events:
        print("No events found.")
    else:
        event_count = 0
        with open("events.txt", "w") as file:
            for event in events:
                summary = event.get("summary", "")
                description = event.get("description", "Default URL here")
                start_time = event.get("start", {}).get("dateTime", "No start time available.")
                if event_count < 2 and (summary == "Prova" or summary == "Avui prova"):
                    event_count += 1
                    file.write(f"{start_time} {description}\n")
                    if event_count == 2:
                        break

if __name__ == "__main__":
    fetch_events()
