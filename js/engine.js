$(document).ready(function () {
	var box = document.getElementById('roundyCont');
	var imgRoundy = document.getElementById('roundyProj');
	var left = imgRoundy.offsetLeft;
	var top = imgRoundy.offsetTop;
	var arr = [];
	var h = window.innerHeight;
	var wiki = document.getElementById('wikiViewer');
	var wikiHeightHalf = wiki.offsetHeight / 2;
	var complete = false;
	var delay = true;
	var aspectRatio = 0.77777777777778;

	function coords() {
		arr = [];
		for (var i = 1; i <= 5; i++) {
			var bi = [];
			var element = document.getElementById('ball-' + i);
			bi.push(element.offsetLeft);
			bi.push(element.offsetTop);
			arr.push(bi);
			if(i == 5) {
				var proj = document.getElementById('roundyProj');
				bi = [];
				bi.push(proj.offsetLeft);
				bi.push(proj.offsetTop);
				arr.push(bi);
			}
		}
		return arr;
	}
	arr = coords();
	console.log(arr);
	$(window).resize(function () {
		$('.hi').css({ 'font-size': '35px' });
		while ($('.hi').height() > $('#hiCont').height()) {
			$('.hi').css({ 'font-size': (parseInt($('.hi').css('font-size')) - 1) + 'px' });
		}
		arr = coords();
	});

	$(function () {
		$("a.page-scroll").bind("click", function (event) {
			var anchor = $(this);
			$("html, body").stop().animate({
				scrollTop: $(anchor.attr("href")).offset().top - 50
			}, 1500, "easeInOutExpo");
			event.preventDefault();
		});
	});

	function parallax(id, e, left, top, k) {
		var obj = $('#' + id);
		var cont = $('#roundyCont');
		var offset = $('#roundyCont').offset();
		var width = parseInt($('#roundyCont').css('width'));
		var height = parseInt($('#roundyCont').css('height'));
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;
		obj.css('left', ((left + k) - ((x / width) * (k * 2))));
		obj.css('top', ((top + k) - ((y / height) * (k * 2))));
	}

	function setWidth(num) {
		var molt = num / 540;
		var currentWidth = wiki.offsetWidth;
		return molt * currentWidth;
	}

	function setHeight(num) {
		var molt = num / 420;
		var currentHeight = wiki.offsetHeight;
		return molt * currentHeight;
	}



	$('#roundyCont').on('mousemove', function (e) {
		parallax('ball-1', e, arr[0][0], arr[0][1], 10);
		parallax('ball-2', e, arr[1][0], arr[1][1], 15);
		parallax('ball-3', e, arr[2][0], arr[2][1], 6);
		parallax('ball-4', e, arr[3][0], arr[3][1], 22);
		parallax('ball-5', e, arr[4][0], arr[4][1], 6);
		parallax('roundyProj', e, arr[5][0], arr[5][1], 4);
	});

	$('#roundyCont').on('touchmove', function (e) {
		parallax('ball-1', e, arr[0][0], arr[0][1], 10);
		parallax('ball-2', e, arr[1][0], arr[1][1], 15);
		parallax('ball-3', e, arr[2][0], arr[2][1], 6);
		parallax('ball-4', e, arr[3][0], arr[3][1], 22);
		parallax('ball-5', e, arr[4][0], arr[4][1], 6);
		parallax('roundyProj', e, left, top, 4);
	});

	$(window).scroll(function () {
		if ((((wiki.offsetTop - $(window).scrollTop()) - h + wikiHeightHalf) < 0) && complete == false) {
			var tyy = new Typed('#animated', {
				strings: ["Let It Be"],
				typeSpeed: 30,
				autoInsertCss: true
			});
			function animateScreen1() {
				$('#wikiScreen1').animate({
					left: '50%'
				}, 1000)
			}
			function animateScreen2() {
				$('#wikiScreen2').animate({
					left: '50%'
				}, 1000)
			}
			window.setTimeout(animateScreen1, 500);
			window.setTimeout(animateScreen2, 700);
			complete = true;
		}
	});

	$('#pomodoroCont').hover(function () {
		$('#blur1').css({
			'transition': 'filter 0.3s',
			'-webkit-filter': 'blur(10px)',
			'filter': 'blur(10px)'
		});
		$('#blurColor1').stop().fadeTo('0.3s', '0.4');
		$('#extBtn1').stop().fadeTo('0.3s', '0.8');
	}, function () {
		$('#blur1').css({ '-webkit-filter': '', 'filter': '' });
		$('#blurColor1').stop().fadeTo('0.3s', '0');
		$('#extBtn1').stop().fadeTo('0.3s', '0')
	});

	$('#wikiViewer').hover(function () {
		$('#blur2').css({
			'transition': 'filter 0.3s',
			'-webkit-filter': 'blur(10px)',
			'filter': 'blur(10px)'
		});
		$('#blurColor2').stop().fadeTo('0.3s', '0.7');
		$('#extBtn2').stop().fadeTo('0.3s', '0.8');
	}, function () {
		$('#blur2').css({ '-webkit-filter': '', 'filter': '' });
		$('#blurColor2').stop().fadeTo('0.3s', '0');
		$('#extBtn2').stop().fadeTo('0.3s', '0');
	});

});