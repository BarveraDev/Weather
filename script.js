document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    let input = document.querySelector('#searchInput').value;

    if (input !== '') {
        show_warning('Carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&units=metric&lang=pt_br&appid=d06cdb298fafc83c520d5ab677fc477e`;
    
        let results = await fetch(url);
        let json = await results.json();


        if (json.code === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            show_warning('Não encontramos esta localização...');
        }
    }
});

function showInfo(json) {
    show_warning('');

    document.querySelector(".resultado").style.display = 'block';

    // document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    // document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    // document.querySelector('ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
}

function show_warning(msg) {
    document.querySelector(".aviso").innerHTML = msg;
}