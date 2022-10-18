let searchValue = document.querySelector('input');
const validityState = searchValue.validity;
submitButton = document.querySelector('.submit')
const d = new Date();
city = document.querySelector('.city')
country = document.querySelector('.country')
time = document.querySelector('.date')
temp = document.querySelector('.temp')
let searchResult = document.querySelector('main');
let imageResult = document.querySelector('.imageSlider');
let gif = document.querySelector('img');

function tempConverter(Kelvin) {
    return (Kelvin - 273.15).toPrecision(4) + "° C"
}
function getGif(response){
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=y0pcNokIMqnxGhsgQBgcbBACOG11VQvk&s=${response.weather[0].description}`, {mode: 'cors'})
    .then(function(gifObject){
        return gifObject.json();
    })
    .then(function(gifObject){
        console.log(gifObject)
        gif.src = gifObject.data.images.original.url;
    })
    .catch(function(error){
        console.log(error)
    })
}
function generateOutput(response) {
    city.textContent = "City : " + response.name;
    country.textContent = "Country : " + response.sys.country
    time.textContent = "Date : " + d.toLocaleDateString();
    temp.textContent = "Temperature : " + tempConverter(response.main.temp);
}
function checkInputValidity(){
    if (validityState.valueMissing) {
        searchValue.setCustomValidity('You gotta fill this out, yo!');
    }else{
        searchValue.setCustomValidity(''); //IMPORTANT to reset the validity message like this.
    }
}
submitButton.addEventListener('click',(event) => {
    checkInputValidity(); //Check Validity should be implemented here as the first step, and not as the else condition of the the following if condition. This is because setCustomValidity() method will cause checkValidity() method to return false.
    if(searchValue.checkValidity()){
        event.preventDefault();
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&appid=1333c570373880c9c466657806df0cf2`, {mode: 'cors'})
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            console.log(response);
            generateOutput(response);
            getGif(response);
            searchResult.style.display = 'flex';
            imageResult.style.display = 'flex';
          })
        .catch(function(err){
            console.log(err)
        });
    }
    // event.preventDefault();
})