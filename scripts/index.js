const api = {
    key: "64ed82577ced7f69cb1687f0ce536131",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    units: "metric"
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

search['button'].addEventListener('click', function() {
    searchResults(search['input'].value)
})

search.input.addEventListener('keypress', function(event) {
    key = event.keyCode
    if (key === 13) {
        searchResults(search['input'].value)
    }
})

function searchResults(city) {
    fetch(`${api.base}weather?q=${city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
}

function displayResults(weather) {
    console.log(weather)

    info.local.innerText = `${weather.name}, ${weather.sys.country}`;
    info.desc.innerText = weather.weather[0].description

    let now = new Date();
    info.date.innerText = dateBuilder(now);

    let iconName = weather.weather[0].icon;
    info.img.innerHTML = `<img src="./images/icons/${iconName}.png" alt="Ícone do clima">`
    
    temp.tempNow.innerHTML = Math.round(weather.main.temp)
    temp.tempLow.innerText = Math.round(weather.main.temp_min)
    temp.tempHigh.innerText = Math.round(weather.main.temp_max)
    temp.tempUnit.innerHTML = `°C`
    temp.humidity.innerText = `${weather.main.humidity} %`
}

function dateBuilder(d) {
    let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julio", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}
