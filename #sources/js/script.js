$(document).ready(function () {
	const isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOs: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.iOs() ||
				isMobile.Opera() ||
				isMobile.Windows());
		}
	};

	if (isMobile.any()) {
		document.body.classList.add('_touch');
	} else {
		document.body.classList.add('_pc');
	}

	//! Menu burger
	const iconMenu = document.querySelector('.menu__icon');
	if (iconMenu) {
		const menuBody = document.querySelector('.menu__body');
		iconMenu.addEventListener('click', function (e) {
			document.body.classList.toggle('_lock');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		});
	}

	//! Scroll
	const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
	if (menuLinks.length > 0) {
		menuLinks.forEach(menuLink => {
			menuLink.addEventListener('click', onMenuLinkClick)
		});

		function onMenuLinkClick(e) {
			const menuLink = e.target;
			if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
				const gotoBlock = document.querySelector(menuLink.dataset.goto);
				const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

				window.scrollTo({
					top: gotoBlockValue,
					behavior: 'smooth'
				});
				e.preventDefault();
			}
		};
	};

	function ibg() {
		$.each($('.ibg'), function (index, val) {
			if ($(this).find('img').length > 0) {
				$(this).css('background-image', 'url("' + $(this).find('img').attr('src') + '")');
			}
		});
	}
	ibg();

	//! Show parameters` block
	$('.parameters-search__title').click(function () {
		$('.search-parameters__column').css('display', 'flex');
		$('.search-parameters').slideDown(400);
		$('.parameters-search-1').slideUp(380);
		$('.search-parameters__btn').click(function () {
			$('.search-parameters').slideUp(400);
			$('.parameters-search-1').slideDown(380);
		});
	});

	//! Select 
	const selected = document.querySelector('.selected');
	const optionsContainer = document.querySelector('.options-container');
	const optionsList = document.querySelectorAll('.option');
	const searchBox = document.querySelector('.search-box');

	selected.addEventListener('click', () => {
		optionsContainer.classList.toggle('active-select');
		searchBox.value = '';
		filterList('');
		if (optionsList.classList.contains('active-select')) {
			searchBox.focus();
		}
	});

	optionsList.forEach(o => {
		o.addEventListener('click', () => {
			selected.innerHTML = o.querySelector('label').innerHTML;
			selected.style.color = '#35424B';
			optionsContainer.classList.remove('active-select');
		});
	});

	searchBox.addEventListener('keyup', function (b) {
		filterList(b.target.value);
	});
	const filterList = searchTerm => {
		searchTerm = searchTerm.toLowerCase();
		optionsList.forEach(option => {
			let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
			if (label.indexOf(searchTerm) != -1) {
				option.style.display = 'block';
			} else {
				option.style.display = 'none';
			}
		});
	};

	//! Range
	$(function () {
		// Initiate Slider
		$('#slider-range').slider({
			range: true,
			min: 2,
			max: 60,
			step: 1,
			values: [2, 60]
		});

		// Move the range wrapper into the generated divs
		$('.ui-slider-range').append($('.range-wrapper'));

		// Apply initial values to the range container
		$('.range').html('<span class="range-value">' + $('#slider-range').slider("values", 0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value">' + $("#slider-range").slider("values", 1).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');

		// Hide the gears when the mouse is released
		// Done on document just incase the user hovers off of the handle
		$(document).on('mouseup', function () {
			if ($('.gear-large').hasClass('active')) {
				$('.gear-large').removeClass('active');
			}
		});

		// Rotate the gears
		var gearOneAngle = 0,
			gearTwoAngle = 0,
			rangeWidth = $('.ui-slider-range').css('width');

		$('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
		$('.gear-two').css('transform', 'rotate(' + gearTwoAngle + 'deg)');

		$('#slider-range').slider({
			slide: function (event, ui) {

				// Update the range container values upon sliding

				$('.range').html('<span class="range-value">' + ui.values[0].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span><span class="range-divider"></span><span class="range-value">' + ui.values[1].toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</span>');

				// Get old value
				var previousVal = parseInt($(this).data('value'));

				// Save new value
				$(this).data({
					'value': parseInt(ui.value)
				});

				// Figure out which handle is being used
				if (ui.values[0] == ui.value) {

					// Left handle
					if (previousVal > parseInt(ui.value)) {
						// value decreased
						gearOneAngle -= 7;
						$('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
					} else {
						// value increased
						gearOneAngle += 7;
						$('.gear-one').css('transform', 'rotate(' + gearOneAngle + 'deg)');
					}

				} else {

					// Right handle
					if (previousVal > parseInt(ui.value)) {
						// value decreased
						gearOneAngle -= 7;
						$('.gear-two').css('transform', 'rotate(' + gearOneAngle + 'deg)');
					} else {
						// value increased
						gearOneAngle += 7;
						$('.gear-two').css('transform', 'rotate(' + gearOneAngle + 'deg)');
					}

				}

				if (ui.values[1] === 120) {
					if (!$('.range-alert').hasClass('active')) {
						$('.range-alert').addClass('active');
					}
				} else {
					if ($('.range-alert').hasClass('active')) {
						$('.range-alert').removeClass('active');
					}
				}
			}
		});

		$('.range, .range-alert').on('mousedown', function (event) {
			event.stopPropagation();
		});

	});

	//! Spoiler
	$('.spoiler__title').click(function (event) {
		if ($('.search-parameters__people').hasClass('people')) {
			$('.spoiler__title').not($(this)).removeClass('active');
			$('.spoiler__content').not($(this).next()).slideUp('active');
		}
		$(this).toggleClass('active').next().slideToggle(300);
	});
	$(document).mouseup(function (e) {
		var container = $('.spoiler__content');
		if (container.has(e.target).length === 0) {
			container.hide();
		}
	});

	//! Add and subtract people
	let numberOfAdults = document.getElementById('amount-adults').innerHTML;
	let numberOfKids = document.getElementById('amount-kids').innerHTML;
	let minusHumanAdult = document.querySelector('#spoiler-subtrack-adults');
	let plusHumanAdult = document.querySelector('#spoiler-add-adults');
	let minusHumanKid = document.querySelector('#spoiler-subtrack-kids');
	let plusHumanKid = document.querySelector('#spoiler-add-kids');

	function btnAdults() {
		$('#spoiler-subtrack-adults').prop('disabled', true);
		$('#spoiler-subtrack-adults').addClass('btn-disable');
		plusHumanAdult.addEventListener('click', function () {
			numberOfAdults++;
			$('#amount-adults').text(numberOfAdults);
			if (numberOfAdults > 0 && numberOfAdults < 100) {
				$('#spoiler-subtrack-adults').prop('disabled', false);
				$('#spoiler-subtrack-adults').removeClass('btn-disable');
			} else if (numberOfAdults >= 100) {
				$('#spoiler-add-adults').prop('disabled', true);
				$('#spoiler-add-adults').addClass('btn-disable');
				$('#spoiler-subtrack-adults').prop('disabled', false);
				$('#spoiler-subtrack-adults').removeClass('btn-disable');
			}
		});
		minusHumanAdult.addEventListener('click', function () {
			numberOfAdults--;
			$('#amount-adults').text(numberOfAdults);
			if (numberOfAdults > 0 && numberOfAdults <= 100) {
				$('#spoiler-subtrack-adults').prop('disabled', false);
				$('#spoiler-subtrack-adults').removeClass('btn-disable');
				$('#spoiler-add-adults').prop('disabled', false);
				$('#spoiler-add-adults').removeClass('btn-disable');
			} else if (numberOfAdults === 0) {
				$('#spoiler-subtrack-adults').prop('disabled', true);
				$('#spoiler-subtrack-adults').addClass('btn-disable');
			}
		});
	}

	function btnKids() {
		$('#spoiler-subtrack-kids').prop('disabled', true);
		$('#spoiler-subtrack-kids').addClass('btn-disable');
		plusHumanKid.addEventListener('click', function () {
			numberOfKids++;
			$('#amount-kids').text(numberOfKids);
			if (numberOfKids > 0 && numberOfKids < 100) {
				$('#spoiler-subtrack-kids').prop('disabled', false);
				$('#spoiler-subtrack-kids').removeClass('btn-disable');
			} else if (numberOfKids >= 100) {
				$('#spoiler-add-kids').prop('disabled', true);
				$('#spoiler-add-kids').addClass('btn-disable');
				$('#spoiler-subtrack-kids').prop('disabled', false);
				$('#spoiler-subtrack-kids').removeClass('btn-disable');
			}
		});
		minusHumanKid.addEventListener('click', function () {
			numberOfKids--;
			$('#amount-kids').text(numberOfKids);
			if (numberOfKids > 0 && numberOfKids <= 100) {
				$('#spoiler-subtrack-kids').prop('disabled', false);
				$('#spoiler-subtrack-kids').removeClass('btn-disable');
				$('#spoiler-add-kids').prop('disabled', false);
				$('#spoiler-add-kids').removeClass('btn-disable');
			} else if (numberOfKids === 0) {
				$('#spoiler-subtrack-kids').prop('disabled', true);
				$('#spoiler-subtrack-kids').addClass('btn-disable');
			}
		});
	}
	btnAdults();
	btnKids();


	$(function () {
		$(".phone").mask('+38(999) 999 9999');
	});

	//! Tabs countries
	$('.tabs__item').click(function (e) {
		e.preventDefault();
		$('.tabs__item').removeClass('tabs__item-active');
		$('.tabs__content').removeClass('tabs__content-active');

		$(this).addClass('tabs__item-active');
		$($(this).attr('href')).addClass('tabs__content-active');
	});
	$('.tabs__item:first').click();

	//! Tabs mailing
	$('.tabs-mailing__link').click(function (e) {
		e.preventDefault();
		$('.tabs-mailing__link').removeClass('tabs-mailing__link-active');
		$('.tabs-mailing__content').removeClass('tabs-mailing__content-active');

		$(this).addClass('tabs-mailing__link-active');
		$($(this).attr('href')).addClass('tabs-mailing__content-active');
	});
	$('.tabs-mailing__link:first').click();

	//! Slider reviews
	$('.slider').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: true,
		draggable: false,
		swipe: true,
		touchTreshold: 10,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					dots: true
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					adaptiveHeight: true,
					dots: true
				}
			}
		]
	});

	//! Slider tours
	$('.travel__sale-slider').slick({
		infinite: false,
		slidesToShow: 2,
		slidesToScroll: 2,
		dots: true,
		arrows: false,
		responsive: [
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true
				}
			}
		]
	});

	//! Slider specials
	$('.special__slider').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: false
	});

	//! Disable X-scrolling
	var scrollEventHandler = function () {
		window.scroll(0, window.pageYOffset)
	}
	window.addEventListener('scroll', scrollEventHandler, false);

});


