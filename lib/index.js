(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["add-eventlistener-with-options"] = factory();
	else
		root["add-eventlistener-with-options"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = addEventListenerWithOptions;

	var _checkSupport = __webpack_require__(1);

	function addEventListenerWithOptions(target, eventName, listener, options) {
	    if (target.addEventListener !== undefined) {
	        var listenerOption = (0, _checkSupport.isPassiveSupported)() ? { passive: true } : false;
	        target.addEventListener(eventName, listener, listenerOption, options);
	    }
	}

	function sanitizeOptions(options) {
	    // Filter out all the options which are nit present and apply pnly thise which are supported
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.isCaptureSupported = exports.isOnceSupported = exports.isPassiveSupported = undefined;

	var _constants = __webpack_require__(2);

	var isPassiveSupported = exports.isPassiveSupported = function isPassiveSupported() {
	    return checkSupportForProperty(_constants.PASSIVE);
	};
	var isOnceSupported = exports.isOnceSupported = function isOnceSupported() {
	    return checkSupportForProperty(_constants.ONCE);
	};
	var isCaptureSupported = exports.isCaptureSupported = function isCaptureSupported() {
	    return checkSupportForProperty(_constants.CAPTURE);
	};

	function checkSupportForProperty(property) {
	    var supports = false;
	    try {
	        var opts = Object.defineProperty({}, property, {
	            get: function get() {
	                supports = true;
	            }
	        });
	        window.addEventListener("test", null, opts);
	        window.removeListener("test", null);
	    } catch (e) {}

	    return supports;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var PASSIVE = exports.PASSIVE = 'passive';
	var CAPTURE = exports.CAPTURE = 'capture';
	var ONCE = exports.ONCE = 'once';

/***/ }
/******/ ])
});
;