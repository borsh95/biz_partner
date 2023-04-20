const { trigger, uuidv4 } = require('./../utils/utils');

const Options = (() => {
    const EVENTS = {
        change: "options:change",
        updateSize: "options:updateSize",
    };
    const SELECT_DATEPICKERS = [];
    const DATE_FORMAT = 'DD.MM.YYYY';

    const getValidDate = (date) => moment(date, DATE_FORMAT).format();
    const getFormatedDate = (date) => {
        return moment(getValidDate(date)).format(DATE_FORMAT)
    };
    const getTextFromElem = (el) => {
        const text = typeof el !== 'string' ? $(el).text().trim() : el.trim();

        return text.replace(/[\n\s]{2,}/g, ' ').trim()
    }

    return class Options {
        static getTextOption = getTextFromElem;

        #defaults = {}
        #config = {}

        constructor(elem, options = {}) {
            if (!elem) {
                throw new Error(`the "elem" argument was not passed to Options`);
            }

            this.$el = $(elem);
            this.$content = this.$el.find('.options__content');
            this._state = {
                type: this.$el.get(0).getAttribute('data-type'), // multiple, radio, datepicker, time, fields
				options: {
                    items: [],
                    itemsActive: []
				},
                datepicker: {
                    id: null,
                    date: [],
                    isRange: null
                },
                fields: {
                    items: []
                }
            }

            this.init();
        }

        get state() {
            return $.extend({}, this._state);
        }

        #initDependencies() {
            const { type } = this._state;

            if (type === 'datepicker') {
                const {
                    'datepicker-id': id,
                    'datepicker-select': select,
                    range: rangeValue,
                    'datepicker-from': from,
                    'datepicker-to': to,
                } = this.$datepicker.get(0).dataset;

                const isRange = rangeValue === 'true' || rangeValue === '1';
                const key = id ? id : uuidv4();
                const view = ['days', 'months'].includes(select) ? select : 'days';

                this.$datepicker.attr('data-datepicker-id', key);
                this.$inputData.attr('data-type-value', 'date');
                this._state.datepicker = {
                    ...this._state.datepicker,
                    $inputData: this.$inputData,
                    id: key,
                    isRange
                };

                SELECT_DATEPICKERS[key] = new AirDatepicker(this.$datepicker.get(0), {
                    range: isRange,
                    view: view,
                    minView: view,
                    dsekonSelect: select,
                    toggleSelected: true,
                    onSelect: ({ date }) => {
                        let dateTime;

                        if (!date || date?.length === 0) {
                            this.reset();

                            return;
                        }

                        if (Array.isArray(date)) {
                            dateTime = date.map(date => getFormatedDate(date))
                                .join(',');
                        } else {
                            dateTime = date ? getFormatedDate(date) : '';
                        }

                        this.$inputData.val(dateTime);
                        dateTime && this.$inputData.prop('checked', true);

                        if (from) {
                            SELECT_DATEPICKERS[from].update({
                                minDate: date
                            });
                        }

                        if (to) {
                            SELECT_DATEPICKERS[to].update({
                                maxDate: date
                            });
                        }

                        trigger(this.$inputData.get(0), {
							eventName: 'change'
						});
                    },
                    onChangeViewDate: () => {
                        setTimeout(() => {
							trigger(this.$el.get(0), {
								eventName: EVENTS.updateSize
							})
						})
                    },
                    onChangeView: () => {
                        setTimeout(() => {
							trigger(this.$el.get(0), {
								eventName: EVENTS.updateSize
							})
						})
                    },
                    prevHtml: '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0.122782 3.12484C0.288173 2.95836 0.556932 2.95836 0.722323 3.12484L5.99416 8.44179L11.2763 3.12484C11.4417 2.95836 11.7105 2.95836 11.8759 3.12484C12.0413 3.29132 12.0413 3.56185 11.8759 3.72833L6.30427 9.33662C6.22157 9.41986 6.11821 9.46148 6.0045 9.46148C5.90113 9.46148 5.78742 9.41986 5.70473 9.33662L0.133119 3.72833C-0.0426093 3.56185 -0.0426092 3.29132 0.122782 3.12484Z"></path></svg>',
                    nextHtml: '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0.122782 3.12484C0.288173 2.95836 0.556932 2.95836 0.722323 3.12484L5.99416 8.44179L11.2763 3.12484C11.4417 2.95836 11.7105 2.95836 11.8759 3.12484C12.0413 3.29132 12.0413 3.56185 11.8759 3.72833L6.30427 9.33662C6.22157 9.41986 6.11821 9.46148 6.0045 9.46148C5.90113 9.46148 5.78742 9.41986 5.70473 9.33662L0.133119 3.72833C-0.0426093 3.56185 -0.0426092 3.29132 0.122782 3.12484Z"></path></svg>'
                });

                if (this.$inputData.prop('checked')) {
                    const valueInputData = this.$inputData.val().trim();
                    const valueForInit = valueInputData
                    .split(/\s*,\s*/g)
                    .map(date => getValidDate(date));

                    SELECT_DATEPICKERS[key].selectDate(valueForInit, {
                        silent: true
                    });

                    trigger(this.$inputData.get(0), {
						eventName: 'change'
					});
                }
            }
        }

        #registerEventsHandler() {
            const handlerChange = (e) => {
                const $target = $(e.target);

                this.updateState();
                this.updateView();

                // Фильтрация списка item options
                if ($target.is(this.$inputSearch)) {
                    this.filterBySearch();
                }

                if (this._state.type === 'fields' || $target.is(this.$inputSearch)) {
                    if (e.type === 'keyup') return;
                }

                // triger event
                trigger(this.$el.get(0), {
					eventName: EVENTS.change
				});
            }

            this.$el.on('change keyup', handlerChange);
            this.$el.on('front_init', (e) => {
                this.updateState({
                    isChangedContent: true
                });
                this.updateView();
                this.filterBySearch();

                // triger event
                trigger(this.$el.get(0), {
					eventName: EVENTS.updateSize
				});
                trigger(this.$el.get(0), {
					eventName: EVENTS.change, 
					data: {
						isChangedContent: true
					}
				});
            })
        }

        init() {
            let metadata = this.$el.attr('data-options') || "{}";
            metadata = JSON.parse(metadata);
            this.#config = $.extend({}, this.#defaults, this.options, metadata);

            if (this._state.type === 'radio' || this._state.type === 'multiple') {
                this.$optionItems = this.$el.find('.options__item');
                this.$inputSearch = this.$el.find('.options__input-search');
            } else if (this._state.type === 'datepicker') {
                this.$datepicker = this.$el.find('.datepicker');
                this.$inputData = this.$el.find('.options__input-invisible');
            }

            this.#registerEventsHandler();
            this.#initDependencies();
            this.updateState();
        }

        updateState(options = {}) {
            const { type } = this._state;

            if (type === 'datepicker') {
                const valueInput = this.$inputData.val()?.trim();

                if (!this.$inputData.get(0).hasAttribute('value') || valueInput === '') {
                    this._state.datepicker.date = [];
                } else {
                    const values = valueInput.split(/\s*,\s*/g)
                        .map(getFormatedDate);

                    this._state.datepicker.date = values;
                };
            } else if (type === 'fields') {
                const $fields = this.$el.find('input');
                this._state.fields.items.length = 0;

                $fields.each((_, input) => {
                    const itemObj = {
                        el: input,
                        value: input.value.trim()
                    }

                    this._state.fields.items.push(itemObj);
                });
            } else if (type === 'radio' || type == 'multiple') {
                if (options.isChangedContent) {
                    this.$optionItems = this.$el.find('.options__item');
                }

                // radio, multiple
                this._state.options.items.length = 0;
                this._state.options.itemsActive.length = 0;

                this.$optionItems.each((_, item) => {
                    const inputEl = item.querySelector('input[name]');

                    if (!inputEl) return true;

                    const isActive = inputEl.closest('[name]:checked') ? true : false;
                    const isHidden = inputEl.closest('[hidden]') ? true : false;

                    const stateItem = {
                        el: item,
                        isActive,
                        isHidden,
                        text: Options.getTextOption(item),
                        value: inputEl.value,
                        index: $(item).index()
                    }

                    this._state.options.items.push(stateItem);
                    isActive && this._state.options.itemsActive.push(stateItem);
                })
            }
        }

        updateView(options = {}) {
            const { type } = this._state;

            if (type === 'radio' || type === 'multiple') {
                this._state.options.items.forEach(({ el, isActive }) => {
                    el.classList[isActive ? 'add' : 'remove']('active');
                });
            }
        }

        updateSize() {
            this.$el.css('height', this.$content.css('height'));
        }

        filterBySearch() {
            if (!this?.$inputSearch.length) return;

            const valueSearch = this.$inputSearch.val().trim().toLocaleLowerCase();

            this._state.options.items.forEach(({ el, text }) => {
                const isMatch = text.toLowerCase().includes(valueSearch);
                el.classList[isMatch ? 'remove' : 'add']('disabled');
            });
        }

        open() {
            this.updateSize();
            this.$inputSearch?.length && this.$inputSearch.focus();
        }

        close() {
            this.$el.css('height', '');
        }

        /**
         * @param {object=} params.value - input[value="${value}"]
         * @param {object=} params.method
        */
        reset({ value, method } = {}) {
            let $triggered;

            if (this._state.type === 'datepicker') {
                this.$inputData.prop('checked', false);
                this.$inputData.val('');
                SELECT_DATEPICKERS[this._state.datepicker.id].clear({silent: true});
                $triggered = this.$inputData;
            } else {
                const selectorInput = `input${value ? `[value="${value}"]` : ''}`;
                const $inputs = this.$el.find(selectorInput);

                $inputs.prop('checked', false);
                this._state.type === 'fields' && $inputs.val('');
                $triggered = $inputs.eq(0);
            }

            if (method === 'filter' && this._state.type === 'radio') {
                if (this._state.options?.items[0]) {
                    const $firstItem = $('input', this._state.options?.items[0].el);
                    $firstItem.prop('checked', true);
                    $triggered = $firstItem;
                }
            }

			trigger($triggered.get(0), {
				eventName: 'change'
			});
        }
    }
})();

module.exports = Options;
