function pageLoader(page) {
    if (page === 'home') {
        desiredPage = 'home';
        renderHome();
        isAllCitiesActive = false;
        isSearchActive = false;
        isHomeActive = true;
        activePage = 'home';
    } else if (page === 'allCities') {
        desiredPage = 'allCities';
        renderAllCities();
        isHomeActive = false;
        isSearchActive = false;
        isAllCitiesActive = true;
        activePage = 'allCities';
    } else if (page === 'searchCity') {
        desiredPage = 'searchCity';
        renderSearch();
        isHomeActive = false;
        isAllCitiesActive = false;
        isSearchActive = true;
        activePage = 'searchCity';
    }
}