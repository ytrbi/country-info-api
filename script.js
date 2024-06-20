'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();

    request.addEventListener('load', function () {
        if (this.status === 200) {
            const [data] = JSON.parse(this.responseText);
            console.log(data);

            const html = `
                <article class="country">
                    <img class="country__img" src="${data.flags.png}" />
                    <div class="country__data">
                        <h3 class="country__name">${data.name.common}</h3>
                        <h4 class="country__region">${data.region}</h4>
                        <p class="country__row"><span>👫</span>${(data.population / 1000000).toFixed(1)} million people</p>
                        <p class="country__row"><span>🗣️</span>${Object.values(data.languages).join(', ')}</p>
                        <p class="country__row"><span>💰</span>${Object.values(data.currencies)[0].name} (${Object.values(data.currencies)[0].symbol})</p>
                    </div>
                </article>
            `;

            countriesContainer.insertAdjacentHTML('beforeend', html);
            countriesContainer.style.opacity = 1;
        } else {
            console.error(`Error loading country data: ${this.status} - ${this.statusText}`);
        }
    });

    request.addEventListener('error', function () {
        console.error('Network error occurred');
    });
};

getCountryData('Saudi%20Arabia');
getCountryData('usa');
getCountryData('Argentina');
