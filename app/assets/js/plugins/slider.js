//slider
const slider = function (selector, option = {}) {
	const $slider = (typeof selector === 'string') ? document.querySelector(selector) : selector;
	const $sliderWrap = $slider.closest('.slider');
	const $sliderInit = $slider.querySelector('.slider__slider');
	console.log($slider)
	const setings = {
		navigation: $sliderWrap.querySelector('.slider__nav-btn--prev') ?? $sliderWrap.querySelector('.slider__nav-btn--next'),
		pagination: $sliderWrap.querySelector('.slider__pagination'),
		scrollbar: $sliderWrap.querySelector('.slider__scrollbar'),
		options: {
			watchOverflow: true,
			...option,
		}
	}

	Object.assign(setings.options, {
		watchSlidesVisibility: true,
		watchOverflow: true,
		autoplay: (+$slider.dataset.sliderAutoplay > 0) ? {
			delay: +$slider.dataset.sliderAutoplay,
			pauseOnMouseEnter: true,
			disableOnInteraction: false,
		} : '',
		navigation: setings.navigation ? {
			nextEl: $sliderWrap.querySelector('.slider__nav-btn--next'),
			prevEl: $sliderWrap.querySelector('.slider__nav-btn--prev'),
		} : '',
		scrollbar: setings.scrollbar ? {
			el: setings.scrollbar,
			draggable: true,
		} : '',
		pagination: setings.pagination ? {
			el: $sliderWrap.querySelector('.slider__pagination'),
			clickable: true,
		} : '',
	});

	return new Swiper($sliderInit, setings.options);
};

module.exports = slider;