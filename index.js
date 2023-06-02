var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
//EXERCICI 4: API DE TEMPS METEOROLÒGIC
/*S'activa onload la funció Temps, que demana permís a API Geolocation i si aquesta dona permís i dades correctes s'imprimeix
el temps meteorològic amb les coordenades obtingudes; si no, s'imprimeix amb les coordenades per defecte, que
són les de l'IT Academy (si no es dona permís)*/
function Temps() {
    if (navigator.geolocation) { //Si la funció de geolocalització funciona, s'activa per demanar permís a l'usuari (1)
        var posicioDenegada = function () {
            printWeatherPlace();
        };
        var posicioAcceptada = function (position) {
            printWeatherPlace("".concat(position.coords.latitude.toFixed(3), ",").concat(position.coords.longitude.toFixed(3)));
        };
        navigator.geolocation.getCurrentPosition(posicioAcceptada, posicioDenegada); //(1) Funció de geolocalització: es demana permís a l'usuari
    }
    else {
        printWeatherPlace();
    } //Si no funciona la geocolització, s'imprimeix temps per defecte
}
//Funció que imprimeix el temps i el lloc amb les coordenades obtingudes de GEO API o, si no, amb les coordenades per defecte (de l'IT Academy)
function printWeatherPlace(cs) {
    if (cs === void 0) { cs = "41.404,2.195"; }
    var temps = document.getElementById("temps");
    //Busquem icona del temps i la Ta a les coordenades donades mitjançant una API i imprimim
    fetch("http://api.weatherunlocked.com/api/current/".concat(cs, "?app_id=&app_key="))
        .then(function (response) { return response.json(); })
        .then(function (info) {
        if (temps != null) {
            temps.innerHTML = "<img id=\"temps\" src=\"http://www.weatherunlocked.com/Images/icons/1/".concat(info.wx_icon, "\" alt=\"temps\"><span>| ").concat(info.temp_c, "\u00B0C</span>");
        }
    })["catch"](function (err) {
        console.log("There was an error with the weather API: ", err);
        if (temps != null) {
            temps.innerHTML = "<p>   Temps d'avui: <img src='images/sol.png' alt='sol' width='20em' height='20em'>.</p>";
        }
    });
    //Busquem el nom de la ciutat corresponent a les coordenades donades mitjançant una altra API i l'imprimim
    //Aquí no hi posem l'API key per privacitat
    var csSplit = cs.split(","); //Adaptem el format de les coordenades segons la documentació de l'API
    fetch("https://api.geoapify.com/v1/geocode/reverse?lat=".concat(csSplit[0], "&lon=").concat(csSplit[1], "&apiKey="))
        .then(function (response) { return response.json(); })
        .then(function (info) {
        var lloc = document.getElementById("lloc");
        if (lloc != null) {
            lloc.innerHTML = "Temps a ".concat(info.features[0].properties.city, " (").concat(csSplit[0], ", ").concat(csSplit[1], ")");
        }
    })["catch"](function (err) {
        console.log("There was an error with the geo API: ", err);
    });
}
//EXERCICIS 1-3, 5. APIs de BROMES. Imprimim acudits alternats entre "Chuck Norris jokes" i "Dad Jokes" i en guardem informació (joke, score, date de cada acudit)
//Creem array on es guardaran els objectes amb la informació dels acudits
var reportAcudits = [];
function NextJoke() {
    return __awaiter(this, void 0, void 0, function () {
        var broma, date, score, radioButton, objecte, form, decisio, num, body;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    broma = document.getElementById("joke");
                    //Exercici 3.1: Creem array i funció per recollir dades
                    //Si el div de la broma està ple (no és la primera vegada que es clica el botó), s'afegeix informació a reportAcudits
                    if (broma != null) {
                        if (broma.innerHTML != "") {
                            date = new Date().toISOString();
                            score = void 0;
                            radioButton = document.querySelector('input[name = "score"]:checked');
                            if (radioButton) {
                                score = parseInt((radioButton).value);
                            }
                            objecte = {
                                joke: broma.innerHTML,
                                score: score,
                                date: date
                            };
                            reportAcudits.push(objecte);
                            console.log(reportAcudits);
                        }
                    }
                    form = document.getElementById("form");
                    if (form != null) {
                        form.innerHTML = "<input type = \"radio\" id = \"1\" name = \"score\" value =1><label for= \"1\" style=\"padding:11.005px 0px\"> \uD83D\uDE05 </label><input type = \"radio\" id = \"2\" name = \"score\" value=2><label for= \"2\" style=\"padding:11.005px 0px\"> \uD83D\uDE10 </label><input type = \"radio\" id = \"3\" name = \"score\" value =3><label for= \"3\" style=\"padding:11.005px 0px;padding-right:7px\"> \uD83D\uDE02 </label>";
                    }
                    decisio = Math.random() < 0.5 ? true : false;
                    if (!decisio) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetch("https://api.chucknorris.io/jokes/random")
                            .then(function (response) { return response.json(); })
                            .then(function (info) { if (broma != null) {
                            broma.innerHTML = info.value;
                        } })["catch"](function (err) { return console.error("There was an error with the chucknorris API: ", err); })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: 
                //Opció 2: Bromes de Dad jokes
                return [4 /*yield*/, fetch("https://icanhazdadjoke.com", {
                        method: "GET",
                        headers: {
                            "Accept": "application/json"
                        }
                    })
                        .then(function (response) { return response.json(); })
                        .then(function (joke) { if (broma != null) {
                        broma.innerHTML = joke.joke;
                    } })["catch"](function (err) { return console.error("There was an error with the dadjoke API: ", err); })];
                case 3:
                    //Opció 2: Bromes de Dad jokes
                    _a.sent();
                    _a.label = 4;
                case 4:
                    num = Math.floor(Math.random() * 10) + 1;
                    body = document.getElementById("body");
                    if (body != null) {
                        body.style.backgroundImage = "url(\"images/blob".concat(num, ".svg\")");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
