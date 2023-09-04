const timeUrlList = `
2023-08-11T08:30:00+05:30 https://before.example.com
2023-08-11T14:00:00+05:30 https://after.example.com
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
    document.querySelector("#redirector").style.display = "block";
    // Redirect
    document.location.replace(targetUrl);

    // Fallback redirect
    const metaRefresh = document.querySelector('meta[http-equiv="refresh"]');
    metaRefresh.content = `5; url = ${targetUrl}`;

    // Secondary fallback, manual redirect
    const DOMtargetURL = document.getElementById("targetURL");
    DOMtargetURL.href = targetUrl;
    DOMtargetURL.innerText = targetUrl;

    const qrcode = new QRCode("qrcode");
    qrcode.makeCode(targetUrl);
  }
}

switchHrefBasedOnTime(timeUrlList);
