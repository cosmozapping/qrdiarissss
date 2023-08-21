const timeUrlList = `
`;

function switchHrefBasedOnTime(timeUrlList) {
  const currentTime = new Date();
  const lines = timeUrlList.trim().split("\n");

  let closestTimeDiff = Infinity;
  let targetUrl = null;

  // console.log(currentTime);

  // Find the target URL based on the closest time that has passed
  for (const line of lines) {
    const [startTime, url] = line.split(" ");
    const startTimeInUTC = new Date(startTime);
    const timeDiff = Math.abs(startTimeInUTC - currentTime);

    if (startTimeInUTC <= currentTime && timeDiff < closestTimeDiff) {
      closestTimeDiff = timeDiff;
      targetUrl = url;
    }
    // console.log(startTime, startTimeInUTC, url);
  }

  // console.log(targetUrl);

  if (targetUrl) {
    const anchor = document.getElementById("urlQR");
    anchor.href = targetUrl;
  }
}

switchHrefBasedOnTime(timeUrlList);
