import majorCities from './cities.js';
import districts from './districts.js';



function loader(currentLocation) {
    let combinedArray = [...majorCities, ...districts, currentLocation];
    let unique = new Set(combinedArray);
    let cities = Array.from(unique);
    let favoriteCt = localStorage.getItem("favoriteCity")?.toLowerCase();
    let input = document.querySelector('#search-input');
    let btn = document.querySelector('#search-btn');
    input.addEventListener('focus', () => { input.value = "" });
    input.addEventListener('keyup', filterResults);
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            btn.click();
            disp.innerHTML = '';
            input.value = '';
        }
    });

    btn.onclick = function () {
        disp.innerHTML = '';
    }
    let disp = document.querySelector('.result-container-search');

    function filterResults() {
        let resultArr = [];

        if (input.value.length) {
            resultArr = cities.filter((city) => {
                return city.toLowerCase().includes(input.value.toLowerCase());
            });
        }
        display(resultArr);
        if (!resultArr.length) {
            disp.innerHTML = '';
        }
    }
    function selectInput(city) {
        input.value = city.innerText;
        disp.innerHTML = '';
        btn.click();
    }
    function display(result) {
        let content = result.map((city) => {
            if (city.toLowerCase() === currentLocation.toLowerCase() && city.toLowerCase() === favoriteCt) {
                return "<li class='related-li'>" + city + `&nbsp;&nbsp;<i class="fa-solid fa-location-dot" style="font-size: 15px;color:blue"></i>&nbsp;&nbsp;<i class="fa-solid fa-star" id="fav" style="font-size: 15px;color:goldenrod"></i>` + "</li>";
            }

            if (city.toLowerCase() === favoriteCt) {
                console.log(favoriteCt);
                return "<li class='related-li'>" + city + `&nbsp;&nbsp;<i class="fa-solid fa-star" id="fav" style="font-size: 15px;color:goldenrod"></i>` + "</li>";
            }
            if (city.toLowerCase() === currentLocation.toLowerCase()) {
                console.log(currentLocation);
                return "<li class='related-li'>" + city + `&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-location-dot" style="font-size: 15px;color:blue"></i>` + "</li>";
            }
           
            return "<li class='related-li'>" + city + "</li>";
        });
        disp.innerHTML = `<ul>${content.join('')}</ul>`;
        let allItems = document.querySelectorAll('.related-li');
        allItems.forEach((li) => {
            li.addEventListener('click', (e) => {
                selectInput(e.target);
            })
        })
    }
}
export default loader;
