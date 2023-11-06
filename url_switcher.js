const timeUrlList = `
2023-11-06T00:15:00+01:00 <a href="https://youtu.be/3YkxrRGrR_I?si=OuU0NOAXNhpeB-Hc">https://youtu.be/3YkxrRGrR_I?si=OuU0NOAXNhpeB-Hc</a>
2023-11-07T00:15:00+01:00 <a href="https://youtu.be/3YkxrRGrR_I?si=OuU0NOAXNhpeB-Hc">https://youtu.be/3YkxrRGrR_I?si=OuU0NOAXNhpeB-Hc</a>
`;



function switchHrefBasedOnTime(timeUrlList) {
  const currentTime = new Date();
  const lines = timeUrlList.trim().split("\n");

  let closestTimeDiff = Infinity;
  let targetUrl = null;

  // console.log(currentTime);

  // Find the target URL based on the closest time that has passed
  for (const line of lines) {
    const splits = line.split(" ");
    const startTime = splits[0];
    const url = splits.slice(1).join(' ');
    const startTimeInUTC = new Date(startTime);
    const timeDiff = Math.abs(startTimeInUTC - currentTime);

    if (startTimeInUTC <= currentTime && timeDiff < closestTimeDiff) {
      closestTimeDiff = timeDiff;
      targetUrl = url;
    }
    // console.log(startTime, startTimeInUTC, url);
  }

  console.log(targetUrl);

  if (targetUrl) {
    if (targetUrl.trim().startsWith("<a")) {
      // Extract the href attribute
      targetUrl = targetUrl.match(/href="([^"]+)"/)[1];
    }

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
