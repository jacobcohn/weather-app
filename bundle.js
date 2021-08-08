/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  API_KEY: 'c42c3ce00cd6bc460bd80a3cb38e7bbe',\n});\n\n\n//# sourceURL=webpack://weather-app/./src/config.js?");

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {\n  const getRawData = async (zipCode) => {\n    const response = await fetch(\n      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${_config__WEBPACK_IMPORTED_MODULE_0__.default.API_KEY}`,\n      { mode: 'cors' },\n    );\n    const rawData = await response.json();\n    return rawData;\n  };\n\n  const fahrenheitToCelcius = (fahrenheit) => {\n    const celciusNotRounded = ((fahrenheit - 32) * 5) / 9;\n    const celciusRounded = Math.floor(celciusNotRounded * 100) / 100;\n    return celciusRounded;\n  };\n\n  const unixTo12Hour = (unix, shift) => {\n    const unixWithShift = unix + shift;\n    const time24Hours = unixWithShift % 86400;\n    const numberOfHours = Math.floor(time24Hours / 3600);\n    const numberOfMinutes = Math.floor((time24Hours - numberOfHours * 3600) / 60);\n\n    const hoursInFormat = () => {\n      if (numberOfHours === 0) return 0;\n      if (numberOfHours <= 12) return numberOfHours;\n      return numberOfHours - 12;\n    };\n    const minutesInFormat = () => {\n      if (numberOfMinutes === 0) return '00';\n      if (numberOfMinutes < 10) return `0${numberOfMinutes}`;\n      return numberOfMinutes;\n    };\n    const amOrPm = () => {\n      if (numberOfHours < 12) return 'am';\n      return 'pm';\n    };\n\n    return `${hoursInFormat()}:${minutesInFormat()}${amOrPm()}`;\n  };\n\n  const getSentences = (fahrenheit, celcius, sky) => {\n    const Sentences = {\n      shortsOrPants: {},\n      shirtSweatshirtOrCoat: {},\n    };\n\n    if (fahrenheit > 59) {\n      Sentences.shortsOrPants.f = `It is currently ${fahrenheit}° outside. Shorts are recommended.`;\n      Sentences.shortsOrPants.c = `It is currently ${celcius}° outside. Shorts are recommended.`;\n      Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheit}° outside. A shirt is recommended.`;\n      Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celcius}° outside. A shirt is recommended.`;\n    } else {\n      Sentences.shortsOrPants.f = `It is currently ${fahrenheit}° outside. Pants are recommended.`;\n      Sentences.shortsOrPants.c = `It is currently ${celcius}° outside. Pants are recommended.`;\n      if (fahrenheit > 32) {\n        Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheit}° outside. A sweatshirt is recommended.`;\n        Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celcius}° outside. A sweatshirt is recommended.`;\n      } else {\n        Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheit}° outside. A coat is recommended.`;\n        Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celcius}° outside. A coat is recommended.`;\n      }\n    }\n\n    if (sky === 'Clear') {\n      Sentences.extra = 'The sky is clear. There is no need to bring anything else.';\n    } else if (sky === 'Cloudy') {\n      Sentences.extra = 'The sky is cloudy, but there is no rain. There is no need to bring anything else.';\n    } else if (sky === 'Drizzle') {\n      Sentences.extra = 'It is drizzling outside. An umbrella may be necessary.';\n    } else if (sky === 'Rain') {\n      Sentences.extra = 'It is raining outside. An umbrella is recommended.';\n    } else if (sky === 'Thunderstorm') {\n      Sentences.extra = 'There is a thunderstorm outside. Beware of lightning.';\n    } else if (sky === 'Snow') {\n      Sentences.extra = 'It is snowing outside. It might be time to shovel the driveway.';\n    } else {\n      Sentences.extra = 'The weather is weird right now. Be safe';\n    }\n\n    return Sentences;\n  };\n\n  const filterRawData = (rawData) => {\n    const filteredData = {};\n\n    filteredData.city = rawData.name;\n    filteredData.sky = rawData.weather[0].main;\n    filteredData.tempF = rawData.main.temp;\n    filteredData.tempC = fahrenheitToCelcius(filteredData.tempF);\n    filteredData.feelsLikeF = rawData.main.feels_like;\n    filteredData.feelsLikeC = fahrenheitToCelcius(filteredData.feelsLikeF);\n    filteredData.sunrise = unixTo12Hour(rawData.sys.sunrise, rawData.timezone);\n    filteredData.sunset = unixTo12Hour(rawData.sys.sunset, rawData.timezone);\n    filteredData.sentences = getSentences(filteredData.tempF, filteredData.tempC, filteredData.sky);\n\n    return filteredData;\n  };\n\n  const getWeather = async (zipCode) => {\n    const rawData = await getRawData(zipCode);\n    const filteredData = filterRawData(rawData);\n    return filteredData;\n  };\n\n  return { getWeather };\n})());\n\n\n//# sourceURL=webpack://weather-app/./src/data.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {\n  const displayWeather = (data) => {\n    console.log(data);\n  };\n\n  return { displayWeather };\n})());\n\n\n//# sourceURL=webpack://weather-app/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n(() => {\n  let submittedOnce = false;\n\n  const events = () => {\n    const zipCodeForm = document.getElementById('zipCodeForm');\n    const zipCodeInput = document.getElementById('zipCodeInput');\n\n    zipCodeForm.addEventListener('submit', async (e) => {\n      submittedOnce = true;\n      e.preventDefault();\n\n      const newZipCode = zipCodeInput.value;\n      zipCodeInput.value = '';\n      _dom__WEBPACK_IMPORTED_MODULE_1__.default.displayWeather(await _data__WEBPACK_IMPORTED_MODULE_0__.default.getWeather(newZipCode));\n    });\n  };\n\n  const getAndDisplayInitialWeather = async () => {\n    const initialWeatherData = await _data__WEBPACK_IMPORTED_MODULE_0__.default.getWeather('10001');\n    if (!submittedOnce) _dom__WEBPACK_IMPORTED_MODULE_1__.default.displayWeather(initialWeatherData);\n  };\n\n  const init = () => {\n    events();\n    getAndDisplayInitialWeather();\n  };\n\n  init();\n})();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;