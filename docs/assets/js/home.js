/*
 *      Desarrollado por: Daniel Eduardo
 *      Webmaster - Mi-Computadora.net
 *
 **/
$(document).ready(function () {
	$('#divmenu').hide();
	setTimeout(enter(), 15000);
});
//------------------- ENTER



function enter() {
	$('#particles-js').fadeOut(20000);
	$('#particles-js').remove();
	$('#logo .micompu a').remove();
	//window.pJSDom[0].pJS.fn.vendors.destroypJS();
	$('#cover').css(
		{
			'background-image': 'none',
			'background-color': '#000',
		},
		2000
	);
	$('.micompu').animate(
		{
			position: 'relative',
			float: 'left',
			top: '0px',
			left: '0px',
			margin: '0px 5px',
			padding: '10px 0px',
			'text-align': 'left',
			'font-weight': 'bold',
			'font-size': '1.5em',
			color: 'white',
		},
		2000
	);
	$('#logo img').animate(
		{
			position: 'relative',
			float: 'left',
			top: '0px',
			left: '0px',
			margin: '0px',
			height: '90px',
			padding: '10px',
			'z-index': '99',
		},
		2000
	);
	$('#logo').animate(
		{
			position: 'relative',
			top: '0px',
			left: '0px',
			'margin-top': '0px',
			'margin-left': '0px',
			width: '100%',
			height: '90px',
		},
		2500,
		function () {
			$('#hero').slideUp(2000);
			$('.micompu').css({
				position: 'relative',
				clear: 'none',
				float: 'left',
				display: 'inline-block',
				'margin-left': '10px',
				'text-align': 'left',
				'font-size': '1.3em',
				color: 'white',
			});
			$('#logo img').css({
				position: 'relative',
				float: 'left',
				padding: '10px',
				margin: '0px',
				height: '90px',
			});
		}
	);
	$('#cover').animate(
		{
			position: 'fixed',
			width: '100%',
			height: '60px',
			'background-color': 'transparent',
			'border-bottom': 'solid 1px #fff',
		},
		2500,
		function () {
			/*if (screen.width > 750) {
			$("#divmenu").show()
		} else {
			$("#btn-divmenu").show();
		}*/

			$('#cover').hide();
			$('#menuhead').show();
			$('html, body').animate(
				{
					//scrollTop: 0
				},
				2000
			);
		}
	);
}
