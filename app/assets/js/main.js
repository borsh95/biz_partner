(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

window.front = {
  breakpoints: {
    xxl: 1920,
    xl: 1450,
    lg: 1230,
    md: 1024,
    sm: 768,
    xs: 480
  }
};
},{}],2:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var _require = require('./../utils/utils'),
  toggleOverflowDocument = _require.toggleOverflowDocument;
/*
	burger js	
*/

document.addEventListener('DOMContentLoaded', function () {
  var burgerEl = document.querySelector('.header__burger');
  var burgerContentEl = burgerEl.querySelector('.header__burger-content');
  var toggleBurgerClass = 'js-toggle-burger';
  var $togglerBurger = document.querySelector(".".concat(toggleBurgerClass));
  var mediaQuery = window.matchMedia("(min-width: ".concat(window.front.breakpoints.md + 1, "px)"));
  var isOpen = false;
  mediaQuery.addListener(function () {
    if (mediaQuery.matches && burgerEl.classList.contains('open')) {
      toggleBurger($togglerBurger);
    }
  });
  document.addEventListener('click', function (e) {
    var togglerEl = e.target.closest(".".concat(toggleBurgerClass));
    if (togglerEl) {
      toggleBurger(togglerEl);
    } else if (isOpen && !burgerContentEl.contains(e.target)) {
      toggleBurger($togglerBurger);
    }
  });
  document.addEventListener('action:closeBurger', function () {
    if (isOpen) {
      toggleBurger($togglerBurger);
    }
  });
  function toggleBurger(togglerEl) {
    if (!togglerEl) return;
    togglerEl.classList.toggle('active');
    var isActive = togglerEl.classList.contains('active');
    isOpen = isActive;
    var _iterator = _createForOfIteratorHelper(document.querySelectorAll(".".concat(toggleBurgerClass))),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var toggler = _step.value;
        toggler.classList[isActive ? 'add' : 'remove']('active');
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    burgerEl.classList[isActive ? 'add' : 'remove']('open');
    document.documentElement.classList[isActive ? 'add' : 'remove']('is-burger-open');
    toggleOverflowDocument(isActive);
    if (isActive) {
      document.documentElement.dispatchEvent(new CustomEvent("action:closeSearch", {
        bubbles: true,
        cancelable: true
      }));
    }
  }
});
},{"./../utils/utils":11}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var _require = require('./../utils/utils.js'),
  throttle = _require.throttle;
var watchedComponents = {
  'table': {
    params: ['bg']
  }
};
var compareStates = function compareStates() {
  Object.entries(watchedComponents).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      className = _ref2[0],
      _ref2$ = _ref2[1],
      params = _ref2$.params,
      stash = _ref2$.stash;
    watchedComponents[className].stash = stash || new Map();
    stash = watchedComponents[className].stash;
    var _iterator = _createForOfIteratorHelper(document.querySelectorAll(".".concat(className))),
      _step;
    try {
      var _loop = function _loop() {
        var elem = _step.value;
        var stashElem = stash.get(elem) || {};
        stashElem.state = stashElem.state || {};
        stashElem.stateDom = stashElem.stateDom || {};
        params.forEach(function (param) {
          var valueParam = getComputedStyle(elem).getPropertyValue("--".concat(param));
          if (valueParam && typeof valueParam === 'string') {
            valueParam = valueParam.trim();
          }
          stashElem.state[param] = valueParam ? valueParam : null;
        });
        Object.keys(stashElem.state).forEach(function (param) {
          var valueParam = stashElem.state[param];
          elem.classList.remove("".concat(className, "--").concat(param, "_").concat(stashElem.stateDom[param]));
          elem.classList.toggle("".concat(className, "--").concat(param, "_").concat(valueParam), valueParam);
        });
        stashElem.stateDom = _objectSpread({}, stashElem.state);
        stash.set(elem, stashElem);
      };
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  });
};
if (Object.keys(watchedComponents).length) {
  compareStates(watchedComponents);
  window.addEventListener('resize', throttle(compareStates.bind(void 0, watchedComponents), 150));
}
},{"./../utils/utils.js":11}],4:[function(require,module,exports){
"use strict";

(function () {
  var init = function init(input) {
    var $input = $(input);
    var min = $(input).attr('min');
    var max = $(input).attr('max');
    if (min && input.value <= min) {
      $input.closest('.counter').find('[data-counter-btn="minus"]').addClass('disabled');
      $input.val(min);
    }
    if (max && input.value >= max) {
      $input.closest('.counter').find('[data-counter-btn="plus"]').addClass('disabled');
      $input.val(max);
    }
  };
  $('[data-counter-input]').each(function (_, item) {
    return init(item);
  });
  $(document).on('click', '[data-counter-btn]', function () {
    var $this = $(this);
    var $input = $this.closest('.counter').find('.counter__input');
    var $btnMinus = $this.closest('.counter').find('[data-counter-btn="minus"]');
    var $btnPlus = $this.closest('.counter').find('[data-counter-btn="plus"]');
    var value = +$input.val();
    var step = +$input.attr('data-step') || 1;
    var min = $input.attr('min') || 1;
    var max = $input.attr('max') || 9999;
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
})();
},{}],5:[function(require,module,exports){
"use strict";
},{}],6:[function(require,module,exports){
"use strict";

require('./front');
require('./componentStates');
require('./sliders');
require('./counter');
require('./tabs');
require('./burger');
},{"./burger":2,"./componentStates":3,"./counter":4,"./front":5,"./sliders":7,"./tabs":8}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var slider = require('./../plugins/slider');
var _iterator = _createForOfIteratorHelper(document.querySelectorAll('.slider')),
  _step;
try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var sliderEl = _step.value;
    var options = {};
    if (sliderEl.closest('.slider--has_clients')) {
      options = {
        grabCursor: true,
        freeMode: {
          enabled: true,
          sticky: true
        },
        breakpoints: _defineProperty({
          320: {
            enabled: true,
            slidesPerView: 'auto'
          }
        }, window.front.breakpoints.sm + 1, {
          enabled: false
        })
      };
    } else if (sliderEl.closest('.slider--has_services')) {
      options = {
        watchOverflow: true,
        breakpoints: _defineProperty({
          320: {
            enabled: true,
            slidesPerView: 'auto',
            spaceBetween: 15,
            watchSlidesVisibility: true
          }
        }, 1500, {
          enabled: false,
          spaceBetween: 0
        })
      };
    } else if (sliderEl.closest('.slider--has_records')) {
      var _breakpoints3;
      options = {
        watchOverflow: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        breakpoints: (_breakpoints3 = {
          320: {
            enabled: true,
            spaceBetween: 15
          }
        }, _defineProperty(_breakpoints3, window.front.breakpoints.sm, {
          spaceBetween: 20
        }), _defineProperty(_breakpoints3, window.front.breakpoints.md, {
          enabled: true,
          spaceBetween: 0
        }), _breakpoints3)
      };
    } else if (sliderEl.closest('.slider--has_team')) {
      var _breakpoints4;
      options = {
        watchOverflow: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        breakpoints: (_breakpoints4 = {
          320: {
            enabled: true,
            spaceBetween: 15
          }
        }, _defineProperty(_breakpoints4, window.front.breakpoints.sm, {
          enabled: true,
          spaceBetween: 20
        }), _defineProperty(_breakpoints4, window.front.breakpoints.md, {
          enabled: false,
          spaceBetween: 0
        }), _breakpoints4)
      };
    } else if (sliderEl.closest('.slider--has_results')) {
      var _breakpoints5;
      options = {
        watchOverflow: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        breakpoints: (_breakpoints5 = {
          320: {
            enabled: true,
            spaceBetween: 15
          }
        }, _defineProperty(_breakpoints5, window.front.breakpoints.sm, {
          enabled: true,
          spaceBetween: 20
        }), _defineProperty(_breakpoints5, window.front.breakpoints.md, {
          enabled: false,
          spaceBetween: 0
        }), _breakpoints5)
      };
    } else if (sliderEl.closest('.slider--has_item-list')) {
      var _breakpoints6;
      options = {
        watchOverflow: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        breakpoints: (_breakpoints6 = {
          320: {
            enabled: true,
            slidesPerView: 1
          }
        }, _defineProperty(_breakpoints6, window.front.breakpoints.sm, {
          enabled: true,
          spaceBetween: 60,
          slidesPerView: 2
        }), _defineProperty(_breakpoints6, window.front.breakpoints.md, {
          enabled: false,
          spaceBetween: 0
        }), _breakpoints6)
      };
    } else if (sliderEl.closest('.slider--has_full-card')) {
      options = {
        watchOverflow: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        breakpoints: _defineProperty({
          320: {
            enabled: true,
            slidesPerView: 1,
            spaceBetween: 60
          }
        }, window.front.breakpoints.sm, {
          enabled: false
        })
      };
    }
    slider(sliderEl, options);
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}
},{"./../plugins/slider":10}],8:[function(require,module,exports){
"use strict";

function findIndex($obj, $item) {
  var index = null;
  $obj.each(function (i, item) {
    if (item === $item[0]) {
      index = i;
    }
  });
  return index;
}
function initTabsItem($tabs, $tabsItemActive) {
  var dataTabs = $tabs.attr('data-tabs');
  if (dataTabs) {
    var $itemsTabs = $tabs.find('[data-tab]');
    $itemsTabs.each(function (i) {
      var $sectionsTabs = $("[data-tabs=\"".concat(dataTabs, ", ").concat(i, "\"]"));
      var index = findIndex($itemsTabs, $tabsItemActive);
      var $unloadedSrc = $sectionsTabs.find('[data-src]');
      if (index !== i) {
        $sectionsTabs.attr('hidden', true);
      } else {
        $("[data-tabs=\"".concat(dataTabs, ", ").concat(index, "\"]")).removeAttr('hidden');
        if ($unloadedSrc.length) {
          $unloadedSrc.each(function (i, item) {
            var src = $(item).data('src');
            $(item).attr('src', src).removeAttr('data-src');
          });
        }
      }
    });
  }
  $tabs.trigger('tabs:change');
}
$('[data-tabs]').each(function () {
  var $tabs = $(this);
  var $tabsItemActive = $tabs.find('[data-tab].active');
  if ($tabsItemActive.length !== 1) {
    var $tabsItems = $tabs.find('[data-tab]');
    $tabsItems.removeClass('active');
    $tabsItems.eq(0).addClass('active');
    $tabsItemActive = $tabsItems.eq(0);
  }
  initTabsItem($tabs, $tabsItemActive);
  $tabs.trigger("tabs:init");
});
$(document).on('click', '[data-tab]', function () {
  var $tabsItem = $(this);
  var $tabs = $tabsItem.closest('[data-tabs]');
  var $tabsItems = $tabs.find('[data-tab]');
  $tabsItems.not($tabsItem).removeClass('active');
  $tabsItem.addClass('active');
  initTabsItem($tabs, $tabsItem);
});
},{}],9:[function(require,module,exports){
"use strict";

require('./base');
require('./chunks');
var _require = require('./utils/utils'),
  throttle = _require.throttle,
  toggleOverflowDocument = _require.toggleOverflowDocument;
window.addEventListener('DOMContentLoaded', function () {
  {
    var headerEl = document.querySelector('header');
    var rootEl = document.documentElement;
    var setVariableHeightHeader = function setVariableHeightHeader(el) {
      rootEl.style.setProperty("--header-height", el.getBoundingClientRect().height + "px");
    };
    if (headerEl) {
      var showHeader = function showHeader(el) {
        var $el = typeof el === 'string' ? document.querySelector(el) : el;
        var scrolling = window.pageYOffset;
        var fixingIndent = 30;
        var isFix = false;
        var isShow = false;
        scrollHandler();
        window.addEventListener('scroll', throttle(scrollHandler, 100));
        window.addEventListener('resize', function () {
          fixingIndent = $el.offsetHeight + 20;
        });
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
      };
      setTimeout(function () {
        setVariableHeightHeader(headerEl);
      }, 0);
      ['resize', 'load', 'scroll'].forEach(function (listener) {
        window.addEventListener(listener, throttle(function () {
          setVariableHeightHeader(headerEl);
        }, 100));
      });
      showHeader(headerEl);
    }
  }

  // Select
  {
    var $selects = $('.select');
    var toggleFilledField = function toggleFilledField(selectEl) {
      var _instanceSelect$insta;
      var instanceSelect = $(selectEl).data().instance;
      var isFilled = !!(instanceSelect.isFilled || instanceSelect !== null && instanceSelect !== void 0 && (_instanceSelect$insta = instanceSelect.instanceOptions) !== null && _instanceSelect$insta !== void 0 && (_instanceSelect$insta = _instanceSelect$insta.state) !== null && _instanceSelect$insta !== void 0 && (_instanceSelect$insta = _instanceSelect$insta.options) !== null && _instanceSelect$insta !== void 0 && (_instanceSelect$insta = _instanceSelect$insta.itemsActive) !== null && _instanceSelect$insta !== void 0 && _instanceSelect$insta.length);
      $(selectEl).closest('.field').toggleClass('filled', isFilled);
    };
    $selects.select();
    $selects.each(function (_, item) {
      return toggleFilledField(item);
    });
    $(document).on('ajax:update', function (e) {
      $(e.target).hasClass('select') && $(e.target).select();
      $(e.target).find('.select').select();
    });
    $(document).on('select:change', '.select', function (e) {
      toggleFilledField(e.target);
    });
    $(document).on('click', function (e) {
      var fieldEl = e.target.closest('.field');
      var focusedField = document.querySelector('.field.focussed');
      if (fieldEl) {
        var selectEl = e.target.closest('.select');
        var isActiveSelect = selectEl.classList.contains('active');
        fieldEl.classList.toggle('focussed', isActiveSelect);
        setTimeout(function () {
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
    var defaultParams = {
      center: [55.755864, 37.617698],
      zoom: 5,
      controls: ['zoomControl'],
      placemark: {
        preset: 'islands#redIcon'
      }
    };
    var initMap = function initMap(mapNode) {
      var id = mapNode.id;
      if (!id || id === "") {
        mapNode.hidden = true;
        return false;
      }
      var params = $(mapNode).data("data") || {};
      var controls = params.controls || defaultParams.controls;
      var map = new ymaps.Map(id, {
        center: defaultParams.center,
        zoom: defaultParams.zoom,
        controls: controls
      });
      map.behaviors.disable(['scrollZoom']);
    };
    if (window.ymaps) {
      ymaps.ready(function () {
        $('.map').each(function (_, el) {
          return initMap(el);
        });
      });
    }
  }
  {
    var mediaFromMd = window.matchMedia("(min-width: ".concat(window.front.breakpoints.md + 1, "px)"));
    var $itemWithMenu = $('.menu__list > .menu__item').filter(function (_, item) {
      return item.querySelector('.menu__submenu');
    });
    var isInit = false;
    var mouseBehaviorHandler = function mouseBehaviorHandler(e) {
      toggleOverflowDocument(e.type === "mouseenter");
    };
    var toggleInit = function toggleInit() {
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
    };
    toggleInit();
    window.addEventListener('resize', throttle(toggleInit, 150));
  }
  $('.js-card-service').each(function (_, item) {
    var navEl = $('.card-service__nav', item).get(0);
    if (!navEl) return;
    var setHeightItem = function setHeightItem() {
      navEl.style.setProperty("--height", navEl.scrollHeight + 'px');
    };
    setHeightItem();
    $(item).on('mouseenter', function () {
      setHeightItem();
    });
  });
  $(document).on('click', '.menu__link-arr', function (e) {
    $(this).closest('li').toggleClass('open').find('.menu__submenu').first().slideToggle(200);
  });
});
},{"./base":1,"./chunks":6,"./utils/utils":11}],10:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
//slider
var slider = function slider(selector) {
  var _$sliderWrap$querySel;
  var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var $slider = typeof selector === 'string' ? document.querySelector(selector) : selector;
  var $sliderWrap = $slider.closest('.slider');
  var $sliderInit = $slider.querySelector('.slider__slider');
  var setings = {
    navigation: (_$sliderWrap$querySel = $sliderWrap.querySelector('.slider__nav-btn--prev')) !== null && _$sliderWrap$querySel !== void 0 ? _$sliderWrap$querySel : $sliderWrap.querySelector('.slider__nav-btn--next'),
    pagination: $sliderWrap.querySelector('.slider__pagination'),
    scrollbar: $sliderWrap.querySelector('.slider__scrollbar'),
    options: _objectSpread({
      watchOverflow: true
    }, option)
  };
  Object.assign(setings.options, {
    watchSlidesVisibility: true,
    watchOverflow: true,
    autoplay: +$slider.dataset.sliderAutoplay > 0 ? {
      delay: +$slider.dataset.sliderAutoplay,
      pauseOnMouseEnter: true,
      disableOnInteraction: false
    } : '',
    navigation: setings.navigation ? {
      nextEl: $sliderWrap.querySelector('.slider__nav-btn--next'),
      prevEl: $sliderWrap.querySelector('.slider__nav-btn--prev')
    } : '',
    scrollbar: setings.scrollbar ? {
      el: setings.scrollbar,
      draggable: true
    } : '',
    pagination: setings.pagination ? {
      el: $sliderWrap.querySelector('.slider__pagination'),
      clickable: true
    } : ''
  });
  return new Swiper($sliderInit, setings.options);
};
module.exports = slider;
},{}],11:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
exports.deepCompare = function (obj1, obj2) {
  if (obj1 === obj2) return true;
  if (!isObject(obj1) && !isArray(obj1) || !isObject(obj2) && !isArray(obj2)) return false;
  if (!isSameType(obj1, obj2) && Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (var _i = 0, _Object$keys = Object.keys(obj1); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (!obj2.hasOwnProperty(key)) return false;
    if (!deepCompare(obj1[key], obj2[key])) return false;
  }
  return true;
};
exports.deepMerge = function (obj1, obj2) {
  if (!isObject(obj1) && !isArray(obj1) || !isSameType(obj1, obj2)) {
    if (isArray(obj2) || isObject(obj2)) {
      return deepCopy(obj2);
    }
    return obj2;
  } else if (isArray(obj1)) {
    return deepMergeArrays(obj1, obj2);
  } else {
    return deepMergeObject(obj1, obj2);
  }
};
exports.throttle = function (func) {
  var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
  var locked = false;
  return function () {
    if (locked) return;
    var context = this;
    var args = arguments;
    locked = true;
    setTimeout(function () {
      func.apply(context, args);
      locked = false;
    }, ms);
  };
};
exports.getCoords = function (el) {
  var box = el.getBoundingClientRect();
  var body = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;
  return {
    top: top,
    left: left,
    innerTop: box.top,
    innerLeft: box.left
  };
};
exports.toggleOverflowDocument = function (is) {
  var bodyEl = document.body;
  if (is) {
    var scrollBarWidth = window.innerWidth - bodyEl.clientWidth;
    bodyEl.style.paddingRight = scrollBarWidth + "px";
    bodyEl.style.overflow = 'hidden';
    bodyEl.style.setProperty("--scrollbar-size", scrollBarWidth + "px");
  } else {
    bodyEl.style.overflow = '';
    bodyEl.style.paddingRight = "";
    bodyEl.style.setProperty("--scrollbar-size", "");
  }
  bodyEl.classList.toggle('is-overflow', is);
};
exports.isElem = function (selector) {
  try {
    return document.querySelector(selector) ? true : false;
  } catch (error) {
    return selector instanceof Element;
  }
};
exports.trigger = function (elem) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  elem.dispatchEvent(new CustomEvent(options.eventName, {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: options.data
  }));
};
exports.uuidv4 = function () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};
exports.declension = function (num, textArray) {
  num = Math.abs(num) % 100;
  var num1 = num % 10;
  if (num > 10 && num < 20) {
    return textArray[2];
  }
  if (num1 > 1 && num1 < 5) {
    return textArray[1];
  }
  if (num1 == 1) {
    return textArray[0];
  }
  return textArray[2];
};
exports.isJson = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
exports.storage = function (key) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!data) {
    return JSON.parse(window.localStorage.getItem(key));
  }
  window.localStorage.setItem(key, JSON.stringify(data));
};
function deepCopy(obj) {
  var result = isObject(obj) ? _objectSpread({}, obj) : _toConsumableArray(obj);
  for (var _i2 = 0, _Object$keys2 = Object.keys(obj); _i2 < _Object$keys2.length; _i2++) {
    var key = _Object$keys2[_i2];
    if (isObject(result[key]) || isArray(result[key])) {
      result[key] = deepCopy(result[key]);
      continue;
    }
  }
  return result;
}
;
function deepMergeArrays(arr1, arr2) {
  return deepCopy([].concat(_toConsumableArray(arr1), _toConsumableArray(arr2)));
}
;
function deepMergeObject(obj1, obj2) {
  var result = deepCopy(obj1);
  for (var _i3 = 0, _Object$keys3 = Object.keys(obj2); _i3 < _Object$keys3.length; _i3++) {
    var key = _Object$keys3[_i3];
    if (!result.hasOwnProperty(key)) {
      if (isObject(obj2[key])) {
        result[key] = deepCopy(obj2[key]);
        continue;
      }
      if (isArray(obj2[key])) {
        result[key] = deepCopy(obj2[key]);
        continue;
      }
      result[key] = obj2[key];
      continue;
    }
    result[key] = methods.deepMerge(result[key], obj2[key]);
  }
  return result;
}
;
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
;
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
;
function isSameType(item1, item2) {
  return Object.prototype.toString.call(item1) === Object.prototype.toString.call(item2);
}
;
},{}]},{},[9])