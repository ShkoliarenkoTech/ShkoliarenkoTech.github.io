const capitals = document.getElementById('capitals');
const capitals_result = document.getElementById('capitals__result');
const capitals_result_2 = document.getElementById('capitals__result-2');
const capitals_btn = document.getElementById('capitals__btn');

capitals_btn.addEventListener('click', getCapitals);

let counter = 0;
let quantity = 0;

function getCapitals() {
    fetch("https://restcountries.com/v3.1/region/europe")
        .then(resolve => resolve.json())
        .then(data => {
            data.forEach(country => {
                counter = counter + 1;
            });
            console.log('counter', counter);
            quantity = counter;
            counter = 0;
            data.forEach(country => {
                let elem = document.createElement("li");
                counter = counter + 1;
                if (counter < ((quantity / 2) + 1)) {
                    elem.innerText = `${country.capital[0]}`;
                    capitals_result.appendChild(elem);
                }
                else {
                    elem.innerText = `${country.capital[0]}`;
                    capitals_result_2.appendChild(elem);
                }
            });
        })
}

