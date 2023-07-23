var qrcode = new QRCode("qrcode");
var url = document.location.href;
console.log("Current URL:", url);
var k = url.lastIndexOf("k=") > 0 ? url.substr(url.lastIndexOf("k=") + 2) : "";

var qrcode = new QRCode("qrcode");
var url = document.location.href;
var k = url.lastIndexOf("k=") > 0 ? url.substr(url.lastIndexOf("k=") + 2) : "";

if (k) {
  console.log(k);
  $(".lds-ring").show();
  fetch(AS_URL_BASE + '?k=' + encodeURIComponent(k)) // Encode the k parameter
    .then(r => r.text())
    .then((r) => {
      console.log(r);
      if (r) {
        document.location.replace(r);
      }
    })
    .catch(err => console.log(err))
} else {
  // si no hay clave, mostrar generador de QR
  $("#urlWS").text(AS_URL_BASE);
  $("#qrEdit").show();

 function makeCode() {
  var calId = $("#calId").val();
  if (calId) {
    var encodedCalId = encodeURIComponent(calId); // Encode the calId
    var qrTargetUrl = url + "?k=" + encodedCalId; // Pass the encoded calId to the URL
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
