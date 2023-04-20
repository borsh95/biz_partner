const slider = require('./../plugins/slider');

for (const sliderEl of document.querySelectorAll('.slider')) {
	let options = {};

	if (sliderEl.closest('.slider--has_clients')) {
		options = {
			grabCursor: true,
			freeMode: {
				enabled: true,
				sticky: true
			},
			breakpoints: {
				320: {
					enabled: true,
					slidesPerView: 'auto',
				},
				[window.front.breakpoints.sm + 1]: {
					enabled: false
				}
			}
		}
	} else if (sliderEl.closest('.slider--has_services')) {
		options = {
			watchOverflow: true,
			breakpoints: {
				320: {
					enabled: true,
					slidesPerView: 'auto',
					spaceBetween: 15,
					watchSlidesVisibility: true,
				},
				[1500]: {
					enabled: false,
					spaceBetween: 0,
				}
			}
		}
	} else if (sliderEl.closest('.slider--has_records')) {
		options = {
			watchOverflow: true,
			breakpoints: {
				320: {
					enabled: true,
					slidesPerView: 'auto',
					spaceBetween: 15,
					watchSlidesVisibility: true,
				},
				[window.front.breakpoints.sm]: {
					spaceBetween: 20,
				},
				[window.front.breakpoints.md]: {
					enabled: false,
					spaceBetween: 0,
				}
			}
		}
	}

	slider(sliderEl, options);
}