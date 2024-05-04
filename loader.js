import City from './city.js';
import renderHome from './home.js';
import renderAllCities from './allCities.js';
import renderSearch from './renderSearch.js';
import citiesInList from './cities.js';

// creating common & assigning classes html elements
let mainContainer = document.createElement('div');
mainContainer.classList.add('main-container');
let h1 = document.createElement('h1');
h1.id = 'header-wt';
let ielm = document.createElement('i');
ielm.addEventListener("click", navBar);
ielm.className = "fa-solid fa-bars";
let slogan = document.createElement('p');
slogan.className = 'slogan';
let navBarElm = document.createElement('nav');
navBarElm.className = "nav-bar-elm";
let homeElm = document.createElement('a');
homeElm.addEventListener('click', () => { pageLoader('home'); });
let allCitiesElm = document.createElement('a');
allCitiesElm.addEventListener('click', () => { pageLoader('allCities'); });
let searchCityElm = document.createElement('a');
searchCityElm.addEventListener('click', () => { pageLoader('searchCity'); });
let cardsContainer = document.createElement('div');
cardsContainer.className = 'cards-container';
let update = document.createElement('p');
let span = document.createElement('img');

// Appending common structure
function appendStructrureCommon() {
    document.body.prepend(mainContainer);
    mainContainer.appendChild(h1);
    mainContainer.appendChild(ielm)
    mainContainer.appendChild(slogan);
    mainContainer.appendChild(navBarElm);
    navBarElm.append(homeElm);
    navBarElm.append(allCitiesElm);
    navBarElm.append(searchCityElm);
    mainContainer.appendChild(cardsContainer);

    // adding content
    h1.innerHTML = 'Weather Today';
    slogan.textContent = 'Haal Mausam Ka..!'
    homeElm.innerHTML = 'Home';
    allCitiesElm.innerHTML = 'All-Cities';
    searchCityElm.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i> City';
}
appendStructrureCommon();





// necessary control variables for rendering pages
let activePage = null;
let isHomeActive = false;
let isAllCitiesActive = false;
let isSearchActive = false;
let desiredPage = null;

const cityMap = new Map(); //for adding city as a object
let currentLocation = null;
(function () {
    if (localStorage.getItem('currentLocation')) {
        if (new Date().getTime() - JSON.parse(localStorage.getItem('currentLocation')).lastUpdated < 43200000) {
            currentLocation = JSON.parse(localStorage.getItem('currentLocation')).name;
            return currentLocation;
        };
    }
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let result = new City().getCity(`https://api.weatherapi.com/v1/current.json?key=cd9dceb1f60f453bae795717242504&q=${latitude},${longitude}&aqi=yes`);
            result.then((response) => {
                currentLocation = response.location.name + ", " + response.location.region;
                if (activePage === null) {
                    pageLoader("home", currentLocation);
                }
                localStorage.setItem('currentLocation', JSON.stringify({
                    name: currentLocation,
                    lastUpdated: new Date().getTime()
                }))
            });
        }, function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("User denied the request for Geolocation.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Location information is unavailable.");
                    break;
                case error.TIMEOUT:
                    console.error("The request to get user location timed out.");
                    break;
                case error.UNKNOWN_ERROR:
                    console.error("An unknown error occurred.");
                    break;
            }
        });
    } else {
        console.error("Geolocation is not supported in this browser.");
    }
})();

let cities;
function favoriteFinder() {
    if (localStorage.getItem('favoriteCity') && currentLocation) {
        let combinedArray = [currentLocation, localStorage.getItem('favoriteCity'), ...citiesInList];
        let unique = new Set(combinedArray);
        cities = Array.from(unique);
    } else if(localStorage.getItem('favoriteCity')){
        let combinedArray = [localStorage.getItem('favoriteCity'), ...citiesInList];
        let unique = new Set(combinedArray);
        cities = Array.from(unique);
    }else{
        cities = citiesInList;
    }
}
if (activePage === null && currentLocation) {
    favoriteFinder();
    let page = sessionStorage.getItem('activePage')?? 'home';
    pageLoader(page, currentLocation);
}
function pageLoader(page, cLocation) {
    if (page === 'home') {
        desiredPage = 'home';
        renderHome(cLocation??currentLocation);
        isAllCitiesActive = false;
        isSearchActive = false;
        isHomeActive = true;
        activePage = 'home';
        sessionStorage.setItem('activePage', activePage);
    } else if (page === 'allCities') {
        desiredPage = 'allCities';
        renderAllCities();
        isHomeActive = false;
        isSearchActive = false;
        isAllCitiesActive = true;
        activePage = 'allCities';
        sessionStorage.setItem('activePage', activePage);
    } else if (page === 'searchCity') {
        desiredPage = 'searchCity';
        renderSearch();
        isHomeActive = false;
        isAllCitiesActive = false;
        isSearchActive = true;
        activePage = 'searchCity';
        sessionStorage.setItem('activePage', activePage);
    }
}

let len;
function addData(currentLocation) {
    let firstCity = City.getFavorite() || "gopalganj, bihar";
    for (let city of cities) {
        cityMap.set(city, new City(city));
        let result = cityMap.get(city).getCity(`https://api.weatherapi.com/v1/current.json?key=cd9dceb1f60f453bae795717242504&q=${city}, India&aqi=yes`);
        result.then((response) => {
            if(firstCity === currentLocation?.toLowerCase()){
                if ((city.toLowerCase() === firstCity || city === 'Delhi, Delhi' || city === 'Mumbai, Maharashtra' || city === 'Chennai, Tamil Nadu') && desiredPage === 'home') {
                    cityMap.get(city).renderCard(response);
                }
            }else{
                if ((city.toLowerCase() === firstCity || city === 'Delhi, Delhi' || city === 'Mumbai, Maharashtra' || city.toLowerCase() === currentLocation?.toLowerCase()) && desiredPage === 'home') {
                    cityMap.get(city).renderCard(response);
                }
            }
            if (desiredPage === 'allCities') {
                cityMap.get(city).renderCard(response, 'all-cities');
            }

            cityMap.get(city).renderParagraphs(response);
        }).catch((err) => {
            console.log('something went wrong : ' + err);
        }).finally(() => {
            len = City.updateParagraphs.length;
        });
    }

}
// Necessary Utility functions & variables
function clearExistng() {
    for (let elm of City.existingElements) {
        elm.remove();
    }
    City.existingElements = [];
}

let navBarOpen = false;
function navBar() {
    let navbar = document.querySelector(".nav-bar-elm");
    let slogan = document.querySelector(".slogan");
    if (navBarOpen) {
        navbar.style.height = '0px';
        slogan.style.height = '40px';
        navBarOpen = false;
    } else {
        slogan.style.height = '0px';
        navbar.style.height = '40px';
        navBarOpen = true;
    }
}

//for changing paragraphs of updates on home page
let interval= null;
function paragraphAnimator() {
    let i = -1;
    function timer() {
        if (i < len - 1) {
            i++;
        } else {
            i = 0;
        }
        span.src = City.updateParagraphs[i].title;
        update.innerText = City.updateParagraphs[i].innerText;
    }
    if(interval){
        interval = setInterval(timer, 2000);
    }
}

export {
    // condition,
    // conditionIcon,
    cityMap
}

export {
    mainContainer,
    cardsContainer,
    span,
    update,
    allCitiesElm,
    homeElm,
    searchCityElm,
    currentLocation,
    clearExistng,
    favoriteFinder,
    addData,
    paragraphAnimator,
    interval
}
