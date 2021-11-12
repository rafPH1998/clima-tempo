document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=4331ee2adfd28dd1104fba5ee2e4d1a1&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg 
            });
        } else {
            clearInfo();
            showWarning('Localização não encontrada!');
        }

    }  
});

function showInfo(json) {
    showWarning('');
    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}


//2 passo = pegar o valor digitado no campo de busca
//3 passo = verificar se o cara digitou alguma coisa 
// 4 passo = se tiver algo digitado, mostra para o usuario que ta (carregando)
// 5 passo = montar a API dando um encode na URL(encodeURI) e no API KEY colocar o hash do seu cadastro, depois coloca o units=metric, e tambem lang=pt_br
//6 passo = montar a requisição usando o fetch async e await
//7 passo = verificar se de fato a cidade foi encontrada, se nao foi, mostrar a msg de que nao foi encontrada
//8 passo = exibir os resultado de nome da cidade, pais, temperatura, icone da temperatura, velocidade e deg  