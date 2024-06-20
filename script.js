'use strict';

const bg = document.querySelector('.bg');
const loadText = document.querySelector('.loading');
const countriesContainer = document.querySelector('.countries');

// Loading effect variables
let load = 0;
let int = setInterval(blurring, 30);

// Function to update loading effect and blur background
function blurring() {
    load++;
    if (load > 99) {
        clearInterval(int);
        setTimeout(() => {
            loadText.style.display = 'none'; 
            countriesContainer.style.opacity = 1; 
            revealCountries();
        }, 500); 
    }
    loadText.textContent = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

// Function to scale values
function scale(num, in_min, in_max, out_min, out_max) {
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

// Function to fetch and display country data
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
            revealCountries(); // Call function to reveal countries after they are added
        } else {
            console.error(`Error loading country data: ${this.status} - ${this.statusText}`);
        }
    });

    request.addEventListener('error', function () {
        console.error('Network error occurred');
    });
};

// Function to reveal countries after they are all loaded
function revealCountries() {
    const countries = document.querySelectorAll('.country');
    countries.forEach((country, index) => {
        setTimeout(() => {
            country.style.opacity = 1;
        }, index * 100);
    });
}


getCountryData('Saudi%20Arabia');
getCountryData('usa');
getCountryData('Argentina');
