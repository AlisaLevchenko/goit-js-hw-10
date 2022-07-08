import { debounce } from 'lodash';
import './css/styles.css';
import countryListTpl from './templates/countryList.hbs';
import countryCardTpl from './templates/countryCard.hbs';

import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const counrtryInfoCard = document.querySelector('.country-info');
const counrtryInfoList = document.querySelector('.country-list');

inputEl.addEventListener('input', debounce(OnSerch, DEBOUNCE_DELAY));

function OnSerch() {
  let serchingCountries = inputEl.value.trim();
  if (serchingCountries)
    fetchCountries(serchingCountries).then(countryList).catch(displayError);
}

function countryList(countries) {
  if (countries.length === 1) {
    countries[0].languages = Object.values(countries[0].languages).join(', ');
    const markup = countryCardTpl(countries[0]);
    counrtryInfoCard.innerHTML = markup;
    counrtryInfoList.innerHTML = '';
  } else if (countries.length > 1 && countries.length <= 10) {
    const markup = countryListTpl({ countries });
    counrtryInfoList.innerHTML = markup;
    counrtryInfoCard.innerHTML = '';
  } else
    Notify.info('Too many matches found. Please enter a more specific name.');
  return countries;
  // return countryCard(countries);
}

function displayError(error) {
  Notify.failure(error.message);
}
