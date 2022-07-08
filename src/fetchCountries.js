export function fetchCountries(nameCountry) {
  return fetch(
    `https://restcountries.com/v3.1/name/${nameCountry}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (response.ok) return response.json();
    else throw new Error('Oops, there is no country with that name');
  });
}
