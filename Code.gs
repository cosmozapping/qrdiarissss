function doGet(e) {
  var calendarId = e.parameter.k;
  var cal = CalendarApp.getCalendarById(calendarId);
  var now = new Date();
  var next5Mins = new Date(now.getTime() + 5 * 70 * 1000);
  var qrEvt = cal
    .getEvents(now, next5Mins)
    .sort((a,b) => getDuration(a) - getDuration(b))
    .find(e => e.getStartTime() <= now);
  if(qrEvt){
    return ContentService.createTextOutput(qrEvt.getDescription()); 
  }
}

function getDuration(e){
  return e.getEndTime() - e.getStartTime();
}
