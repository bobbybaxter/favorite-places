const navButtons = document.getElementsByClassName('nav-item');
let places = [];

const printToDom = (divId, textToPrint) => {
  const selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML = textToPrint;
};

const cardSorter = (e) => {
  const navId = e.target.id;
  if (navId === 'default-btn') {
    places.sort((a,b) => (a.cityId > b.cityId) ? 1: -1);
  } else if (navId === 'city-btn') {
    places.sort((a,b) => (a.cityName > b.cityName) ? 1: -1);
  } else if (navId === 'state-btn') {
    places.sort((a,b) => (a.cityState > b.cityState) ? 1: -1);
  };
  domStringBuilder();
};

const domStringBuilder = (city) => {
  let domString = '';
  places.forEach((city) => {
    domString += `<div class="card">`
    domString += `  <img src="${city.cityImage}" class="card-img-top" alt="image of ${city.cityName}">`
    domString += `  <div class="card-body p-1 m-1">`
    domString += `    <h5 class="card-title">${city.cityName}, ${city.cityState}</h5>`
    domString += `    <table class="table table-sm table-borderless my-2 mx-0 p-0">`
    domString += `      <tbody>`
    domString += `        <tr>`
    domString += `          <th width="50%" scope="row" >Best Restaurant</th>`
    domString += `          <td>${city.favoriteRestaurant}</tr>`
    domString += `        </tr>`
    domString += `        <tr>`
    domString += `          <th width="50%" scope="row">Best Bar</th>`
    domString += `          <td>${city.favoriteBar}</tr>`
    domString += `        </tr>`
    domString += `        <tr>`
    domString += `          <th width="50%" scope="row">Best Hotel</th>`
    domString += `          <td>${city.favoriteHotel}</tr>`
    domString += `        </tr>`
    domString += `        <tr>`
    domString += `          <th width="50%" scope="row">Best Attraction</th>`
    domString += `          <td>${city.favoriteTouristAttraction}</tr>`
    domString += `        </tr>`
    domString += `      </tbody>`
    domString += `    </table>`
    domString += `  </div>`
    domString += `</div>`
  });
  printToDom('city-cards', domString);
};

function loadSuccess(){
  const data = JSON.parse(this.responseText);
  places = data.places;
  domStringBuilder(places);
;};

function loadFailure(){
  console.error('doh!');
};

const getPlacesData = () => {
  const myRequest = new XMLHttpRequest();
  myRequest.addEventListener('load', loadSuccess);
  myRequest.addEventListener('error', loadFailure);
  myRequest.open('GET', './db/places.json');
  myRequest.send();
};

const eventListeners = () => {
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].addEventListener('click', cardSorter);
  };
};

const init = () => {
  getPlacesData();
  eventListeners();
};

init();