searchValue = document.querySelector('input')
submitButton = document.querySelector('.submit')
const d = new Date();
city = document.querySelector('.city')
country = document.querySelector('.country')
time = document.querySelector('.date')
temp = document.querySelector('.temp')

function tempConverter(Kelvin) {
    return (Kelvin - 273.15).toPrecision(4) + "° C"
}

function generateOutput(response) {
    city.textContent = "City : " + response.name;
    country.textContent = "Country : " + response.sys.country
    time.textContent = "Date : " + d.toLocaleDateString();
    temp.textContent = "Temperature : " + tempConverter(response.main.temp);
}
submitButton.addEventListener('click',(event) => {
    event.preventDefault()
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&appid=1333c570373880c9c466657806df0cf2`, {mode: 'cors'})
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response);
        generateOutput(response);
      })
    .catch(function(err){
        console.log('error caught ', err)
    });
})