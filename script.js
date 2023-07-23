var qrcode = new QRCode("qrcode");
var url = document.location.href;
console.log("Current URL:", url);
var k = url.lastIndexOf("k=") > 0 ? url.substr(url.lastIndexOf("k=") + 2) : "";

if (k) {
  console.log("Google Calendar ID (k parameter):", k);
  $(".lds-ring").show();
  fetch(AS_URL_BASE + '?k=' + k)
    .then(r => r.text())
    .then((r) => {
      console.log("Fetched YouTube link from Google Apps Script:", r);
      // document.write(r);
      if (r) {
        document.location.replace(r);
      }
    })
    .catch(err => console.log("Error fetching YouTube link:", err));
} else {
  // si no hay clave, mostrar generador de QR
  $("#urlWS").text(AS_URL_BASE);
  $("#qrEdit").show();

  function makeCode() {
    var calId = $("#calId").val();
    if (calId) {
      var qrTargetUrl = url + "?k=" + encodeURI(calId);
      $("#urlQR").text(qrTargetUrl);
      $("#urlQR").attr("href", qrTargetUrl);
      qrcode.makeCode(qrTargetUrl);
    }
  }

  makeCode();

  $("#calId")
    .on("blur", function () {
      makeCode();
    })
    .on("keydown", function (e) {
      if (e.keyCode == 13) {
        makeCode();
      }
    });
}
