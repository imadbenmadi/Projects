/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Contact_page.js":
/*!*****************************!*\
  !*** ./src/Contact_page.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contact_page: () => (/* binding */ contact_page)
/* harmony export */ });
function contact_page() {
    let contact_page = document.createElement("div")
    contact_page.classList.add("contact_page")
     
    let section_title = document.createElement("div")
    section_title.classList.add("section_title")
    section_title.textContent = "Contact Us"

    let phone_number = document.createElement("div")
    phone_number.classList.add("phone_number")
    phone_number.textContent = "0657653349"

    contact_page.appendChild(section_title)
    contact_page.appendChild(phone_number)
    document.querySelector("#content").appendChild(contact_page)
    return contact_page;
}



/***/ }),

/***/ "./src/Menu_page.js":
/*!**************************!*\
  !*** ./src/Menu_page.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Menu_page: () => (/* binding */ Menu_page)
/* harmony export */ });
function Menu_page() {
    let container = document.querySelector(".container")
    let menu_page = document.createElement("div")
    menu_page.classList.add("menu_page")
    
    let menu_page_title = document.createElement("div")
    menu_page_title.classList.add("section_title")
    menu_page_title.textContent = "Menu"
    menu_page.appendChild(menu_page_title)

    let Menu_select = document.createElement("div")
    Menu_select.classList.add("Menu_select")
    menu_page.appendChild(Menu_select)

    let Pizza_elements = document.createElement("div")
    Pizza_elements.classList.add("Pizza_elements")
    
    
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_1.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_2.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_3.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_4.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_5.jpg")
    create_pizza_element(Pizza_elements , "Logo/Pizza_elements/pizza_element_6.jpg")

    
    menu_page.appendChild(Pizza_elements)
    container.appendChild(menu_page)

    return menu_page;
}


function create_pizza_element(root,src) {
    let Pizza_element = document.createElement("div")
    Pizza_element.classList.add("Pizza_element")
    Pizza_element.classList.add("flex_center")
    let pizza_img = document.createElement("img")
    pizza_img.setAttribute("src", src)
    Pizza_element.appendChild(pizza_img)
    root.appendChild(Pizza_element)

    
}

/***/ }),

/***/ "./src/create_bar.js":
/*!***************************!*\
  !*** ./src/create_bar.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_bar_element: () => (/* binding */ create_bar_element)
/* harmony export */ });
function create_bar_element() {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.classList.add("flex_center");
    
    let home_page_btn = document.createElement("div");
    let Menu_page_btn = document.createElement("div");
    let Contact_page_btn = document.createElement("div");
    
    home_page_btn.classList.add("home_page_btn");
    Menu_page_btn.classList.add("Menu_page_btn");
    Contact_page_btn.classList.add("Contact_page_btn");
    
    home_page_btn.setAttribute("data-target","home_page_element")
    Menu_page_btn.setAttribute("data-target","Menu_page_element")
    Contact_page_btn.setAttribute("data-target","contact_page_element")

    home_page_btn.textContent = "Home"
    Menu_page_btn.textContent = "Menu"
    Contact_page_btn.textContent = "Contact"

    bar.appendChild(home_page_btn);
    bar.appendChild(Menu_page_btn);
    bar.appendChild(Contact_page_btn);
    
    document.querySelector("#content").appendChild(bar);
    return bar;
}


/***/ }),

/***/ "./src/create_container.js":
/*!*********************************!*\
  !*** ./src/create_container.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create_container: () => (/* binding */ create_container)
/* harmony export */ });
function create_container() {
    let root = document.querySelector("#content")
    let container = document.createElement("div")
    container.classList.add("container")
    root.appendChild(container)
    return container;
}

/***/ }),

/***/ "./src/home_page.js":
/*!**************************!*\
  !*** ./src/home_page.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   home_page: () => (/* binding */ home_page)
/* harmony export */ });
function home_page() {
    let container = document.querySelector(".container")
    
    let home_page = document.createElement("div")
    home_page.classList.add("home_page")

    let home_page_images = document.createElement("div")
    home_page_images.classList.add("home_page_images")
    home_page_images.classList.add("flex_center")
    

    let pizza_img = document.createElement("img")
    pizza_img.classList.add("pizza_img")
    pizza_img.setAttribute("src", "Logo/pizza.png")


    let chef_img = document.createElement("img")
    chef_img.classList.add("chef_img")
    chef_img.setAttribute("src", "Logo/chef.png")
    
    home_page_images.appendChild(pizza_img)
    home_page_images.appendChild(chef_img)

    let home_page_description = document.createElement("div")
    home_page_description.classList.add("home_page_description")

    let home_page_description_1 = document.createElement("div")
    home_page_description_1.classList.add("home_page_description_1")
    home_page_description_1.textContent = "PIZZZA"
    let home_page_description_2 = document.createElement("div")
    home_page_description_2.classList.add("home_page_description_2")
    home_page_description_2.textContent = "BOSS"

    home_page_description.appendChild(home_page_description_1)
    home_page_description.appendChild(home_page_description_2)
    
    home_page.appendChild(home_page_images)
    home_page.appendChild(home_page_description)
    container.appendChild(home_page)

    return home_page;
}


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _create_bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create_bar */ "./src/create_bar.js");
/* harmony import */ var _create_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create_container */ "./src/create_container.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home_page */ "./src/home_page.js");
/* harmony import */ var _Menu_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Menu_page */ "./src/Menu_page.js");
/* harmony import */ var _Contact_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Contact_page */ "./src/Contact_page.js");





let nav_bar_element = (0,_create_bar__WEBPACK_IMPORTED_MODULE_0__.create_bar_element)()
let container = (0,_create_container__WEBPACK_IMPORTED_MODULE_1__.create_container)()
let home_page_element = (0,_home_page__WEBPACK_IMPORTED_MODULE_2__.home_page)()
let Menu_page_element = (0,_Menu_page__WEBPACK_IMPORTED_MODULE_3__.Menu_page)()
let contact_page_element = (0,_Contact_page__WEBPACK_IMPORTED_MODULE_4__.contact_page)()


Menu_page_element.style.display = "none"
contact_page_element.style.display = "none";


let nav_bar_elements = nav_bar_element.querySelectorAll("div") 
console.log(nav_bar_elements);


nav_bar_elements.forEach((btn) => {
    btn.addEventListener("click", () => {
        changeSection(btn.getAttribute("data-target"))
    })
})

function changeSection(target) {
    home_page_element.style.display = "none"
    Menu_page_element.style.display = "none"
    contact_page_element.style.display = "none"
    if (target == "home_page_element")
        home_page_element.style.display = "block"
    if (target == "Menu_page_element")
        Menu_page_element.style.display = "block"
    if (target == "contact_page_element")
        contact_page_element.style.display = "block"
        
}
})();

/******/ })()
;
//# sourceMappingURL=main.js.map