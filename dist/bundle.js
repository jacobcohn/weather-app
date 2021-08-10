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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./src/config.js\");\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {\n  const getRawData = async (zipCode) => {\n    const response = await fetch(\n      `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&units=imperial&appid=${_config__WEBPACK_IMPORTED_MODULE_0__.default.API_KEY}`,\n      { mode: 'cors' },\n    );\n    if (!response.ok) throw Error;\n    const rawData = await response.json();\n    return rawData;\n  };\n\n  const firstLettersToUpperCase = (string) =>\n    string\n      .split(' ')\n      .map((word) => word[0].toUpperCase() + word.substring(1))\n      .join(' ');\n\n  const fahrenheitToCelcius = (fahrenheit) => {\n    const celciusNotRounded = ((fahrenheit - 32) * 5) / 9;\n    const celciusRounded = Math.floor(celciusNotRounded * 100) / 100;\n    return celciusRounded;\n  };\n\n  const unixTo12Hour = (unix, shift) => {\n    const unixWithShift = unix + shift;\n    const time24Hours = unixWithShift % 86400;\n    const numberOfHours = Math.floor(time24Hours / 3600);\n    const numberOfMinutes = Math.floor((time24Hours - numberOfHours * 3600) / 60);\n\n    const hoursInFormat = () => {\n      if (numberOfHours === 0) return 0;\n      if (numberOfHours <= 12) return numberOfHours;\n      return numberOfHours - 12;\n    };\n    const minutesInFormat = () => {\n      if (numberOfMinutes === 0) return '00';\n      if (numberOfMinutes < 10) return `0${numberOfMinutes}`;\n      return numberOfMinutes;\n    };\n    const amOrPm = () => {\n      if (numberOfHours < 12) return 'am';\n      return 'pm';\n    };\n\n    return `${hoursInFormat()}:${minutesInFormat()}${amOrPm()}`;\n  };\n\n  const getSentences = (fahrenheit, celcius, sky) => {\n    const Sentences = {\n      shortsOrPants: {},\n      shirtSweatshirtOrCoat: {},\n    };\n\n    const fahrenheitInFormat = `${Math.round(fahrenheit)}°`;\n    const celciusInFormat = `${Math.round(celcius)}°`;\n\n    if (fahrenheit > 59) {\n      Sentences.shortsOrPants.f = `It is currently ${fahrenheitInFormat} outside. Shorts are recommended.`;\n      Sentences.shortsOrPants.c = `It is currently ${celciusInFormat} outside. Shorts are recommended.`;\n      Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheitInFormat} outside. A shirt is recommended.`;\n      Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celciusInFormat} outside. A shirt is recommended.`;\n    } else {\n      Sentences.shortsOrPants.f = `It is currently ${fahrenheitInFormat} outside. Pants are recommended.`;\n      Sentences.shortsOrPants.c = `It is currently ${celciusInFormat} outside. Pants are recommended.`;\n      if (fahrenheit > 32) {\n        Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheitInFormat} outside. A sweatshirt is recommended.`;\n        Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celciusInFormat} outside. A sweatshirt is recommended.`;\n      } else {\n        Sentences.shirtSweatshirtOrCoat.f = `It is currently ${fahrenheitInFormat} outside. A coat is recommended.`;\n        Sentences.shirtSweatshirtOrCoat.c = `It is currently ${celciusInFormat} outside. A coat is recommended.`;\n      }\n    }\n\n    if (sky === 'Clear') {\n      Sentences.whatElse = 'The sky is clear. There is no need to bring anything else.';\n    } else if (sky === 'Clouds') {\n      Sentences.whatElse = 'The sky is cloudy, but there is no rain. There is no need to bring anything else.';\n    } else if (sky === 'Drizzle') {\n      Sentences.whatElse = 'It is drizzling outside. An umbrella may be necessary.';\n    } else if (sky === 'Rain') {\n      Sentences.whatElse = 'It is raining outside. An umbrella is recommended.';\n    } else if (sky === 'Thunderstorm') {\n      Sentences.whatElse = 'There is a thunderstorm outside. Beware of lightning.';\n    } else if (sky === 'Snow') {\n      Sentences.whatElse = 'It is snowing outside. It might be time to shovel the driveway.';\n    } else {\n      Sentences.whatElse = 'The weather is weird right now. Be safe.';\n    }\n\n    return Sentences;\n  };\n\n  const filterRawData = (rawData) => {\n    const filteredData = {};\n\n    filteredData.city = rawData.name;\n    filteredData.sky = rawData.weather[0].main;\n    filteredData.description = firstLettersToUpperCase(rawData.weather[0].description);\n    filteredData.tempF = rawData.main.temp;\n    filteredData.tempC = fahrenheitToCelcius(filteredData.tempF);\n    filteredData.feelsLikeF = rawData.main.feels_like;\n    filteredData.feelsLikeC = fahrenheitToCelcius(filteredData.feelsLikeF);\n    filteredData.sunrise = unixTo12Hour(rawData.sys.sunrise, rawData.timezone);\n    filteredData.sunset = unixTo12Hour(rawData.sys.sunset, rawData.timezone);\n    filteredData.sentences = getSentences(filteredData.tempF, filteredData.tempC, filteredData.sky);\n\n    return filteredData;\n  };\n\n  const getWeather = async (zipCode) => {\n    const rawData = await getRawData(zipCode);\n    const filteredData = filterRawData(rawData);\n    return filteredData;\n  };\n\n  return { getWeather };\n})());\n\n\n//# sourceURL=webpack://weather-app/./src/data.js?");

/***/ }),

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((() => {\n  const celciusOption = document.getElementById('celciusOption');\n  const fahrenheitOption = document.getElementById('fahrenheitOption');\n\n  const mainInfoDiv = document.getElementById('mainInfoDiv');\n  const allSentencesDiv = document.getElementById('allSentencesDiv');\n\n  const hideMainDivs = () => {\n    [mainInfoDiv, allSentencesDiv].forEach((div) => {\n      if (div.classList.contains('visible')) div.classList.toggle('visible');\n      if (!div.classList.contains('notVisible')) div.classList.toggle('notVisible');\n    });\n  };\n\n  const celciusOrFahrenheit = (celciusData, fahrenheitData) =>\n    celciusOption.classList.contains('visible') ? celciusData : fahrenheitData;\n\n  const changeTempDisplays = (data) => {\n    const temp = `${Math.round(celciusOrFahrenheit(data.tempC, data.tempF))}°`;\n    document.getElementById('tempContent').textContent = temp;\n\n    const feelsLike = `Feels Like ${Math.round(celciusOrFahrenheit(data.feelsLikeC, data.feelsLikeF))}°`;\n    document.getElementById('feelsLikeContent').textContent = feelsLike;\n\n    const shortsOrPants = celciusOrFahrenheit(data.sentences.shortsOrPants.c, data.sentences.shortsOrPants.f);\n    document.getElementById('shortsOrPantsAnswerContent').textContent = shortsOrPants;\n\n    const shirtSweatshirtOrCoat = celciusOrFahrenheit(\n      data.sentences.shirtSweatshirtOrCoat.c,\n      data.sentences.shirtSweatshirtOrCoat.f,\n    );\n    document.getElementById('shirtSweatshirtOrCoatAnswerContent').textContent = shirtSweatshirtOrCoat;\n  };\n\n  const changeOtherDisplays = (data) => {\n    document.getElementById('cityContent').textContent = data.city;\n    document.getElementById('descriptionContent').textContent = data.description;\n    document.getElementById('whatElseAnswerContent').textContent = data.sentences.whatElse;\n  };\n\n  const showMainDivs = () => {\n    [mainInfoDiv, allSentencesDiv].forEach((div) => {\n      if (!div.classList.contains('visible')) div.classList.toggle('visible');\n      if (div.classList.contains('notVisible')) div.classList.toggle('notVisible');\n    });\n  };\n\n  const displayWeather = (data) => {\n    changeTempDisplays(data);\n    changeOtherDisplays(data);\n    showMainDivs();\n  };\n\n  const showOtherTemp = () => {\n    [celciusOption, fahrenheitOption].forEach((option) => {\n      option.classList.toggle('visible');\n      option.classList.toggle('notVisible');\n    });\n  };\n\n  const tempSwitch = (data) => {\n    showOtherTemp();\n    changeTempDisplays(data);\n  };\n\n  const switchModalOnOrOff = () => {\n    const errorModalBG = document.getElementById('errorModalBG');\n    errorModalBG.classList.toggle('visible');\n    errorModalBG.classList.toggle('notVisible');\n  };\n\n  const changeErrorMessage = (message) => {\n    document.getElementById('errorModalContent').textContent = message;\n  };\n\n  const displayError = (message) => {\n    changeErrorMessage(message);\n    switchModalOnOrOff();\n  };\n\n  return { hideMainDivs, displayWeather, tempSwitch, switchModalOnOrOff, displayError };\n})());\n\n\n//# sourceURL=webpack://weather-app/./src/dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./src/data.js\");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ \"./src/dom.js\");\n\n\n\n(() => {\n  let submittedOnce = false;\n  let currentData = null;\n\n  const searchEvent = () => {\n    const zipCodeForm = document.getElementById('zipCodeForm');\n    const zipCodeInput = document.getElementById('zipCodeInput');\n\n    zipCodeForm.addEventListener('submit', async (event) => {\n      event.preventDefault();\n      submittedOnce = true;\n      _dom__WEBPACK_IMPORTED_MODULE_1__.default.hideMainDivs();\n\n      const newZipCode = zipCodeInput.value;\n      zipCodeInput.value = '';\n\n      try {\n        currentData = await _data__WEBPACK_IMPORTED_MODULE_0__.default.getWeather(newZipCode);\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.displayWeather(currentData);\n      } catch (error) {\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.displayError('Please Enter A Valid US Zip Code');\n        _dom__WEBPACK_IMPORTED_MODULE_1__.default.displayWeather(currentData);\n      }\n    });\n  };\n\n  const switchUnitsEvent = () => {\n    document.getElementById('tempSwitchDiv').addEventListener('click', () => _dom__WEBPACK_IMPORTED_MODULE_1__.default.tempSwitch(currentData));\n  };\n\n  const exitModalEvent = () => {\n    document.getElementById('errorModalExitBtn').addEventListener('click', () => _dom__WEBPACK_IMPORTED_MODULE_1__.default.switchModalOnOrOff());\n  };\n\n  const getAndDisplayInitialWeather = async () => {\n    try {\n      const initialWeatherData = await _data__WEBPACK_IMPORTED_MODULE_0__.default.getWeather('10001');\n      currentData = initialWeatherData;\n      if (!submittedOnce) _dom__WEBPACK_IMPORTED_MODULE_1__.default.displayWeather(initialWeatherData);\n    } catch (error) {\n      _dom__WEBPACK_IMPORTED_MODULE_1__.default.displayError('The Weather App is Not Currently Working. Please Try Again Later.');\n    }\n  };\n\n  const init = () => {\n    searchEvent();\n    switchUnitsEvent();\n    exitModalEvent();\n    getAndDisplayInitialWeather();\n  };\n\n  init();\n})();\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

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