import {mainContainer,cardsContainer,allCitiesElm,homeElm,searchCityElm} from './loader.js';
import { clearExistng,addData } from './loader.js';
import City from './city.js';

function renderAllCities() {
    mainContainer.classList.remove('search-class');
    mainContainer.classList.remove('home-class');
    mainContainer.classList.add('all-cities-class');

    cardsContainer.className = 'cards-container';
    cardsContainer.style.border = "none";

    let backTotop = document.createElement('a');
    backTotop.className = 'back-to-top';
    backTotop.setAttribute("href", "#header-wt");
    backTotop.title = 'Back to top';
    backTotop.innerHTML = '<i class="fa-regular fa-circle-up"></i>';

    document.body.appendChild(backTotop);

    mainContainer.onscrollend = function (event) {
        backTotop.style.display = 'inline-block';
    }

    backTotop.onclick = function (event) {
        setTimeout(() => {
            backTotop.style.display = 'none';
        }, 200);
    }

    clearExistng();
    allCitiesElm.className = "active";
    homeElm.className = '';
    searchCityElm.className = '';
    addData();
    City.existingElements.push(backTotop);
}
export default renderAllCities;
