import City from "./city.js";
import { clearExistng,favoriteFinder,addData,paragraphAnimator} from "./loader.js";
import {mainContainer,cardsContainer, homeElm,allCitiesElm,searchCityElm,span,update } from "./loader.js";

function renderHome(currentLocation) {
   
    cardsContainer.className = 'cards-container';
    cardsContainer.style.border = "2px solid red";
    mainContainer.classList.remove('search-class');
    mainContainer.classList.remove('all-cities-class');
    mainContainer.classList.add('home-class');
    
    clearExistng();
    homeElm.className = "active";
    allCitiesElm.className = '';
    searchCityElm.className = '';
    favoriteFinder();
    addData(currentLocation);
    paragraphAnimator();
    let updatesHeading = document.createElement('h3');
    let updatesContainer = document.createElement('div');
    updatesContainer.className = 'updates-container';


    // appending
    mainContainer.appendChild(updatesHeading);
    mainContainer.appendChild(updatesContainer);
    updatesContainer.appendChild(span);
    updatesContainer.appendChild(update);

    updatesHeading.innerHTML = '<i class="fa-solid fa-turn-down" id="first-arrow"></i> Updates Across India <i class="fa-solid fa-turn-down"></i>';
    City.existingElements.push(updatesHeading, updatesContainer);
}
export default renderHome;
