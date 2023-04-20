const Options = require('./options');
const { throttle, trigger, declension, getCoords } = require('./../utils/utils');

const EVENTS = {
    change: "select:change"
}

const CLASS_OPEN = 'active',
    CLASS_FILLED = 'filled',
    SELECT_MAX_VALUES = 3;

const getTemplateValuesFromDate = (data, isRange) => {
    let result = data.join(' - ');

    if (isRange && data.length === 1) {
        result = 'от ' + result;
    }

    return result
}
const getTemplateValueItem = ({ index, label = '', value }) => {
    const labelFormated = getFormatedText(label);

    return `
        <div class="select__values-item" ${index ? `style="order: ${index}"` : ''} data-value='${value ?? 'all'}'
             ${label ? `title="${label.replace(/<\/?[^>]+>/g, '')}"` : ''}>
            <div class="icon select__values-item-close">
                <svg viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.4313 21.7518C21.0182 19.3178 18.5584 16.8558 16.1734 14.4781L14.041 12.3437C13.9661 12.2688 13.8913 12.1846 13.8071 12.091C13.7791 12.0535 13.7417 12.0161 13.7043 11.9786C13.7417 11.9412 13.7791 11.9131 13.8165 11.885C13.91 11.8008 13.9942 11.7259 14.0784 11.6416C17.1648 8.55241 20.2513 5.4632 23.3471 2.36464C23.3752 2.33655 23.4126 2.30847 23.4406 2.27102C23.5435 2.16805 23.6464 2.06508 23.7399 1.95274C24.0486 1.53149 24.086 1.08215 23.8335 0.632806C23.5716 0.164745 23.0572 -0.0973701 22.6082 0.0336872C22.3089 0.117938 21.9909 0.305163 21.7384 0.557916C19.3067 2.97312 16.8375 5.44448 14.4619 7.8316L12.3387 9.9566C12.2639 10.0315 12.1797 10.1064 12.0862 10.1906C12.0488 10.2281 12.002 10.2655 11.9646 10.303C11.9366 10.2655 11.8992 10.2281 11.8711 10.1906C11.7963 10.0877 11.7214 10.0034 11.6373 9.91915C8.53211 6.81122 5.42694 3.71265 2.33113 0.614084C2.30307 0.586 2.27501 0.557916 2.24695 0.529833C2.15342 0.43622 2.05989 0.333247 1.95701 0.258357C1.53613 -0.0505639 1.08719 -0.0786476 0.638252 0.164745C0.161253 0.417498 -0.0912751 0.932366 0.0303127 1.38171C0.114489 1.68126 0.301547 2.00891 0.554076 2.2523C3.44412 5.16365 6.39029 8.10307 9.23357 10.9583L9.90698 11.6323C9.99116 11.7165 10.0753 11.782 10.1876 11.8663C10.2343 11.9037 10.2811 11.9412 10.3372 11.9786C10.2811 12.0254 10.225 12.0722 10.1782 12.119C10.0753 12.2127 9.98181 12.2875 9.90698 12.3624C6.81117 15.461 3.70601 18.5689 0.610193 21.6675C0.582134 21.6956 0.563428 21.7143 0.53537 21.7424C0.441841 21.836 0.338959 21.939 0.254782 22.042C0.00225395 22.3977 -0.0538635 22.8377 0.095783 23.2308C0.24543 23.624 0.582134 23.9048 0.993662 23.9797C1.55484 24.0827 1.94766 23.7738 2.2376 23.4929C4.93124 20.7875 7.68099 18.0353 10.3372 15.3768L11.6653 14.0475C11.7402 13.9726 11.8243 13.8977 11.9179 13.8134C11.9553 13.776 11.9927 13.7479 12.0301 13.7105C12.0675 13.7479 12.0956 13.7853 12.1236 13.8228C12.2078 13.9164 12.2826 14.01 12.3574 14.0849C15.4533 17.1928 18.5584 20.2914 21.6542 23.39C21.6823 23.4181 21.701 23.4461 21.7291 23.4649C21.8226 23.5585 21.9161 23.6614 22.0284 23.7457C22.2528 23.9142 22.5054 23.9985 22.7579 23.9985C22.973 23.9985 23.1881 23.9329 23.3939 23.8112C23.8615 23.5117 24.0673 23.0811 23.9551 22.613C23.8896 22.3322 23.6932 22.0139 23.4313 21.7518Z" />
                </svg>
            </div>
            <div class="select__values-item-value">${labelFormated}</div>
        </div>
    `;
};
const getFormatedText = (el) => {
    const regexp = /[\n\s]{2,}/g;

    if (typeof el === 'string') {
        return el.replace(regexp, ' ').trim();
    } else {
        return $(el).text().replace(regexp, ' ').trim();
    }

};

class Select {
    static isInitDocumentListeners = false;

    constructor(el, options = {}) {
        if (!el) {
            throw new Error(`elem was not passed to Select`);
        }

        this.$el = $(el);
        this.$content = this.$el.find('.select__content');
        this.$value = this.$el.find('.select__value');
        this.$values = this.$el.find('.select__values');
        this.$options = this.$el.find('.select__options');
        this.instanceOptions = new Options(this.$options.get(0));
        this._state = {
            isOpen: false,
            isFilled: null
        }

        this.init();
    }

    get state() {
        return $.extend({}, this._state);
    }

    get isOpen() {
        return this.$el.hasClass(CLASS_OPEN);
    }

    get isFilled() {
        const { state: stateOptions } = this.instanceOptions;
        let itemsOptionActive = stateOptions.options?.itemsActive || [];
        itemsOptionActive = itemsOptionActive.filter(item => !item.isHidden);
        let filledFields = stateOptions.fields.items.filter(item => item.value.trim() !== '');

        return !!(
            itemsOptionActive.length
            || stateOptions.datepicker?.date.length
            || filledFields.length
        )
    }

    init() {
        this.#registerEventsHandler();
        this.updateView();
        this.$el.data('instance', this);
    }

    #registerEventsHandler() {
        // click select
        this.$el.on('click', (e) => {
            let $target = $(e.target);


            if ($target.closest('.select__values-item').length) {
                e.stopPropagation();

                $target = $target.closest('.select__values-item');
                let value = $target.attr('data-value')
                value = value !== 'all' ? value : undefined;

                this.reset({value});
            } else if ($target.closest('.select__content').length) {
                this.toggle();
            }
        });

        // change options
        this.$options.on('options:change', (e, data) => {
			this._state.isFilled = this.isFilled;

            this.updateView(data);

            trigger(this.$el.get(0), {
				eventName: EVENTS.change
			});
        });

        // update size options
        this.$options.on('options:updateSize', (e) => {
            this.isOpen && this.instanceOptions.updateSize();
        });

        if (!Select.isInitDocumentListeners) {
            $(document).on('mousedown', (e) => {
                const selectActiveEl = document.querySelector('.select.active');

                if (selectActiveEl && !selectActiveEl.contains(e.target)) {
                    const instanceSelect = $(selectActiveEl).data('instance');
                    instanceSelect.close();
                }
            });

            $(document).on('scroll', throttle(() => {
                const $selectActive = $('.select.active');

                if ($selectActive.length) {
                    const instance = $selectActive.data('instance');

                    instance.updatePosition();
                }
            }, 150))

            Select.isInitDocumentListeners = true;
        }
    }

    updateView(options = {}) {
        const { state: stateOptions } = this.instanceOptions;
        const { type: typeOptions } = stateOptions;
        let valueSelect = '';

        if (typeOptions === 'radio' || typeOptions === 'multiple') {
            const { itemsActive } = stateOptions.options;

            if (this.$value.length) {
                const itemActive = itemsActive[0];
                const text = itemActive?.text || '';
                this.$value.text(text);

                this.$value[itemActive?.isHidden ? 'addClass' : 'removeClass']('select__value--hidden');


                !options.isChangedContent && this.close()
            } else if (this.$values.length) {
                if (itemsActive.length < SELECT_MAX_VALUES) {
                    itemsActive.forEach(({ index, text, value }) => {
                        valueSelect += getTemplateValueItem({
                            index, label: text, value
                        })
                    });
                } else {
                    const textLabel = itemsActive.length + ' ' + declension(itemsActive.length, ['вариант', 'варианта', 'вариантов']);

                    valueSelect = getTemplateValueItem({
                        index: 0,
                        label: textLabel
                    });
                }

                this.$values.html(valueSelect);
            }
        } else if (typeOptions === 'datepicker') {
            const { date, isRange, $inputData } = stateOptions.datepicker;

            if (date.length) {
                const labelDate = getTemplateValuesFromDate(date, isRange);

                valueSelect = getTemplateValueItem({
                    label: labelDate, value: $inputData.val()
                });
            };

            this.$values.html(valueSelect);
        } else if (typeOptions === 'fields') {
            const { items } = stateOptions.fields;

            let isMoreValues = false;
            let displayedValue = '';
            let displayedKey = [];
            let displayedVal = [];

            items.forEach(({ el, value }) => {
                if (value !== '') {
                    displayedKey.push(el.getAttribute('placeholder') || '');
                    displayedVal.push(value);
                }
            });

            isMoreValues = displayedKey.length > 1;

            displayedKey.forEach(function (item, i) {
                displayedValue += ` ${!isMoreValues ? `${item} ` : (i !== 0 ? '- ' : '')}${displayedVal[i]}`;
            });

            if (displayedValue !== '') {
                const html = getTemplateValueItem({
                    label: displayedValue.trim()
                });
                this.$values.html(html)
            } else {
                this.$values.html('');
            }
        }

        this.toggleFilled();
        options.isChangedContent && this.updatePosition();
    }

    updatePosition() {
        const selectHeightCheck = +window.innerHeight < +getCoords(this.$content.get(0)).innerTop + +this.$content.get(0).offsetHeight + +this.$options.get(0).offsetHeight;

        if (selectHeightCheck) {
            if (!this.$el.hasClass('top'))
                this.$el.addClass('top')
        } else {
            if (this.$el.hasClass('top'))
                this.$el.removeClass('top')
        }
    }

    /**
     * @param {object=} params.value - input[value="${value}"]
     * @param {object=} params.method
    */
    reset(options = {}) {
        if (typeof options.value === 'string') {
            const $itemVlues = this.$el.find(`[data-value="${options.value}"]`)

            $itemVlues.remove();
            this.instanceOptions.reset({
                value: options.value
            });
        } else {
            this.$value.html('');
            this.$values.html('');
            this.instanceOptions.reset(options);
        }

        this.toggleFilled();
    }

    toggleFilled() {
		this.$el.get(0).classList.toggle(CLASS_FILLED, this.isFilled);
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$el.addClass(CLASS_OPEN);

        this.instanceOptions.open();
    }

    close() {
        this.$el.removeClass(CLASS_OPEN);

        this.instanceOptions.close();
    }
}

$.fn.select = function (options) {
    const instances = [];

    this.each(function () {
        instances.push(new Select(this, options));
    });

    return instances.length === 1 ? instances[0] : instances.length ? instances : null;
};

exports = Select;


