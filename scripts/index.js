const api = {
    key: '64ed82577ced7f69cb1687f0ce536131',
    base: 'https://api.openweathermap.org/data/2.5/',
    lang: 'pt_br',
    units: 'metric'
}

const search = {
    input: document.querySelector('.searchInput'),
    button: document.querySelector('.searchButton')
}

const info = {
    local: document.querySelector('.local'),
    date: document.querySelector('.date'),
    img: document.querySelector('.imgBox'),
    desc: document.querySelector('.description')
}

const temp = {
    tempNow: document.querySelector('.temp-now'),
    tempLow: document.querySelector('.temp-low'),
    tempHigh: document.querySelector('.temp-high'),
    tempUnit: document.querySelector('.temp-unit'),
    humidity: document.querySelector('.humidity')
}

const unit = {
    unitMetric: document.getElementById('metric'),
    unitImperial: document.getElementById('imperial')
}

unit.unitMetric.addEventListener('click', changeFahrenheitToCelsius)
unit.unitImperial.addEventListener('click', changeCelsiusToFahrenheit)

search.button.addEventListener('click', function() {
    searchResults(search.input.value)
})

search.input.addEventListener('keypress', function(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(search.input.value)
    }
})

function searchResults(city) {
    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json()
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        })
}

function displayResults(weather) {
    console.log(weather)

    info.local.innerText = `${weather.name}, ${weather.sys.country}`
    info.desc.innerText = weather.weather[0].description

    let now = new Date()
    info.date.innerText = dateBuilder(now)

    weatherImage(weather)
    
    temp.tempNow.innerHTML = Math.round(weather.main.temp)
    temp.tempLow.innerText = Math.round(weather.main.temp_min)
    temp.tempHigh.innerText = Math.round(weather.main.temp_max)
    unit.unitMetric.checked ? temp.tempUnit.innerHTML = `°C` : temp.tempUnit.innerHTML = `°F`
    temp.humidity.innerText = `${weather.main.humidity} %`
}

function dateBuilder(d) {
    let days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julio', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    let phrase = `${day}, ${date} ${month} ${year}`

    return phrase
}

function weatherImage(weather)
{
    let author = document.querySelector('.bg-author')
    
    let iconName = weather.weather[0].icon
    info.img.innerHTML = `<img src='./images/icons/${iconName}.png' alt='Ícone do clima'>`
    
    if (iconName == '01d' || iconName == '02d')
    {
        document.body.style.backgroundImage = 'url(../images/bg-sunny.jpg)'
        author.innerHTML = `<a href="https://www.pexels.com/pt-br/foto/veiculo-na-estrada-durante-o-por-do-sol-59516/" target="_blank" rel="external">Foto de Josh Sorenson no Pexels</a>`
    }
    else if (iconName == '01n' || iconName == '02n')
    {
        document.body.style.backgroundImage = 'url(../images/bg-evening.jpg)'
        author.innerHTML = `<a href="https://www.pexels.com/pt-br/foto/fotografia-de-lampadas-de-rua-ligadas-ao-lado-da-baia-durante-a-noite-771883/" target="_blank" rel="external">Foto de Reynaldo Brigantty no Pexels</a>`
    }
    else if (iconName == '03d' || iconName == '03n' || iconName == '04d' || iconName == '04n')
    {
        document.body.style.backgroundImage = 'url(../images/bg-cloud.jpg)'
        author.innerHTML = `<a href="https://www.pexels.com/pt-br/foto/praia-litoral-calcadao-ceu-nublado-6762037/" target="_blank" rel="external">Foto de Rachel Claire no Pexels</a>`
    }
    else if (iconName == '09d' || iconName == '09n' || iconName == '10d' || iconName == '11n')
    {
        document.body.style.backgroundImage = 'url(../images/bg-rain.jpg)'
        author.innerHTML = `<a href="https://www.pexels.com/pt-br/foto/agua-de-orvalho-em-painel-de-vidro-transparente-125510/" target="_blank" rel="external">Foto de Kaique Rocha no Pexels</a>`
    }
    else if (iconName == '11d' || iconName == '11n')
    {
        document.body.style.backgroundImage = 'url(../images/bg-lightning.jpg)'
        author.innerHTML = `<a href="https://www.pexels.com/pt-br/foto/clima-nuvens-ceu-nublado-perigoso-9563370/" target="_blank" rel="external">Foto de Nikolett Emmert no Pexels</a>`
    }
    else if (iconName == '13d' || iconName == '13n')
    {
        document.body.style.backgroundImage = 'url(../images/bg-snowing.jpg)'
        author.innerHTML = `<a href="https://www.pexels.com/pt-br/foto/foto-de-snowy-field-3462588/" target="_blank" rel="external">Foto de Simon Berger no Pexels</a>`
    }
    else if (iconName == '50d' || iconName == '50n')
    {
        document.body.style.backgroundImage = 'url(../images/bg-fog.jpg)'
        author.innerHTML = `<a href="https://www.pexels.com/pt-br/foto/nebuloso-enevoado-floresta-selva-8647910/" target="_blank" rel="external">Foto de Роман Микрюков no Pexels</a>`
    }
}

function changeFahrenheitToCelsius()
{
    unit.unitMetric.checked ? api.units = 'metric' : api.units = 'imperial'
    
    if (temp.tempUnit.outerText == '°F')
    {
        temp.tempUnit.innerHTML = '°C'
        temp.tempNow.innerHTML = calcFahrenheitToCelsius(temp.tempNow.outerText)
        temp.tempLow.innerHTML = calcFahrenheitToCelsius(temp.tempLow.outerText)
        temp.tempHigh.innerHTML = calcFahrenheitToCelsius(temp.tempHigh.outerText)
    }
}

function changeCelsiusToFahrenheit()
{
    unit.unitMetric.checked ? api.units = 'metric' : api.units = 'imperial'

    if (temp.tempUnit.outerText == '°C')
    {
        temp.tempUnit.innerHTML = '°F'
        temp.tempNow.innerHTML = calcCelsiusToFahrenheit(temp.tempNow.outerText)
        temp.tempLow.innerHTML = calcCelsiusToFahrenheit(temp.tempLow.outerText)
        temp.tempHigh.innerHTML = calcCelsiusToFahrenheit(temp.tempHigh.outerText)
    }
}

function calcFahrenheitToCelsius(temp)
{
    newTemp = Math.round((temp - 32) / 1.8)
    return newTemp
}

function calcCelsiusToFahrenheit(temp)
{
    newTemp = Math.round((temp * 1.8) + 32)
    return newTemp
}
