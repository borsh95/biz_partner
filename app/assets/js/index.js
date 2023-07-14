require('./base');
require('./chunks');

const { throttle, toggleOverflowDocument } = require('./utils/utils');

window.addEventListener('DOMContentLoaded', function () {
	{
		const headerEl = document.querySelector('header');
		const rootEl = document.documentElement;

		const setVariableHeightHeader = (el) => {
			rootEl.style.setProperty("--header-height", el.getBoundingClientRect().height + "px");
		}

		if (headerEl) {
			setTimeout(() => { setVariableHeightHeader(headerEl) }, 0);

			['resize', 'load', 'scroll'].forEach(listener => {
				window.addEventListener(listener, throttle(function () {
					setVariableHeightHeader(headerEl);
				}, 100));
			});

			showHeader(headerEl);

			function showHeader(el) {
				const $el = (typeof el === 'string') ? document.querySelector(el) : el;
				let scrolling = window.pageYOffset;
				let fixingIndent = 30;
				let isFix = false;
				let isShow = false;

				scrollHandler();

				window.addEventListener('scroll', throttle(scrollHandler, 100));

				window.addEventListener('resize', function () {
					fixingIndent = $el.offsetHeight + 20;
				})

				function scrollHandler() {
					toggleShow();
					toggleFix();
				}

				function toggleShow() {
					if (scrolling > window.pageYOffset && !isShow) {
						$el.classList.add('show');
						isShow = true;
					} else if (scrolling < window.pageYOffset && isShow) {
						$el.classList.remove('show');
						isShow = false;
					}

					scrolling = window.pageYOffset;
				}

				function toggleFix() {
					if (window.pageYOffset > fixingIndent) {
						if (isFix) return;

						$el.classList.add('fixed');
						isFix = true;
					} else if (window.pageYOffset < fixingIndent) {
						if (!isFix) return;

						$el.classList.remove('fixed');
						isFix = false;
					}
				}
			}
		}
	}

	// Select
	{
		const $selects = $('.select');
		const toggleFilledField = (selectEl) => {
			const instanceSelect = $(selectEl).data().instance
			const isFilled = !!(instanceSelect.isFilled
				|| instanceSelect?.instanceOptions?.state?.options?.itemsActive?.length);

			$(selectEl)
				.closest('.field')
				.toggleClass('filled', isFilled);
		};

		$selects.select();
		$selects.each((_, item) => toggleFilledField(item));

		$(document).on('ajax:update', function (e) {
			$(e.target).hasClass('select') && $(e.target).select();
			$(e.target).find('.select').select();
		});

		$(document).on('select:change', '.select', function (e) {
			toggleFilledField(e.target);
		});

		$(document).on('click', function (e) {
			const fieldEl = e.target.closest('.field');
			const focusedField = document.querySelector('.field.focussed');

			if (fieldEl) {
				const selectEl = e.target.closest('.select');
				
				if (!selectEl) return;

				const isActiveSelect = selectEl.classList.contains('active')

				fieldEl.classList.toggle('focussed', isActiveSelect);

				setTimeout(() => {
					if (!selectEl.classList.contains('active')) {
						fieldEl.classList.remove('focussed');
					}
				}, 10);

				if (fieldEl === focusedField) return;
			}

			if (focusedField) {
				focusedField.classList.remove('focussed');
			}
		});
	}

	// Map
	{
		const defaultParams = {
			center: [55.755864, 37.617698],
			zoom: 5,
			controls: ['zoomControl'],
			placemark: {
				preset: 'islands#redIcon'
			}
		}

		const initMap = (mapNode) => {
			const id = mapNode.id;

			if (!id || id === "") {
				mapNode.hidden = true;
				return false;
			}

			const params = $(mapNode).data("data") || {};
			const controls = params.controls || defaultParams.controls;
			let map = new ymaps.Map(id, {
				center: defaultParams.center,
				zoom: defaultParams.zoom,
				controls
			});

			map.behaviors.disable(['scrollZoom'])
		}

		if (window.ymaps) {
			ymaps.ready(function () {
				$('.map').each((_, el) => initMap(el));
			})
		}
	}

	{
		const mediaFromMd = window.matchMedia(`(min-width: ${window.front.breakpoints.md + 1}px)`);
		const $itemWithMenu = $('.menu__list > .menu__item')
			.filter((_, item) => item.querySelector('.menu__submenu'));
		let isInit = false;

		const mouseBehaviorHandler = (e) => {
			toggleOverflowDocument(e.type === "mouseenter");
		};
		const toggleInit = function() {
			if (mediaFromMd.matches) {
				if (isInit) return false;

				$itemWithMenu.on('mouseenter', mouseBehaviorHandler);
				$itemWithMenu.on('mouseleave', mouseBehaviorHandler);

				isInit = true;
			} else {
				if (!isInit) return false;

				$itemWithMenu.off('mouseenter', mouseBehaviorHandler);
				$itemWithMenu.off('mouseleave', mouseBehaviorHandler);

				isInit = false;
			}
		}	

		toggleInit();
		window.addEventListener('resize', throttle(toggleInit, 150));
	}


	$('.js-card-service').each((_, item) => {
		const navEl = $('.card-service__nav', item).get(0);

		if (!navEl) return;

		const setHeightItem = () => {
			navEl.style.setProperty("--height", navEl.scrollHeight + 'px');
		};
		setHeightItem();

		$(item).on('mouseenter', function () {
			setHeightItem();
		});
	});

	$(document).on('click', '.menu__link', function (e) {
		if (
			e.target.closest('.menu__link-arr') ||
			!this.hasAttribute('href')
		) {
			e.preventDefault();
			
			$(this).closest('li')
			.toggleClass('open')
			.find('.menu__submenu').first()
			.slideToggle(200);
		}
	});
});