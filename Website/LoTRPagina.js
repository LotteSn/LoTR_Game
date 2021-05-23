src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
src = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.bundle.min.js";
src = "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js";
src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"
src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"
src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
const fetch = require('node-fetch');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var token = "L-r_2iO5N7DkmeeHq1V6";
var uri = "https://the-one-api.dev/v2";


// togglePopup
function togglePopup() {
    document.getElementById("popup-1")
        .classList.toggle("active");
}

// call API
async function callAPI(path) {
    let response = await fetch(`${uri}/${path}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    let data = await response.json();
    return data;
}
// callAPI("movie").then(data => console.log(data));

// get quote
function getQuote() {
    var allQuotes = callAPI("quote").then(data => {
        // allQuotes.docs.length
        var randomInt = getRandomInt(67);
        var randomQuote = data.docs[randomInt].dialog;
        document.getElementById("myQuote").innerHTML = randomQuote;
        console.log(randomQuote);
    });
}
getQuote();

async function getCharacters() {
    var characterBox = document.getElementById("characterName");
    var allCharactersResponse = callAPI("character").then(data => { });
    let allCharacters = await allCharactersResponse.json();
    console.log(allCharacters);

    for (var i in allCharacters) {
        var option = document.createElement("option");
        option.value = allCharacters[i].name;
        option.text = allCharacters[i].name;

        characterBox.appendChild(option);
    }
}
getCharacters();

async function getMovies() {
    var movieBox = document.getElementById("movieName");
    var allMoviesResponse = callAPI("movie").then(data => { });
    let allMovies = await allMoviesResponse.json();
    console.log(allMovies);

    for (var i in allMovies) {
        var option = document.createElement("option");
        option.value = allMovies[i].name;
        option.text = allMovies[i].name;

        movieBox.appendChild(option);
    }
}
getMovies();

// Notepad show / hide
var notepadStatus;
function show_hide_notepad() {
    if (notepadStatus == 1) {
        document.getElementById("notepad").style.display = "inline";
        return notepadStatus = 0;
    }
    else {
        document.getElementById("notepad").style.display = "none";
        return notepadStatus = 1;
    }
}

//Notepad Textarea opslagen.
function saveNote() {
    var textElement = document.getElementById("noteText").value;
    localStorage.setItem("note", (textElement));
}

//Notepad Text laden in de TextArea (notepad)
function loadTextarea() {
    document.getElementById("noteText").value = localStorage.getItem("note");
}

//Notepads Load Functions
function loadFunctions() {
    show_hide_notepad();
    loadTextarea();
    highestWinstreakScore = localStorage.getItem("highestWinstreakScoreMemory");
    document.getElementById("highest-winstreak").innerHTML = ("Highest Winstreak: " + highestWinstreakScore);
}

//Geen toegang voor de error pagina
function noAuthorization() {
    alert("Geen toegang")
}

function winstreakCorrect() {
    winstreakScore++;
    document.getElementById("winstreak").innerHTML = ("Winstreak: " + winstreakScore);

    if (highestWinstreakScore < winstreakScore) {
        highestWinstreakScore = winstreakScore;
        localStorage.setItem("highestWinstreakScoreMemory", (highestWinstreakScore));
        document.getElementById("highest-winstreak").innerHTML = ("Highest Winstreak: " + highestWinstreakScore);
    }
}
function winstreakWrong() {
    winstreakScore = 0;
    document.getElementById("winstreak").innerHTML = ("Winstreak: " + winstreakScore);
}