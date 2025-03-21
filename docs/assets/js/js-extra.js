var www_url = "https://www.mi-computadora.net";
var spin_gif = '<div class="spinner-grow text-primary" role="status"> <span class = "sr-only" > Loading... < /span> <br> Cargando...</div>';

//-----------------------------
$(document).ready(function () {
	var scroll = true;

	/////--------------------- BOTONES RESPONSIVE
	$("#chk-menu").change(function () {
		$("#divmenu").toggle(500);
	});

	$("#chk-footer").change(function () {
		if ($("#chk-footer").is(":checked")) {
			$("#footer-info").css({
				"margin-bottom": "0px",
				transition: "all 1.5s",
			});
		} else {
			$("#footer-info").css({
				"margin-bottom": "-100%",
				transition: "all 1.5s",
			});
		}
	});
});

