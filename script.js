var qrcode = new QRCode("qrcode");
var url = document.location.href;
console.log(url);
var k = url.lastIndexOf("k=")>0 ? url.substr(url.lastIndexOf("k=")+2) : "";

if(k){
  console.log(k);
  $(".lds-ring").show();
  fetch(AS_URL_BASE+'?k='+k)
  .then(r => r.text())
  .then((r) => {
    console.log(r);
    //document.write(r);
    if(r){
      document.location.replace(r);
    }
  })
  .catch(err => console.log(err))

}
else
{
  // si no hay clave, mostrar generador de QR
  $("#urlWS").text(AS_URL_BASE);
  $("#qrEdit").show();

  function makeCode() {
    var calId = $("#calId").val();
    if(calId){
      var qrTargetUrl=url+"?k="+encodeURI(calId);
      $("#urlQR").text(qrTargetUrl);
      $("#urlQR").attr("href",qrTargetUrl);
      qrcode.makeCode(qrTargetUrl);
    }
  }

  makeCode();

  $("#calId").
    on("blur", function () {
      makeCode();
    }).
    on("keydown", function (e) {
      if (e.keyCode == 13) {
        makeCode();
      }
    });
}
