(function () {
	const init = function(input) {
		const $input = $(input);
		const min = $(input).attr('min');
		const max = $(input).attr('max');

		if (min && input.value <= min) {
			$input.closest('.counter')
				.find('[data-counter-btn="minus"]').addClass('disabled');
			$input.val(min);
		}

		if (max && input.value >= max) {
			$input.closest('.counter')
				.find('[data-counter-btn="plus"]').addClass('disabled');
			$input.val(max);
		}
	}
	$('[data-counter-input]').each((_, item) => init(item));

	$(document).on('click', '[data-counter-btn]', function () {
		const $this = $(this);
		const $input = $this.closest('.counter').find('.counter__input');
		const $btnMinus = $this.closest('.counter').find('[data-counter-btn="minus"]');
		const $btnPlus = $this.closest('.counter').find('[data-counter-btn="plus"]');
		let value = +$input.val();
		const step = +$input.attr('data-step') || 1;
		const min = $input.attr('min') || 1;
		const max = $input.attr('max') || 9999;

		value = value + step * ($this.data('counter-btn') === "plus" ? 1 : -1);

		if (min !== 'undefined' && value <= min) {
			$this.addClass('disabled');

			value = min;
		} else if ($btnMinus.hasClass('disabled')) {
			$btnMinus.removeClass('disabled');
		}

		if (max !== 'undefined' && value >= max) {
			$this.addClass('disabled');

			value = max;
		} else if ($btnPlus.hasClass('disabled')) {
			$btnPlus.removeClass('disabled');
		}

		$input.val(value);
	});

	$(document).on('change', '[data-counter-input]', function () {
		init(this);
	});
}());