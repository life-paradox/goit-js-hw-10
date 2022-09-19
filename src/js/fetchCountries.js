import Notiflix from 'notiflix';

export function failureMes() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

export function fetchCountries(dataInput) {
  return fetch(
    `https://restcountries.com/v3.1/name/${dataInput.trim()}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      failureMes();
      return;
    }
    return response.json();
  });
}
