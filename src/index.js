import './css/styles.css';
import { fetchCountries, failureMes } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  inputEl: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputEl.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function infoMes() {
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function clearPage() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function onInput(e) {
  e.preventDefault();
  clearPage();
  const dataInput = refs.inputEl.value;

  if (!dataInput) {
    return;
  }
  fetchCountries(dataInput)
    .then(quantityCheck)
    .catch(error => {
      failureMes();
    });
}

function quantityCheck(response) {
  if (response.length > 10) {
    infoMes();
    return;
  }
  if ((response.length < 10) & (response.length > 2)) {
    renderSeveralCountries(response);
    return;
  }
  if ((response.length = 1)) {
    renderCountry(response);
  }
}

function renderSeveralCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li class="country-item">
      <img class="country-image" src="${country.flags.png}" alt="${country.name.official}" />
      <p class="country-name">${country.name.common}</p>
    </li>`;
    })
    .join('');
  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function renderCountry(country) {
  const markup = `<li class="country-item">
    <img class="country-image" src="${country[0].flags.png}" alt="${country[0].name.official}" />
    <p class="country-name" style="font-size:30px"}"><b>${country[0].name.official}</b></p>
  </li>`;
  const countryInfo = `
    <p class="country-info__item"><b>Capital: </b>${country[0].capital[0]}</p>
    <p class="country-info__item"><b>Population: </b>${
      country[0].population
    }</p>
    <p class="country-info__item"><b>Languages: </b>${Object.values(
      country[0].languages
    )}</p>
  `;

  refs.countryList.insertAdjacentHTML('beforeend', markup);
  refs.countryInfo.insertAdjacentHTML('beforeend', countryInfo);
}
