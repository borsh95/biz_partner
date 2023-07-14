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
			slidesPerView: 'auto',
			watchSlidesVisibility: true,
			breakpoints: {
				320: {
					enabled: true,
					spaceBetween: 15
				},
				[window.front.breakpoints.sm]: {
					spaceBetween: 20,
				},
				[window.front.breakpoints.md]: {
					enabled: true,
					spaceBetween: 0,
				}
			}
		}
	} else if (sliderEl.closest('.slider--has_team')) {
		options = {
			watchOverflow: true,
			slidesPerView: 'auto',
			watchSlidesVisibility: true,
			breakpoints: {
				320: {
					enabled: true,
					spaceBetween: 15
				},
				[window.front.breakpoints.sm]: {
					enabled: true,
					spaceBetween: 20,
				},
				[window.front.breakpoints.md]: {
					enabled: false,
					spaceBetween: 0,
				}
			}
		}
	} else if (sliderEl.closest('.slider--has_results')) {
		options = {
			watchOverflow: true,
			slidesPerView: 'auto',
			watchSlidesVisibility: true,
			breakpoints: {
				320: {
					enabled: true,
					spaceBetween: 15
				},
				[window.front.breakpoints.sm]: {
					enabled: true,
					spaceBetween: 20,
				},
				[window.front.breakpoints.md]: {
					enabled: false,
					spaceBetween: 0,
				}
			}
		}
	} else if (sliderEl.closest('.slider--has_item-list')) {
		options = {
			watchOverflow: true,
			slidesPerView: 'auto',
			watchSlidesVisibility: true,
			breakpoints: {
				320: {
					enabled: true,
					slidesPerView: 1,
					spaceBetween: 60	
				},
				[window.front.breakpoints.sm]: {
					enabled: true,
					spaceBetween: 60,			
					slidesPerView: 2,
				},
				[window.front.breakpoints.md]: {
					enabled: false,
					spaceBetween: 0,
				}
			}
		}
	} else if (sliderEl.closest('.slider--has_full-card')) {
		options = {
			watchOverflow: true,
			slidesPerView: 'auto',
			watchSlidesVisibility: true,
			breakpoints: {
				320: {
					autoHeight: true,
					enabled: true,
					slidesPerView: 1,
					spaceBetween: 60,	
				},
				[window.front.breakpoints.sm]: {
					enabled: false
				}
			}
		}
	}

	slider(sliderEl, options);
}