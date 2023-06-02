//Types
interface Position {
    coords: {
        longitude: number;
        latitude: number;
    };
    timestamp: Number;
}

interface Objecte {
    joke: string | null;
    score: number | undefined;
    date: string | undefined;
}


//EXERCICI 4: API DE TEMPS METEOROLÒGIC
/*S'activa onload la funció Temps, que demana permís a API Geolocation i si aquesta dona permís i dades correctes s'imprimeix 
el temps meteorològic amb les coordenades obtingudes; si no, s'imprimeix amb les coordenades per defecte, que
són les de l'IT Academy (si no es dona permís)*/
function Temps() {
    if (navigator.geolocation) { //Si la funció de geolocalització funciona, s'activa per demanar permís a l'usuari (1)

        const posicioDenegada = () => { //Si es denega el permís, s'imprimeix temps per defecte
            printWeatherPlace();
        };

        const posicioAcceptada = (position: Position) => { // Si es dona el permís, s'imprimeix temps amb coordenades obtingudes per API
            printWeatherPlace(`${position.coords.latitude.toFixed(3)},${position.coords.longitude.toFixed(3)}`);
        }

        navigator.geolocation.getCurrentPosition(posicioAcceptada, posicioDenegada); //(1) Funció de geolocalització: es demana permís a l'usuari
    } else { printWeatherPlace() } //Si no funciona la geocolització, s'imprimeix temps per defecte

}

//Funció que imprimeix el temps i el lloc amb les coordenades obtingudes de GEO API o, si no, amb les coordenades per defecte (de l'IT Academy)
function printWeatherPlace(cs = "41.404,2.195") {
    let temps = document.getElementById("temps");
    //Busquem icona del temps i la Ta a les coordenades donades mitjançant una API i imprimim
    fetch(`http://api.weatherunlocked.com/api/current/${cs}?app_id=&app_key=`)
        .then(response => response.json())
        .then(info => {
            if (temps != null) { temps.innerHTML = `<img id="temps" src="http://www.weatherunlocked.com/Images/icons/1/${info.wx_icon}" alt="temps"><span>| ${info.temp_c}°C</span>` }
        })
        .catch(err => {
            console.log("There was an error with the weather API: ", err);
            if (temps != null) { temps.innerHTML = "<p>   Temps d'avui: <img src='images/sol.png' alt='sol' width='20em' height='20em'></p>"; }
        });

    //Busquem el nom de la ciutat corresponent a les coordenades donades mitjançant una altra API i l'imprimim
    //Aquí no hi posem l'API key per privacitat
    let csSplit = cs.split(","); //Adaptem el format de les coordenades segons la documentació de l'API
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${csSplit[0]}&lon=${csSplit[1]}&apiKey=`)
        .then(response => response.json())
        .then(info => {
            let lloc = document.getElementById("lloc");
            if (lloc != null) { lloc.innerHTML = `Temps a ${info.features[0].properties.city} (${csSplit[0]}, ${csSplit[1]})`; }
        })
        .catch(err => {
            console.log("There was an error with the geo API: ", err);
    });
}


//EXERCICIS 1-3, 5. APIs de BROMES. Imprimim acudits alternats entre "Chuck Norris jokes" i "Dad Jokes" i en guardem informació (joke, score, date de cada acudit)
//Creem array on es guardaran els objectes amb la informació dels acudits
let reportAcudits: Objecte[] = [];

async function NextJoke() {

    //Seleccionem el div en què s'imprimirà la broma
    let broma: HTMLElement | null = document.getElementById("joke");

    //Exercici 3.1: Creem array i funció per recollir dades
    //Si el div de la broma està ple (no és la primera vegada que es clica el botó), s'afegeix informació a reportAcudits
    if (broma != null) {
        if (broma.innerHTML != "") {

            let date = new Date().toISOString(); //Obtenim la data del moment en què es submiteja la valoració

            //Si l'usuari no marca cap radio button, score serà undefined; si en marca un, score tindrà el valor corresponent
            let score;
            let radioButton = <HTMLInputElement>document.querySelector('input[name = "score"]:checked');
            if (radioButton) {
                score = parseInt((radioButton).value);
            }

            //Amb la informació recollida, podem crear l'objecte amb les dades de l'acudit i pushejar-lo
            let objecte: Objecte = {
                joke: broma.innerHTML,
                score: score,
                date: date
            }

            reportAcudits.push(objecte);
            console.log(reportAcudits);
        }
    }

    //Exercici 3.2: imprimim les opcions de valoració
    let form = document.getElementById("form");
    if (form != null) { form.innerHTML = `<input type = "radio" id = "1" name = "score" value =1><label for= "1" style="padding:11.005px 0px"> 😅 </label><input type = "radio" id = "2" name = "score" value=2><label for= "2" style="padding:11.005px 0px"> 😐 </label><input type = "radio" id = "3" name = "score" value =3><label for= "3" style="padding:11.005px 0px;padding-right:7px"> 😂 </label>`; }

    //Exercicis 1 i 2: creem funció per obtenir bromes

    //Seleccionem aleatòriament una de les dues APIs de bromes
    let decisio = Math.random() < 0.5 ? true : false;

    //Opció 1: Bromes de Chuck Norris / Acudits en català
    if (decisio) {
        await fetch("https://api.chucknorris.io/jokes/random")
            .then(response => response.json())
            .then(info => { if (broma != null) { broma.innerHTML = info.value } })
            .catch(err => console.error("There was an error with the chucknorris API: ", err));
    } else {
        //Opció 2: Bromes de Dad jokes
        await fetch("https://icanhazdadjoke.com", {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
            .then(response => response.json())
            .then(joke => { if (broma != null) { broma.innerHTML = joke.joke } })
            .catch(err => console.error("There was an error with the dadjoke API: ", err));
    }


    //EXERCICI 6. Per altra banda, fem que la forma del fons canviï aleatòriament cada cop que canviem d'acudit
    const num = Math.floor(Math.random() * 10) + 1;
    let body = document.getElementById("body");
    if (body != null) { body.style.backgroundImage = `url("images/blob${num}.svg")`; }
}

