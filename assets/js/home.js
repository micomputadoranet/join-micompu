/*
 *      Desarrollado por: Daniel Eduardo
 *      Webmaster - Mi-Computadora.net
 *
 **/
$(document).ready(function () {
	//////////// CARGAR BLOGS ///////////
	$(".carousel-blog").html(spin_gif);
	var i = 0;
	var html = "";
	var resp = [];
	var scroll = true;
	var url = "https://www.mi-computadora.net/wp-json/wp/v2/posts?_embed";
	$.ajax({
		url: url,
		type: "get",
		timeout: 120000,
		beforeSend: function () {
			$("#resp-wp").html(spin_gif);
		},
		success: function (resp) {
			if (resp) {
				$("#resp-wp").remove();
				$.each(resp, function (i, a) {
					if (i <= 10) {
						var excerpt = a.excerpt.rendered.substring(3, 300);
						//console.log(excerpt);
						var palabras = excerpt.split(" ", 10);
						excerpt = palabras.join(" ");
						excerpt += "...";
						html += `<div class="noti-article">
									<div class="noti-artic1">
										<a href="${a.link}"><img src="${a._embedded["wp:featuredmedia"][0].source_url}" alt="${a._embedded["wp:featuredmedia"][0].alt_text}" class="noti-img"></a>
										<a href="${a.link}" class="noti-titu">${a.title.rendered}</a>										
									</div>
								</div>`;
					}
					i++;
				});
				$(".carousel-blog").html(html);
				$(".carousel-blog").owlCarousel({
					loop: true,
					margin: 2,
					mouseDrag: true,
					responsiveClass: true,
					autoplay: true,
					autoplayTimeout: 15000,
					autoplayHoverPause: true,
					responsive: {
						0: {
							items: 2,
							nav: true,
						},
						800: {
							items: 2,
							nav: true,
							dots: false,
							loop: true,
						},
						1000: {
							items: 5,
							nav: true,
							dots: false,
							loop: true,
						},
					},
				});
			}
		},
		error: function (jqXHR, estado, error) {
			console.log("Error:" + error);
		},
	});

	///////////////////////////////////////////////////
	$("#divmenu").hide();
	/* // ----------- EFECTOS WAYPOINT (Requiere Waypoints)---------
	
	$("#ventas2").waypoint(
		function (direction) {
			if (direction == "down") {
				$(".img-porta").show();
				$(".img-porta").addClass("animated flipInX");
			} else {
				$(".img-porta").hide();
				$(".img-porta").removeClass("animated flipInX");
			}
		},
		{
			offset: "50%",
		},
	);
	$("#frase").waypoint(
		function (direction) {
			if (direction == "down") {
				$("#frase img").fadeIn(2000);
			} else {
				$("#frase img").fadeOut(1000);
			}
		},
		{
			offset: "30%",
		},
	);
	$("#home-blog").waypoint(
		function (direction) {
			if (direction == "down") {
				$(".noti-article").addClass("animated slideInRight");
			} else {
				$(".noti-article").removeClass("animated slideInRight");
			}
		},
		{
			offset: "30%",
		},
	);
	$("#comunidad").waypoint(
		function (direction) {
			if (direction == "down") {
				$("#comunidad h1").addClass("animated slideInDown");
				$("#comunidad h2").addClass("animated slideInUp");
				$(".icono-comunidad").addClass("animated zoomIn");
				$("#link-reg").addClass("animated shake");
			} else {
				$("#comunidad h1").removeClass("animated slideInDown");
				$("#comunidad h2").removeClass("animated slideInUp");
				$(".icono-comunidad").removeClass("animated zoomIn");
				$("#link-reg").removeClass("animated shake");
			}
		},
		{
			offset: "20%",
		},
	);
	$("#servicios").waypoint(
		function (direction) {
			if (direction == "down") {
				$("#servicios h1").addClass("animated slideInDown");
				$("#servicios h2").addClass("animated slideInUp");
				$(".grid-div1 img").addClass("animated slideInLeft");
				$("#linkserv").addClass("animated shake");
			} else {
				$("#servicios h1").removeClass("animated slideInDown");
				$("#servicios h2").removeClass("animated slideInUp");
				$(".grid-div1 img").removeClass("animated slideInLeft");
				$("#linkserv").removeClass("animated shake");
			}
		},
		{
			offset: "20%",
		},
	);
	*/
});
//------------------- ENTER

setTimeout(enter(), 5000);

function enter() {
	$("#particles-js").fadeOut(20000);
	$("#particles-js").remove();
	$("#logo .micompu a").remove();
	//window.pJSDom[0].pJS.fn.vendors.destroypJS();
	$("#cover").css(
		{
			"background-image": "none",
			"background-color": "#000",
		},
		2000
	);
	$(".micompu").animate(
		{
			position: "relative",
			float: "left",
			top: "0px",
			left: "0px",
			margin: "0px 5px",
			padding: "10px 0px",
			"text-align": "left",
			"font-weight": "bold",
			"font-size": "1.5em",
			color: "white",
		},
		2000
	);
	$("#logo img").animate(
		{
			position: "relative",
			float: "left",
			top: "0px",
			left: "0px",
			margin: "0px",
			height: "90px",
			padding: "10px",
			"z-index": "99",
		},
		2000
	);
	$("#logo").animate(
		{
			position: "relative",
			top: "0px",
			left: "0px",
			"margin-top": "0px",
			"margin-left": "0px",
			width: "100%",
			height: "90px",
		},
		2500,
		function () {
			$("#hero").slideUp(2000);
			$(".micompu").css({
				position: "relative",
				clear: "none",
				float: "left",
				display: "inline-block",
				"margin-left": "10px",
				"text-align": "left",
				"font-size": "1.3em",
				color: "white",
			});
			$("#logo img").css({
				position: "relative",
				float: "left",
				padding: "10px",
				margin: "0px",
				height: "90px",
			});
		}
	);
	$("#cover").animate(
		{
			position: "fixed",
			width: "100%",
			height: "60px",
			"background-color": "transparent",
			"border-bottom": "solid 1px #fff",
		},
		2500,
		function () {
			/*if (screen.width > 750) {
			$("#divmenu").show()
		} else {
			$("#btn-divmenu").show();
		}*/

			$("#cover").hide();
			$("#menuhead").show();
			$("html, body").animate(
				{
					//scrollTop: 0
				},
				2000
			);
		}
	);
}
///////////////////////
