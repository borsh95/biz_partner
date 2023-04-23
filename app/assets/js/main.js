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

  //Hamburger открытия мобильного меню
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
},{"./../utils/utils":18}],3:[function(require,module,exports){
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
},{"./../utils/utils.js":18}],4:[function(require,module,exports){
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
},{"./../plugins/slider":12}],8:[function(require,module,exports){
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
require('./plugins/select');
var _require = require('./utils/utils'),
  isElem = _require.isElem,
  throttle = _require.throttle;
var createStore = require('./state/createStore');
var initialState = require('./state/initialState');
var rootReducer = require('./state/rootReducer');
var actions = require('./state/actions');
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
      var _instanceSelect$insta, _instanceSelect$insta2, _instanceSelect$insta3, _instanceSelect$insta4;
      var instanceSelect = $(selectEl).data().instance;
      var isFilled = !!(instanceSelect.isFilled || instanceSelect !== null && instanceSelect !== void 0 && (_instanceSelect$insta = instanceSelect.instanceOptions) !== null && _instanceSelect$insta !== void 0 && (_instanceSelect$insta2 = _instanceSelect$insta.state) !== null && _instanceSelect$insta2 !== void 0 && (_instanceSelect$insta3 = _instanceSelect$insta2.options) !== null && _instanceSelect$insta3 !== void 0 && (_instanceSelect$insta4 = _instanceSelect$insta3.itemsActive) !== null && _instanceSelect$insta4 !== void 0 && _instanceSelect$insta4.length);
      $(selectEl).closest('.field').toggleClass('filled', isFilled);
    };
    $selects.select();
    $selects.each(function (_, item) {
      return toggleFilledField(item);
    });

    // Срабатывает после обновления по ajax
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

      // Настройка поведения карты
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
    $(this).closest('li').toggleClass('open').find('.menu__submenu').slideToggle(200);
  });
});
},{"./base":1,"./chunks":6,"./plugins/select":11,"./state/actions":13,"./state/createStore":14,"./state/initialState":15,"./state/rootReducer":16,"./utils/utils":18}],10:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _require = require('./../utils/utils'),
  trigger = _require.trigger,
  uuidv4 = _require.uuidv4;
var Options = function () {
  var _class, _defaults, _config, _initDependencies, _registerEventsHandler;
  var EVENTS = {
    change: "options:change",
    updateSize: "options:updateSize"
  };
  var SELECT_DATEPICKERS = [];
  var DATE_FORMAT = 'DD.MM.YYYY';
  var getValidDate = function getValidDate(date) {
    return moment(date, DATE_FORMAT).format();
  };
  var getFormatedDate = function getFormatedDate(date) {
    return moment(getValidDate(date)).format(DATE_FORMAT);
  };
  var getTextFromElem = function getTextFromElem(el) {
    var text = typeof el !== 'string' ? $(el).text().trim() : el.trim();
    return text.replace(/[\n\s]{2,}/g, ' ').trim();
  };
  return _defaults = /*#__PURE__*/new WeakMap(), _config = /*#__PURE__*/new WeakMap(), _initDependencies = /*#__PURE__*/new WeakSet(), _registerEventsHandler = /*#__PURE__*/new WeakSet(), (_class = /*#__PURE__*/function () {
    function Options(elem) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, Options);
      _classPrivateMethodInitSpec(this, _registerEventsHandler);
      _classPrivateMethodInitSpec(this, _initDependencies);
      _classPrivateFieldInitSpec(this, _defaults, {
        writable: true,
        value: {}
      });
      _classPrivateFieldInitSpec(this, _config, {
        writable: true,
        value: {}
      });
      if (!elem) {
        throw new Error("the \"elem\" argument was not passed to Options");
      }
      this.$el = $(elem);
      this.$content = this.$el.find('.options__content');
      this._state = {
        type: this.$el.get(0).getAttribute('data-type'),
        // multiple, radio, datepicker, time, fields
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
      };
      this.init();
    }
    _createClass(Options, [{
      key: "state",
      get: function get() {
        return $.extend({}, this._state);
      }
    }, {
      key: "init",
      value: function init() {
        var metadata = this.$el.attr('data-options') || "{}";
        metadata = JSON.parse(metadata);
        _classPrivateFieldSet(this, _config, $.extend({}, _classPrivateFieldGet(this, _defaults), this.options, metadata));
        if (this._state.type === 'radio' || this._state.type === 'multiple') {
          this.$optionItems = this.$el.find('.options__item');
          this.$inputSearch = this.$el.find('.options__input-search');
        } else if (this._state.type === 'datepicker') {
          this.$datepicker = this.$el.find('.datepicker');
          this.$inputData = this.$el.find('.options__input-invisible');
        }
        _classPrivateMethodGet(this, _registerEventsHandler, _registerEventsHandler2).call(this);
        _classPrivateMethodGet(this, _initDependencies, _initDependencies2).call(this);
        this.updateState();
      }
    }, {
      key: "updateState",
      value: function updateState() {
        var _this = this;
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var type = this._state.type;
        if (type === 'datepicker') {
          var _this$$inputData$val;
          var valueInput = (_this$$inputData$val = this.$inputData.val()) === null || _this$$inputData$val === void 0 ? void 0 : _this$$inputData$val.trim();
          if (!this.$inputData.get(0).hasAttribute('value') || valueInput === '') {
            this._state.datepicker.date = [];
          } else {
            var values = valueInput.split(/\s*,\s*/g).map(getFormatedDate);
            this._state.datepicker.date = values;
          }
          ;
        } else if (type === 'fields') {
          var $fields = this.$el.find('input');
          this._state.fields.items.length = 0;
          $fields.each(function (_, input) {
            var itemObj = {
              el: input,
              value: input.value.trim()
            };
            _this._state.fields.items.push(itemObj);
          });
        } else if (type === 'radio' || type == 'multiple') {
          if (options.isChangedContent) {
            this.$optionItems = this.$el.find('.options__item');
          }

          // radio, multiple
          this._state.options.items.length = 0;
          this._state.options.itemsActive.length = 0;
          this.$optionItems.each(function (_, item) {
            var inputEl = item.querySelector('input[name]');
            if (!inputEl) return true;
            var isActive = inputEl.closest('[name]:checked') ? true : false;
            var isHidden = inputEl.closest('[hidden]') ? true : false;
            var stateItem = {
              el: item,
              isActive: isActive,
              isHidden: isHidden,
              text: Options.getTextOption(item),
              value: inputEl.value,
              index: $(item).index()
            };
            _this._state.options.items.push(stateItem);
            isActive && _this._state.options.itemsActive.push(stateItem);
          });
        }
      }
    }, {
      key: "updateView",
      value: function updateView() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var type = this._state.type;
        if (type === 'radio' || type === 'multiple') {
          this._state.options.items.forEach(function (_ref) {
            var el = _ref.el,
              isActive = _ref.isActive;
            el.classList[isActive ? 'add' : 'remove']('active');
          });
        }
      }
    }, {
      key: "updateSize",
      value: function updateSize() {
        this.$el.css('height', this.$content.css('height'));
      }
    }, {
      key: "filterBySearch",
      value: function filterBySearch() {
        if (!(this !== null && this !== void 0 && this.$inputSearch.length)) return;
        var valueSearch = this.$inputSearch.val().trim().toLocaleLowerCase();
        this._state.options.items.forEach(function (_ref2) {
          var el = _ref2.el,
            text = _ref2.text;
          var isMatch = text.toLowerCase().includes(valueSearch);
          el.classList[isMatch ? 'remove' : 'add']('disabled');
        });
      }
    }, {
      key: "open",
      value: function open() {
        var _this$$inputSearch;
        this.updateSize();
        ((_this$$inputSearch = this.$inputSearch) === null || _this$$inputSearch === void 0 ? void 0 : _this$$inputSearch.length) && this.$inputSearch.focus();
      }
    }, {
      key: "close",
      value: function close() {
        this.$el.css('height', '');
      }

      /**
       * @param {object=} params.value - input[value="${value}"]
       * @param {object=} params.method
      */
    }, {
      key: "reset",
      value: function reset() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          value = _ref3.value,
          method = _ref3.method;
        var $triggered;
        if (this._state.type === 'datepicker') {
          this.$inputData.prop('checked', false);
          this.$inputData.val('');
          SELECT_DATEPICKERS[this._state.datepicker.id].clear({
            silent: true
          });
          $triggered = this.$inputData;
        } else {
          var selectorInput = "input".concat(value ? "[value=\"".concat(value, "\"]") : '');
          var $inputs = this.$el.find(selectorInput);
          $inputs.prop('checked', false);
          this._state.type === 'fields' && $inputs.val('');
          $triggered = $inputs.eq(0);
        }
        if (method === 'filter' && this._state.type === 'radio') {
          var _this$_state$options;
          if ((_this$_state$options = this._state.options) !== null && _this$_state$options !== void 0 && _this$_state$options.items[0]) {
            var _this$_state$options2;
            var $firstItem = $('input', (_this$_state$options2 = this._state.options) === null || _this$_state$options2 === void 0 ? void 0 : _this$_state$options2.items[0].el);
            $firstItem.prop('checked', true);
            $triggered = $firstItem;
          }
        }
        trigger($triggered.get(0), {
          eventName: 'change'
        });
      }
    }]);
    return Options;
  }(), _defineProperty(_class, "getTextOption", getTextFromElem), _class);
  function _initDependencies2() {
    var _this2 = this;
    var type = this._state.type;
    if (type === 'datepicker') {
      var _this$$datepicker$get = this.$datepicker.get(0).dataset,
        id = _this$$datepicker$get['datepicker-id'],
        select = _this$$datepicker$get['datepicker-select'],
        rangeValue = _this$$datepicker$get.range,
        from = _this$$datepicker$get['datepicker-from'],
        to = _this$$datepicker$get['datepicker-to'];
      var isRange = rangeValue === 'true' || rangeValue === '1';
      var key = id ? id : uuidv4();
      var view = ['days', 'months'].includes(select) ? select : 'days';
      this.$datepicker.attr('data-datepicker-id', key);
      this.$inputData.attr('data-type-value', 'date');
      this._state.datepicker = _objectSpread(_objectSpread({}, this._state.datepicker), {}, {
        $inputData: this.$inputData,
        id: key,
        isRange: isRange
      });
      SELECT_DATEPICKERS[key] = new AirDatepicker(this.$datepicker.get(0), {
        range: isRange,
        view: view,
        minView: view,
        dsekonSelect: select,
        toggleSelected: true,
        onSelect: function onSelect(_ref4) {
          var date = _ref4.date;
          var dateTime;
          if (!date || (date === null || date === void 0 ? void 0 : date.length) === 0) {
            _this2.reset();
            return;
          }
          if (Array.isArray(date)) {
            dateTime = date.map(function (date) {
              return getFormatedDate(date);
            }).join(',');
          } else {
            dateTime = date ? getFormatedDate(date) : '';
          }
          _this2.$inputData.val(dateTime);
          dateTime && _this2.$inputData.prop('checked', true);
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
          trigger(_this2.$inputData.get(0), {
            eventName: 'change'
          });
        },
        onChangeViewDate: function onChangeViewDate() {
          setTimeout(function () {
            trigger(_this2.$el.get(0), {
              eventName: EVENTS.updateSize
            });
          });
        },
        onChangeView: function onChangeView() {
          setTimeout(function () {
            trigger(_this2.$el.get(0), {
              eventName: EVENTS.updateSize
            });
          });
        },
        prevHtml: '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0.122782 3.12484C0.288173 2.95836 0.556932 2.95836 0.722323 3.12484L5.99416 8.44179L11.2763 3.12484C11.4417 2.95836 11.7105 2.95836 11.8759 3.12484C12.0413 3.29132 12.0413 3.56185 11.8759 3.72833L6.30427 9.33662C6.22157 9.41986 6.11821 9.46148 6.0045 9.46148C5.90113 9.46148 5.78742 9.41986 5.70473 9.33662L0.133119 3.72833C-0.0426093 3.56185 -0.0426092 3.29132 0.122782 3.12484Z"></path></svg>',
        nextHtml: '<svg viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg"><path d="M0.122782 3.12484C0.288173 2.95836 0.556932 2.95836 0.722323 3.12484L5.99416 8.44179L11.2763 3.12484C11.4417 2.95836 11.7105 2.95836 11.8759 3.12484C12.0413 3.29132 12.0413 3.56185 11.8759 3.72833L6.30427 9.33662C6.22157 9.41986 6.11821 9.46148 6.0045 9.46148C5.90113 9.46148 5.78742 9.41986 5.70473 9.33662L0.133119 3.72833C-0.0426093 3.56185 -0.0426092 3.29132 0.122782 3.12484Z"></path></svg>'
      });
      if (this.$inputData.prop('checked')) {
        var valueInputData = this.$inputData.val().trim();
        var valueForInit = valueInputData.split(/\s*,\s*/g).map(function (date) {
          return getValidDate(date);
        });
        SELECT_DATEPICKERS[key].selectDate(valueForInit, {
          silent: true
        });
        trigger(this.$inputData.get(0), {
          eventName: 'change'
        });
      }
    }
  }
  function _registerEventsHandler2() {
    var _this3 = this;
    var handlerChange = function handlerChange(e) {
      var $target = $(e.target);
      _this3.updateState();
      _this3.updateView();

      // Фильтрация списка item options
      if ($target.is(_this3.$inputSearch)) {
        _this3.filterBySearch();
      }
      if (_this3._state.type === 'fields' || $target.is(_this3.$inputSearch)) {
        if (e.type === 'keyup') return;
      }

      // triger event
      trigger(_this3.$el.get(0), {
        eventName: EVENTS.change
      });
    };
    this.$el.on('change keyup', handlerChange);
    this.$el.on('front_init', function (e) {
      _this3.updateState({
        isChangedContent: true
      });
      _this3.updateView();
      _this3.filterBySearch();

      // triger event
      trigger(_this3.$el.get(0), {
        eventName: EVENTS.updateSize
      });
      trigger(_this3.$el.get(0), {
        eventName: EVENTS.change,
        data: {
          isChangedContent: true
        }
      });
    });
  }
}();
module.exports = Options;
},{"./../utils/utils":18}],11:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var Options = require('./options');
var _require = require('./../utils/utils'),
  throttle = _require.throttle,
  trigger = _require.trigger,
  declension = _require.declension,
  getCoords = _require.getCoords;
var EVENTS = {
  change: "select:change"
};
var CLASS_OPEN = 'active',
  CLASS_FILLED = 'filled',
  SELECT_MAX_VALUES = 3;
var getTemplateValuesFromDate = function getTemplateValuesFromDate(data, isRange) {
  var result = data.join(' - ');
  if (isRange && data.length === 1) {
    result = 'от ' + result;
  }
  return result;
};
var getTemplateValueItem = function getTemplateValueItem(_ref) {
  var index = _ref.index,
    _ref$label = _ref.label,
    label = _ref$label === void 0 ? '' : _ref$label,
    value = _ref.value;
  var labelFormated = getFormatedText(label);
  return "\n        <div class=\"select__values-item\" ".concat(index ? "style=\"order: ".concat(index, "\"") : '', " data-value='").concat(value !== null && value !== void 0 ? value : 'all', "'\n             ").concat(label ? "title=\"".concat(label.replace(/<\/?[^>]+>/g, ''), "\"") : '', ">\n            <div class=\"icon select__values-item-close\">\n                <svg viewBox=\"0 0 24 24\"\n                     xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M23.4313 21.7518C21.0182 19.3178 18.5584 16.8558 16.1734 14.4781L14.041 12.3437C13.9661 12.2688 13.8913 12.1846 13.8071 12.091C13.7791 12.0535 13.7417 12.0161 13.7043 11.9786C13.7417 11.9412 13.7791 11.9131 13.8165 11.885C13.91 11.8008 13.9942 11.7259 14.0784 11.6416C17.1648 8.55241 20.2513 5.4632 23.3471 2.36464C23.3752 2.33655 23.4126 2.30847 23.4406 2.27102C23.5435 2.16805 23.6464 2.06508 23.7399 1.95274C24.0486 1.53149 24.086 1.08215 23.8335 0.632806C23.5716 0.164745 23.0572 -0.0973701 22.6082 0.0336872C22.3089 0.117938 21.9909 0.305163 21.7384 0.557916C19.3067 2.97312 16.8375 5.44448 14.4619 7.8316L12.3387 9.9566C12.2639 10.0315 12.1797 10.1064 12.0862 10.1906C12.0488 10.2281 12.002 10.2655 11.9646 10.303C11.9366 10.2655 11.8992 10.2281 11.8711 10.1906C11.7963 10.0877 11.7214 10.0034 11.6373 9.91915C8.53211 6.81122 5.42694 3.71265 2.33113 0.614084C2.30307 0.586 2.27501 0.557916 2.24695 0.529833C2.15342 0.43622 2.05989 0.333247 1.95701 0.258357C1.53613 -0.0505639 1.08719 -0.0786476 0.638252 0.164745C0.161253 0.417498 -0.0912751 0.932366 0.0303127 1.38171C0.114489 1.68126 0.301547 2.00891 0.554076 2.2523C3.44412 5.16365 6.39029 8.10307 9.23357 10.9583L9.90698 11.6323C9.99116 11.7165 10.0753 11.782 10.1876 11.8663C10.2343 11.9037 10.2811 11.9412 10.3372 11.9786C10.2811 12.0254 10.225 12.0722 10.1782 12.119C10.0753 12.2127 9.98181 12.2875 9.90698 12.3624C6.81117 15.461 3.70601 18.5689 0.610193 21.6675C0.582134 21.6956 0.563428 21.7143 0.53537 21.7424C0.441841 21.836 0.338959 21.939 0.254782 22.042C0.00225395 22.3977 -0.0538635 22.8377 0.095783 23.2308C0.24543 23.624 0.582134 23.9048 0.993662 23.9797C1.55484 24.0827 1.94766 23.7738 2.2376 23.4929C4.93124 20.7875 7.68099 18.0353 10.3372 15.3768L11.6653 14.0475C11.7402 13.9726 11.8243 13.8977 11.9179 13.8134C11.9553 13.776 11.9927 13.7479 12.0301 13.7105C12.0675 13.7479 12.0956 13.7853 12.1236 13.8228C12.2078 13.9164 12.2826 14.01 12.3574 14.0849C15.4533 17.1928 18.5584 20.2914 21.6542 23.39C21.6823 23.4181 21.701 23.4461 21.7291 23.4649C21.8226 23.5585 21.9161 23.6614 22.0284 23.7457C22.2528 23.9142 22.5054 23.9985 22.7579 23.9985C22.973 23.9985 23.1881 23.9329 23.3939 23.8112C23.8615 23.5117 24.0673 23.0811 23.9551 22.613C23.8896 22.3322 23.6932 22.0139 23.4313 21.7518Z\" />\n                </svg>\n            </div>\n            <div class=\"select__values-item-value\">").concat(labelFormated, "</div>\n        </div>\n    ");
};
var getFormatedText = function getFormatedText(el) {
  var regexp = /[\n\s]{2,}/g;
  if (typeof el === 'string') {
    return el.replace(regexp, ' ').trim();
  } else {
    return $(el).text().replace(regexp, ' ').trim();
  }
};
var _registerEventsHandler = /*#__PURE__*/new WeakSet();
var Select = /*#__PURE__*/function () {
  function Select(el) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Select);
    _classPrivateMethodInitSpec(this, _registerEventsHandler);
    if (!el) {
      throw new Error("elem was not passed to Select");
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
    };
    this.init();
  }
  _createClass(Select, [{
    key: "state",
    get: function get() {
      return $.extend({}, this._state);
    }
  }, {
    key: "isOpen",
    get: function get() {
      return this.$el.hasClass(CLASS_OPEN);
    }
  }, {
    key: "isFilled",
    get: function get() {
      var _stateOptions$options, _stateOptions$datepic;
      var stateOptions = this.instanceOptions.state;
      var itemsOptionActive = ((_stateOptions$options = stateOptions.options) === null || _stateOptions$options === void 0 ? void 0 : _stateOptions$options.itemsActive) || [];
      itemsOptionActive = itemsOptionActive.filter(function (item) {
        return !item.isHidden;
      });
      var filledFields = stateOptions.fields.items.filter(function (item) {
        return item.value.trim() !== '';
      });
      return !!(itemsOptionActive.length || (_stateOptions$datepic = stateOptions.datepicker) !== null && _stateOptions$datepic !== void 0 && _stateOptions$datepic.date.length || filledFields.length);
    }
  }, {
    key: "init",
    value: function init() {
      _classPrivateMethodGet(this, _registerEventsHandler, _registerEventsHandler2).call(this);
      this.updateView();
      this.$el.data('instance', this);
    }
  }, {
    key: "updateView",
    value: function updateView() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var stateOptions = this.instanceOptions.state;
      var typeOptions = stateOptions.type;
      var valueSelect = '';
      if (typeOptions === 'radio' || typeOptions === 'multiple') {
        var itemsActive = stateOptions.options.itemsActive;
        if (this.$value.length) {
          var itemActive = itemsActive[0];
          var text = (itemActive === null || itemActive === void 0 ? void 0 : itemActive.text) || '';
          this.$value.text(text);
          this.$value[itemActive !== null && itemActive !== void 0 && itemActive.isHidden ? 'addClass' : 'removeClass']('select__value--hidden');
          !options.isChangedContent && this.close();
        } else if (this.$values.length) {
          if (itemsActive.length < SELECT_MAX_VALUES) {
            itemsActive.forEach(function (_ref2) {
              var index = _ref2.index,
                text = _ref2.text,
                value = _ref2.value;
              valueSelect += getTemplateValueItem({
                index: index,
                label: text,
                value: value
              });
            });
          } else {
            var textLabel = itemsActive.length + ' ' + declension(itemsActive.length, ['вариант', 'варианта', 'вариантов']);
            valueSelect = getTemplateValueItem({
              index: 0,
              label: textLabel
            });
          }
          this.$values.html(valueSelect);
        }
      } else if (typeOptions === 'datepicker') {
        var _stateOptions$datepic2 = stateOptions.datepicker,
          date = _stateOptions$datepic2.date,
          isRange = _stateOptions$datepic2.isRange,
          $inputData = _stateOptions$datepic2.$inputData;
        if (date.length) {
          var labelDate = getTemplateValuesFromDate(date, isRange);
          valueSelect = getTemplateValueItem({
            label: labelDate,
            value: $inputData.val()
          });
        }
        ;
        this.$values.html(valueSelect);
      } else if (typeOptions === 'fields') {
        var items = stateOptions.fields.items;
        var isMoreValues = false;
        var displayedValue = '';
        var displayedKey = [];
        var displayedVal = [];
        items.forEach(function (_ref3) {
          var el = _ref3.el,
            value = _ref3.value;
          if (value !== '') {
            displayedKey.push(el.getAttribute('placeholder') || '');
            displayedVal.push(value);
          }
        });
        isMoreValues = displayedKey.length > 1;
        displayedKey.forEach(function (item, i) {
          displayedValue += " ".concat(!isMoreValues ? "".concat(item, " ") : i !== 0 ? '- ' : '').concat(displayedVal[i]);
        });
        if (displayedValue !== '') {
          var html = getTemplateValueItem({
            label: displayedValue.trim()
          });
          this.$values.html(html);
        } else {
          this.$values.html('');
        }
      }
      this.toggleFilled();
      options.isChangedContent && this.updatePosition();
    }
  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var selectHeightCheck = +window.innerHeight < +getCoords(this.$content.get(0)).innerTop + +this.$content.get(0).offsetHeight + +this.$options.get(0).offsetHeight;
      if (selectHeightCheck) {
        if (!this.$el.hasClass('top')) this.$el.addClass('top');
      } else {
        if (this.$el.hasClass('top')) this.$el.removeClass('top');
      }
    }

    /**
     * @param {object=} params.value - input[value="${value}"]
     * @param {object=} params.method
    */
  }, {
    key: "reset",
    value: function reset() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (typeof options.value === 'string') {
        var $itemVlues = this.$el.find("[data-value=\"".concat(options.value, "\"]"));
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
  }, {
    key: "toggleFilled",
    value: function toggleFilled() {
      this.$el.get(0).classList.toggle(CLASS_FILLED, this.isFilled);
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.isOpen ? this.close() : this.open();
    }
  }, {
    key: "open",
    value: function open() {
      this.$el.addClass(CLASS_OPEN);
      this.instanceOptions.open();
    }
  }, {
    key: "close",
    value: function close() {
      this.$el.removeClass(CLASS_OPEN);
      this.instanceOptions.close();
    }
  }]);
  return Select;
}();
function _registerEventsHandler2() {
  var _this = this;
  // click select
  this.$el.on('click', function (e) {
    var $target = $(e.target);
    if ($target.closest('.select__values-item').length) {
      e.stopPropagation();
      $target = $target.closest('.select__values-item');
      var value = $target.attr('data-value');
      value = value !== 'all' ? value : undefined;
      _this.reset({
        value: value
      });
    } else if ($target.closest('.select__content').length) {
      _this.toggle();
    }
  });

  // change options
  this.$options.on('options:change', function (e, data) {
    _this._state.isFilled = _this.isFilled;
    _this.updateView(data);
    trigger(_this.$el.get(0), {
      eventName: EVENTS.change
    });
  });

  // update size options
  this.$options.on('options:updateSize', function (e) {
    _this.isOpen && _this.instanceOptions.updateSize();
  });
  if (!Select.isInitDocumentListeners) {
    $(document).on('mousedown', function (e) {
      var selectActiveEl = document.querySelector('.select.active');
      if (selectActiveEl && !selectActiveEl.contains(e.target)) {
        var instanceSelect = $(selectActiveEl).data('instance');
        instanceSelect.close();
      }
    });
    $(document).on('scroll', throttle(function () {
      var $selectActive = $('.select.active');
      if ($selectActive.length) {
        var instance = $selectActive.data('instance');
        instance.updatePosition();
      }
    }, 150));
    Select.isInitDocumentListeners = true;
  }
}
_defineProperty(Select, "isInitDocumentListeners", false);
$.fn.select = function (options) {
  var instances = [];
  this.each(function () {
    instances.push(new Select(this, options));
  });
  return instances.length === 1 ? instances[0] : instances.length ? instances : null;
};
exports = Select;
},{"./../utils/utils":18,"./options":10}],12:[function(require,module,exports){
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
  console.log($slider);
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
},{}],13:[function(require,module,exports){
"use strict";

var _require = require('./types'),
  CHANGE_THEME = _require.CHANGE_THEME;
module.exports.changeTheme = function (data) {
  return {
    type: CHANGE_THEME,
    data: data
  };
};
},{"./types":17}],14:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
module.exports = /*#__PURE__*/function () {
  function createStore(rootReducer) {
    var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, createStore);
    this.rootReducer = rootReducer;
    this.state = rootReducer(_objectSpread({}, initialState), {
      type: '__INIT__'
    });
    this.listeners = new Set();
  }
  _createClass(createStore, [{
    key: "subscribe",
    value: function subscribe(fn) {
      this.listeners.add(fn);
      return {
        unsubscribe: function unsubscribe() {
          this.listener["delete"](fn);
        }
      };
    }
  }, {
    key: "dispatch",
    value: function dispatch(action) {
      this.state = this.rootReducer(this.state, action);
      var _iterator = _createForOfIteratorHelper(this.listeners),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var listener = _step.value;
          try {
            listener(this.state);
          } catch (error) {
            console.log(error);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "getState",
    value: function getState() {
      return JSON.parse(JSON.stringify(this.state));
    }
  }]);
  return createStore;
}();
},{}],15:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = require('./../utils/utils'),
  storage = _require.storage;
var defaultState = {
  themeSite: "light"
};
var normalize = function normalize(state) {
  return _objectSpread({}, state);
};
module.exports = storage('state') ? normalize(storage('state')) : defaultState;
},{"./../utils/utils":18}],16:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _require = require('./types'),
  CHANGE_THEME = _require.CHANGE_THEME;
var _require2 = require('./../utils/utils'),
  storage = _require2.storage;
module.exports = function rootReducer(state, action) {
  var changeState = state,
    field,
    val;
  switch (action.type) {
    case CHANGE_THEME:
      changeState = _objectSpread(_objectSpread({}, state), {}, {
        themeSite: action.data
      });
  }
  storage('state', changeState);
  return changeState;
};
},{"./../utils/utils":18,"./types":17}],17:[function(require,module,exports){
"use strict";

var CHANGE_THEME = 'CHANGE_THEME';
module.exports = {
  CHANGE_THEME: CHANGE_THEME
};
},{}],18:[function(require,module,exports){
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
// Сравнение объектов и массивов по элементно (не по ссылке)
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

// глубокое слияние объектов
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
  if (is) {
    var scrollBarWidth = window.innerWidth - document.body.clientWidth;
    document.body.style.paddingRight = scrollBarWidth + "px";
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    document.body.style.paddingRight = "";
  }
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