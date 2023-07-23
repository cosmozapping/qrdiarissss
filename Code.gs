function doGet(e) {
 var encodedCalendarId = e.parameter.k;
  var calendarId = decodeURIComponent(encodedCalendarId);
  var calendarId = e.parameter.k;
  var cal = CalendarApp.getCalendarById(calendarId);
  var now = new Date();
  var next5Mins = new Date(now.getTime() + 5 * 70 * 1000);
  var qrEvt = cal
    .getEvents(now, next5Mins)
    .sort((a, b) => getDuration(a) - getDuration(b))
    .find(e => e.getStartTime() <= now);

  if (qrEvt) {
    var description = qrEvt.getDescription();
    var youtubeLink = extractYouTubeLink(description);
    return ContentService.createTextOutput(youtubeLink);
  }
}

function extractYouTubeLink(description) {
  // Use regular expressions to extract the YouTube link from the description
  var youtubeRegex = /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/;
  var matches = description.match(youtubeRegex);

  if (matches && matches.length >= 2) {
    return matches[0]; // The first element will contain the full YouTube link
  } else {
    return ""; // Return an empty string if no YouTube link is found in the description
  }
}

function getDuration(e) {
  return e.getEndTime() - e.getStartTime();
}
