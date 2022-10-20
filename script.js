let searchValue = document.querySelector('input');
const validityState = searchValue.validity;
submitButton = document.querySelector('.submit')
const d = new Date();
city = document.querySelector('.city')
country = document.querySelector('.country')
time = document.querySelector('.date')
temp = document.querySelector('.temp')
let tempVar;
let searchResult = document.querySelector('main');
let imageResult = document.querySelector('.imageSlider');
let gif = document.querySelector('img');
let currentIndex = 0;
let card = document.querySelector('.card');
let imageArray = [];
let randomArray = [];
let button = document.querySelector('input[type=checkbox]')

function tempConverter(Kelvin,unit) {
    return (Kelvin - 273.15).toPrecision(4) + unit;
}
function getGif(response){
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=y0pcNokIMqnxGhsgQBgcbBACOG11VQvk&s=${response.weather[0].description}`, {mode: 'cors'})
    .then(function(gifObject){
        return gifObject.json();
    })
    .then(function(gifObject){
        // console.log(gifObject)
        // body_element.style.backgroundImage = "url(" + gifObject.data.images.original.url + ")," + "linear-gradient(to bottom, #323232 0%, #3F3F3F 40%, #1C1C1C 150%), linear-gradient(to top, rgba(255,255,255,0.40) 0%, rgba(0,0,0,0.25) 200%)";
        gif.src = gifObject.data.images.original.url;
    })
    .catch(function(error){
        console.log(error)
    })
}
function generateOutput(response) {
    tempVar = response.main.temp;
    city.textContent = "City : " + response.name;
    country.textContent = "Country : " + response.sys.country
    time.textContent = "Date : " + d.toLocaleDateString();
    temp.textContent = "Temperature : " + tempConverter(response.main.temp, "° C");
}
button.addEventListener('click',(e) => {
    if(button.checked){
        temp.textContent = "Temperature : " + tempVar + "° K";
    }else{
        temp.textContent = "Temperature : " + tempConverter(tempVar, "° C");
    }
})
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
        imageArray.length = 0;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue.value}&appid=1333c570373880c9c466657806df0cf2`, {mode: 'cors'})
        .then(function(response) {
            return response.json()
        })
        .then(function(response) {
            // console.log(response);
            generateOutput(response);
            getGif(response);
            searchResult.style.display = 'flex';
            imageResult.style.display = 'flex';
          })
        .catch(function(err){
            console.log(err)
        });
        fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchValue.value}&client_id=4PaEJLsDd64uBJjzyiXqKWMhZHdqhfwcF6Ir9hyS6bg`)
        .then(function(response){
            return response.json();
        })
        .then(function(response){
            //console.log(response);
            response.results.forEach((result)=>{
                imageArray.push(result.urls.small)
            })
            randomArray = randomIndex();
            slide();
        })
    }
    // event.preventDefault();
})
function randomIndex(){
    // let randomIndex = Math.floor(Math.random() * (imageArray.length-1));
    const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}
function slide(){
    if(Math.abs(currentIndex%3) === 0){
        card.src = randomArray[0];
    }else if(Math.abs(currentIndex%3) === 1){
        card.src = randomArray[1];
    }else{
        card.src = randomArray[2];
    }
}
function leftClick(){
    currentIndex -= 1;
    slide();
    //console.log(randomArray);
    //console.log(currentIndex%3)
}
function rightClick(){
    currentIndex += 1;
    slide();
}
function left(){
    card.src = randomArray[2];
}
function right(){
    card.src = randomArray[1];
}
function middle(){
    card.src = randomArray[0];
}