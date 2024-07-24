//var spin_gif = '<div class="spin_gif"><img src="http://www.mi-computadora.net/assets/img/loading2.gif"><div>';

//------- MODALS --------
function open_modal(titulo, url, data) {
  //alert(titulo+view_cont);
  modal_spin();
  get_ajax(url, data, "#modalResp")
    .then(function (resp) {
      if (resp.charAt(0) != "{") {
        resp = resp.slice(1);
      }
      $("#modalBody").html("");
      $("#myModalLabel").html(titulo);
      resp = $.parseJSON(resp);
      $("#modalBody").append(resp.html);

    })
    .catch(function (err) {
      console.log(err);
      $("#myModalBody").append(err.responseText);
      if (err.responseText == "Forbidden#1") {
        //location.reload();
      }
    });
}

function modal_spin() {
  $("#modalResp").html("");
  $("#modalBody").html(spin_gif);
  $("#myModal").removeClass("fadeOutLeftBig");
  $("#myModal").addClass("animated fadeInUpBig");
  $("#myModal").modal("show");
}

function cierra_modal() {
  $("#modalBody").html("");
  $("#modalResp").html("");
  $("#myModal").addClass("animated fadeOutLeftBig");
  $("#myModal").modal("hide");
  //location.reload()
}
