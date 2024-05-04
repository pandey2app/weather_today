import { mainContainer, cardsContainer, homeElm, allCitiesElm, searchCityElm } from "./loader.js";
import { clearExistng } from "./loader.js";
import { cityMap, currentLocation } from "./loader.js";
import loader from "./search.js";
import { loaderAlert, checkWeatherAlert } from "./alert.js";
import City from "./city.js";

function renderSearch() {
    // adding search.js dynamically
    let script = document.createElement('script');
    script.src = './search.js';
    script.type = 'module';
    document.body.append(script);

    let alertScript = document.createElement('script');
    alertScript.src = './alert.js';
    alertScript.type = 'module';
    document.body.append(alertScript);

    mainContainer.classList.remove('all-cities-class');
    mainContainer.classList.remove('home-class');
    mainContainer.classList.add('search-class');
    cardsContainer.style.border = "2px solid red";

    clearExistng();
    allCitiesElm.className = "";
    homeElm.className = '';
    searchCityElm.className = 'active';
    cardsContainer.className = 'cards-container search-page-container';

    let parentContainerSearch = document.createElement('div');
    parentContainerSearch.className = 'parent-container-search';
    let searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    let resultContainerSearch = document.createElement('div');
    resultContainerSearch.className = 'result-container-search';

    let input = document.createElement('input');
    input.id = 'search-input';
    input.name = 'search-input';
    input.value = City.getFavorite() || currentLocation || 'Gopalganj';
    input.autocomplete = 'off';
    input.placeholder = 'Search Your City Here'
    let button = document.createElement('button');
    button.id = 'search-btn';
    button.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';
    let headingContainer = document.createElement('div');
    headingContainer.className = 'heading-container';
    let cityHeading = document.createElement('h2');
    cityHeading.innerHTML = `City (State) Country`;
    let favspan = document.createElement('button');
    favspan.className = 'fav-span';


    let card = document.createElement('div');
    card.className = 'card card-search';
    let iconContainer = document.createElement('div');
    iconContainer.className = 'icon-container';
    let img = document.createElement('img');

    iconContainer.appendChild(img);
    let statusContainer = document.createElement('div');
    statusContainer.className = "status-container";
    let humidityContainer = document.createElement('div');
    let humidityHeading = document.createElement('h4');
    let humidityDisp = document.createElement('p');

    let tempContainer = document.createElement('div');
    let tempHeading = document.createElement('h4');
    let tempDisp = document.createElement('p');
    let info = document.createElement('div');
    info.className = 'info';
    let box1 = document.createElement('div');
    let box2 = document.createElement('div');

    let farhenhiet = document.createElement('p');
    let feelsLike_f = document.createElement('p');
    let feelsLike_c = document.createElement('p');
    let windSpeed = document.createElement('p');
    let windDir = document.createElement('p');
    let weatherCondition = document.createElement('p');

    let co = document.createElement('p');
    let no2 = document.createElement('p');
    let o3 = document.createElement('p');
    let so2 = document.createElement('p');
    let pm2_5 = document.createElement('p');
    let pm10 = document.createElement('p');

    // appending
    parentContainerSearch.appendChild(searchContainer);
    searchContainer.appendChild(input);
    searchContainer.appendChild(button);
    parentContainerSearch.appendChild(resultContainerSearch);
    cardsContainer.appendChild(parentContainerSearch);
    cardsContainer.appendChild(headingContainer);

    headingContainer.appendChild(cityHeading);
    headingContainer.appendChild(favspan);

    card.appendChild(iconContainer);
    card.appendChild(statusContainer);
    statusContainer.appendChild(humidityContainer);
    humidityContainer.appendChild(humidityHeading);
    humidityHeading.innerHTML = 'Humidity';
    humidityContainer.appendChild(humidityDisp);
    statusContainer.appendChild(tempContainer);
    tempContainer.appendChild(tempHeading);
    tempHeading.innerHTML = 'Temperature &deg;';
    tempContainer.appendChild(tempDisp);

    card.appendChild(info);
    info.appendChild(box1);
    box1.appendChild(farhenhiet);
    box1.appendChild(feelsLike_f);
    box1.appendChild(feelsLike_c);
    box1.appendChild(windSpeed);
    box1.appendChild(windDir);
    box1.appendChild(weatherCondition);

    info.appendChild(box2);
    box2.appendChild(co);
    box2.appendChild(no2);
    box2.appendChild(o3);
    box2.appendChild(so2);
    box2.appendChild(pm2_5);
    box2.appendChild(pm10);

    cardsContainer.appendChild(card);
    button.addEventListener('click', (e) => {
        if (input.value) {
            updateData()
            e.stopPropagation();
        }
    });
    loader();
    loaderAlert();
    function updateData() {
        let city;
        if (!input.value) {
            alert('Please Enter a valid city name');
            return;
        } else {
            if (input.value.toLowerCase().includes('india')) {
                city = input.value;
            } else {
                city = input.value + ", India";
            }
        }

        cityMap.set(city, new City(city));

        let result = cityMap.get(city).getCity(`https://api.weatherapi.com/v1/current.json?key=cd9dceb1f60f453bae795717242504&q=${city}, India&aqi=yes`);
        result.then((response) => {
            if (response.location.name.includes('(') || response.location.country !== "India") {
                alert('Write city name correctly, only Indian Cities accepted');
                return;
            }

            if (response.location.region.length > 15) {
                cityHeading.innerText = `${response.location.name} (${response.location.region.split(" ")[0]})`;
            } else {
                cityHeading.innerText = `${response.location.name} (${response.location.region})`;
            }
            if (response.location.name.toLowerCase() + ", " + response.location.region.toLowerCase() === City.getFavorite()) {
                // set fav icon and title
                favspan.innerHTML = '<i class="fa-solid fa-star" id="fav"></i>';
                favspan.title = 'Remove from Favourite';
                favspan.onclick = function () {
                    City.removeFavourite();
                    favspan.innerHTML = '<i class="fa-regular fa-star" id="fav"></i>';
                    favspan.title = 'Add to Favourite';
                }
            } else {
                // remove fav icon and title
                favspan.innerHTML = '<i class="fa-regular fa-star" id="fav"></i>';
                favspan.title = 'Add to Favourite';
                favspan.onclick = function () {
                    City.setFavorite(response.location.name + ", " + response.location.region);
                    favspan.innerHTML = '<i class="fa-solid fa-star" id="fav"></i>';
                    favspan.title = 'Remove from Favourite';
                }
            }

            if (response.location.name + ', ' + response.location.region === currentLocation) {
                if (response.location.region.length > 15) {
                    cityHeading.innerHTML = `${response.location.name} (${response.location.region.split(" ")[0]})&nbsp;<i class="fa-solid fa-location-dot" style="font-size: 30px;color:blue"></i>`;
                } else {
                    cityHeading.innerHTML = `${response.location.name} (${response.location.region})&nbsp;<i class="fa-solid fa-location-dot" style="font-size: 30px;color:blue"></i>`;
                }

            }

            checkWeatherAlert(response.location.name, response.current.condition.text);
            humidityDisp.innerText = response.current.humidity;
            tempDisp.innerText = response.current.temp_c;
            img.src = response.current.condition.icon;
            farhenhiet.innerHTML = `Temperature-F &nbsp;: ${response.current.temp_f}`;
            feelsLike_f.innerHTML = `FeelsLike-F &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${response.current.feelslike_f}`;
            feelsLike_c.innerHTML = `FeelsLike-C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${response.current.feelslike_c}`;
            windSpeed.innerHTML = `Wind speed &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${response.current.wind_kph}`;
            windDir.innerHTML = `Wind direction : ${response.current.wind_dir}`;
            weatherCondition.innerHTML = `Weather is&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${response.current.condition.text}`;
            co.innerHTML = `AQI (Co) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${response.current.air_quality.co}`;
            no2.innerHTML = `AQI (No<sub>2</sub>) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${response.current.air_quality.no2}`;
            o3.innerHTML = `AQI (O<sub>3</sub>) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${response.current.air_quality.o3}`;
            so2.innerHTML = `AQI (So<sub>2</sub>) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${response.current.air_quality.so2}`;
            pm2_5.innerHTML = `AQI (PM 2.5) &nbsp;: ${response.current.air_quality.pm2_5}`;
            pm10.innerHTML = `AQI (PM 10) &nbsp;&nbsp;: ${response.current.air_quality.pm10}`;
        });

    }
    updateData();
    City.existingElements.push(searchContainer, parentContainerSearch, headingContainer, card, script, alertScript);
}

export default renderSearch;
