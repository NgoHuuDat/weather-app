var search = document.querySelector('.search')
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var value = document.querySelector('.value')
var shortDesc = document.querySelector('.short-desc')
var visibility = document.querySelector('.visibility span')
var wind = document.querySelector('.wind span')
var sun = document.querySelector('.sun span')
var timer = document.querySelector('.timer')
var container = document.querySelector('.container')
var body = document.querySelector('body')

async function changeWeatherIU(capitalSearch){
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=193368a2c7f327dade0ba53e5ab4022d`
    let data = await fetch(apiURL).then(res=> res.json())
    if(data.cod == 200){
        container.classList.remove('hide')
        city.innerHTML = data.name
        country.innerHTML = data.sys.country
        visibility.innerHTML = data.visibility + '(m)'
        wind.innerHTML = data.wind.speed + '(m/s)'
        sun.innerHTML = data.main.humidity + '(%)'
        let temp = Math.round((data.main.temp - 271.15))
        value.innerHTML = temp + '°C'
        shortDesc.innerHTML = data.weather[0] ? data.weather[0].main : ''
        

        body.setAttribute('class','summer')
        if(temp <= 28){
            body.setAttribute('class','spring')
        }
        if(temp <= 23){
            body.setAttribute('class','autumn')
        }
        if(temp <= 19){
            body.setAttribute('class','winter')
        }
    }
    else{
        container.classList.add('hide')
    }
}

function SetDate(){
    timer.innerHTML = new Date().toLocaleString('vi');
    setTimeout("SetDate()",1000);
}

search.addEventListener('keypress',function(e){
    if(e.code === 'Enter' ){
        let capitalSearch = search.value.trim()
        changeWeatherIU(capitalSearch)
    }
})

changeWeatherIU('Hanoi');
SetDate();