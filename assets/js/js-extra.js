var www_url = "https://www.mi-computadora.net";
var spin_gif =
	'<div class="spinner-grow text-primary" role="status"> <span class = "sr-only" > Loading... < /span> <br> Cargando...</div>';

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
				"margin-bottom": "-150px",
				transition: "all 1.5s",
			});
		}
	});


	////-------------------------------------- SCROLL *********
	//alert($(window).width());
	$(window).scroll(function () {
		var pos = $(window).scrollTop();
		if (pos > 100) {
			$("#caja-menu").css({
				position: "fixed",
				top: "60px",
				"z-index": "15",
			});
			$("#menu2").css({
				position: "fixed",
				top: "0px",
				"z-index": "15",
			});
			$("#btn-menu").css({
				position: "fixed",
				top: "0px",
				"z-index": "300",
			});
		} else {
			$("#menu2").css({
				position: "relative",
				"z-index": "4",
			});
			$("#caja-menu").css({
				top: "160px",
				"z-index": "4",
			});
			$("#btn-menu").css({
				position: "relative",
				"z-index": "300",
			});
		}
	});

	// -------------- OWL CARROUSEL ----------------------

	$(".carousel-porta").owlCarousel({
		loop: true,
		margin: 5,
		mouseDrag: true,
		responsiveClass: true,
		autoplay: true,
		autoplayTimeout: 3000,
		dots: true,
		dotsEach: true,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
				nav: true,
			},
			600: {
				items: 2,
				nav: true,
				dots: true,
				loop: true,
			},
			1000: {
				items: 4,
				nav: true,
				loop: true,
			},
		},
	});
});
/*
$.ajaxSetup({
	error: function (x, e) {
		let err = "";
		if (x.status == 0) {
			err = "Error de conexion-.sd. \n" + x.responseText;
		} else if (x.status == 403) {
			err = "No autorizado.. \n" + x.responseText;
		} else if (x.status == 500) {
			err = "Error Interno.. \n" + x.responseText;
		} else {
			alert("Error...\n" + x.responseText);
		}
		$("#resp").html(err);
		console.log(err);
		console.log(x.responseText);
	},
});
*/
///////// AdBlock check...
async function ab_check() {
	$.ab = true;
	$(".ab-element").hide();
	async function ab() {
		try {
			fetch(
				new Request(
					"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
					{
						method: "HEAD",
						mode: "no-cors",
					}
				)
			)
				.then(function (response) {
					console.log("Ab not detected");
					//console.log(response);

					$.ab = false;
					$(".ab-element").show();
				})
				.catch(function (e) {
					console.log(
						"Estás utilizando un bloqueador de anuncios, por favor desactívalo para poder utilizar las funciones de este sitio.. Gracias! ♥"
					);
					$.ab = true;
					$(".ab-element").html(
						'<div class="alert alert-danger"><strong>No puedes ver esto porque tienes un bloqueador!</strong></div>'
					);
					$(".ab-element").show();
				});
		} catch (error) {
			console.log(error);
			$.ab = true;
		}
	}
	ab();
}
ab_check();

function form_ajax(data, url, spin_div) {
	$(spin_div).removeClass("alert-danger");
	$(spin_div).removeClass("alert-success");
	return new Promise(function (res, rej) {
		grecaptcha.ready(function () {
			grecaptcha
				.execute("6LfVMdsZAAAAAMgDNlBn2FJd_B9T-kvcpcNUPKV3", {
					action: "submit",
				})
				.then(function (token) {
					data += `&recaptcha_token=${token}`;
					$.ajax({
						data: data,
						url: url,
						type: "post",
						timeout: 30000,
						beforeSend: function () {
							$(spin_div).html(spin_gif);
							$(spin_div).show();
						},
						success: function (resp) {
							$(spin_div).addClass(
								"alert alert-success text-center"
							);
							res(resp);
						},
						error: function (xhr, ajaxOptions, thrownError) {
							$(spin_div).addClass("alert alert-danger text-center");
							if (xhr.status == 404 || xhr.status == 406) {
								$(spin_div).html(xhr.responseText);
								console.log(xhr.responseText);
								return 0;
							}
							if (xhr.status == 403) {
								$("#cuerpo").html(spin_gif);
								location.reload();
							}
							rej(xhr.responseText);
						},
					});
				})
				.catch(function (error) {
					console.log(error);
					error = $.parseJSON(error);
					$(spin_div).html(error);
					rej(error);
					setTimeout(() => {
						location.reload();
					}, 1000);
				});
		});
		//let token = "";
	});
}

function form_sin_ajax(data, url, spin_div) {
	$(spin_div).removeClass("alert-danger");
	$(spin_div).removeClass("alert-success");
	return new Promise(function (res, rej) {
		$.ajax({
			data: data,
			url: url,
			type: "post",
			timeout: 30000,
			beforeSend: function () {
				$(spin_div).html(spin_gif);
				$(spin_div).show();
			},
			success: function (resp) {
				$(spin_div).addClass("alert alert-success text-center");
				res(resp);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				$(spin_div).addClass("alert alert-danger text-center");
				if (xhr.status == 404 || xhr.status == 406) {
					$(spin_div).html(xhr.responseText);
					console.log(xhr.responseText);

				}
				if (xhr.status == 403) {
					$("#cuerpo").html(spin_gif);
					location.reload();
				}
				rej(xhr);
			},
		});
	});
}

function ajax_upload(data, url, spin_div) {
	$(spin_div).removeClass("alert-danger");
	$(spin_div).removeClass("alert-success");
	return new Promise(function (res, rej) {
		$.ajax({
			url: url,
			type: "post",
			data: data,
			processData: false,
			contentType: false,
			cache: false,
			async: false,
			timeout: 30000,
			beforeSend: function () {
				$(spin_div).html(spin_gif);
				$(spin_div).show();
			},
			success: function (resp) {
				$(spin_div).addClass(
					"alert alert-success text-center"
				);
				res(resp);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				$(spin_div).addClass("alert alert-danger text-center");
				if (xhr.status == 404 || xhr.status == 406) {
					$(spin_div).html(xhr.responseText);
					console.log(xhr.responseText);
					return 0;
				}
				if (xhr.status == 403) {
					$("#cuerpo").html(spin_gif);
					location.reload();
				}
				rej(xhr.responseText);
			},
		});
	});
}

function get_ajax(url, params, spin_div) {
	$(spin_div).removeClass("alert-danger");
	$(spin_div).removeClass("alert-success");
	$(spin_div).html(spin_gif);
	$(spin_div).show();
	return new Promise(function (res, rej) {
		$.ajaxSetup({
			timeout: 30000, // in milliseconds
		});
		$.get(url, params, function (data) {
			$(spin_div).html("");
			res(data);
		}).fail(function (xhr) {
			$(spin_div).addClass("alert alert-danger text-center");
			$(spin_div).html(xhr.responseText);
			if (xhr.status == 404 || xhr.status == 406) {
				$(spin_div).html(xhr.responseText);
				console.log(xhr.responseText);
				return 0;
			}
			if (xhr.status == 403) {
				$("#cuerpo").html(spin_gif);
				location.reload();
			}
			rej(xhr);
		});
	});
}

function wui_onlineCheck(spinner) {
	return new Promise(function (res, rej) {
		$.ajax({
			url: "https://www.vainadulce.com/wp-content/themes/mc_vainadulce/assets/js/mc_wifitest.js",
			dataType: "script",
			timeout: 20000,
			beforeSend: function () {
				$(spinner).html(spin_gif);
				$(spinner).append("<li>Validando conexión.</li>");
			},
			success: function (resp) {
				res("El usuario ya está conectado! ");
			},
			error: function (xhr, ajaxOptions, thrownError) {
				//Carga de script nuevo en WLAN..
				console.log(xhr.responseText);
				rej("Usuario sin conexión! ");
			},
		});
	});
}

/*
$.getScript(
	"https://app.mi-computadora.net/assets/js/zonawifi/captiveportal-loader.js",
	function () {
		wifi_login("Test wifi_login From js JQuery");
	},
);*/
