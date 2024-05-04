// class
class City {
    static favoriteCity = localStorage.getItem('favoriteCity');
    static updateParagraphs = [];
    static existingElements = [];

    constructor(cityName, isFavourite) {
        this.city = cityName;
        this.isFavourite = isFavourite;
    }
    getCity = async (url) => {
        let response = await fetch(url);
        this.city = await response.json();
        return this.city;
    }
    static setFavorite = (city) => {
        this.favoriteCity = city;
        localStorage.setItem("favoriteCity", city);
    }
    static getFavorite = () => {
        return localStorage.getItem("favoriteCity")?.toLowerCase();
    }
    static removeFavourite = () => {
        if (localStorage.getItem('favoriteCity')) {
            City.favoriteCity = null;
            localStorage.removeItem("favoriteCity");
        } else {
            console.log('N/A', localStorage.getItem("favoriteCity"));
        }
    }
    renderParagraphs = async (city) => {
        if (city.location.name.includes("(")) {
            return;
        }
        let paragraph = document.createElement('p');
        paragraph.className = "paras";
        paragraph.title = city.current.condition.icon;
        paragraph.innerHTML = `The Weather of ${city.location.name} is ${city.current.condition.text} now`;
        City.updateParagraphs.push(paragraph);
    }
    renderCard = async (city, class_name = 'card') => {
        // checking for invaid cities
        if (city.location.name.includes("(")) {
            return;
        }

        let card = document.createElement('div');
        card.className = (class_name === 'all-cities') ? 'card' : class_name;
        let h2 = document.createElement('h2');
        let iconContainer = document.createElement('div');
        iconContainer.className = 'icon-container';
        let img = document.createElement('img');
        img.src = city.current.condition.icon;
        iconContainer.appendChild(img);
        let statusContainer = document.createElement('div');
        statusContainer.className = "status-container";
        let aqiContainer = document.createElement('div');
        let aqiHeading = document.createElement('h4');
        let aqiDisp = document.createElement('p');
        aqiDisp.innerHTML = `PM10: ${city.current.air_quality.pm10}`;
        let tempContainer = document.createElement('div');
        let tempHeading = document.createElement('h4');
        let tempDisp = document.createElement('p');
        let info = document.createElement('div');
        info.className = 'info';
        info.innerHTML = `The Weather of ${city.location.name} is ${city.current.condition.text} now`;

        //checking page for adding classes and Elements
        if (class_name === 'all-cities') {
            card.style.width = '30%';
        }
        // card elements appending
        card.appendChild(h2);
        h2.innerText = city.location.name;

        if (city.location.name.toLowerCase() + ", " + city.location.region.toLowerCase() === City.getFavorite()) {
            h2.innerHTML = `${city.location.name} &nbsp;<i class="fa-solid fa-star" id="fav" style="font-size: 20px;color:goldenrod"></i>`;
        }
       
        if (city.location.name.toLowerCase() + ", " + city.location.region.toLowerCase() === currentLocation.toLowerCase()) {
            console.log(currentLocation);
            h2.innerHTML = `${city.location.name} &nbsp;<i class="fa-solid fa-location-dot" style="font-size: 20px;color:blue"></i>`;
        }
        loaderAlert();
        checkWeatherAlert(city.location.name, city.current.condition.text);
        card.appendChild(iconContainer);
        card.appendChild(statusContainer);
        statusContainer.appendChild(aqiContainer);
        aqiContainer.appendChild(aqiHeading);
        aqiHeading.innerHTML = 'AQI';
        aqiContainer.appendChild(aqiDisp);
        statusContainer.appendChild(tempContainer);
        tempContainer.appendChild(tempHeading);
        tempHeading.innerHTML = 'Temperature &deg;';
        tempContainer.appendChild(tempDisp);
        tempDisp.innerHTML = city.current.temp_c;
        card.appendChild(info);
        cardsContainer.appendChild(card);

        City.existingElements.push(card);
    }

}

