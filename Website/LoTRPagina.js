src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
src = "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.bundle.min.js";
src = "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js";
src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js";
src = "https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js";

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
/* async function callAPI(path) {
    let response = await fetch(`${uri}/${path}`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    let data = await response.json();
    return data;
} */

//call API 
async function callAPI(path) {
    console.log("running callAPI with path= ", path)
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", uri + "/" + path, false); // false for synchronous request
    xmlHttp.setRequestHeader("Authorization", "Bearer " + token)
    xmlHttp.setRequestHeader("Accept", "application/json")
    xmlHttp.send(null);
    let data = await xmlHttp;
    console.log(JSON.parse(data.response))
    data = JSON.parse(data.response)
    return data
}

var quoteCharacter;
var quoteMovie;
var randomInt;
// get quote 
function getQuote() {
    randomInt = getRandomInt(67);
    callAPI("quote").then(data => {
        randomQuote = data.docs[randomInt].dialog;
        quoteCharacter = data.docs[randomInt].character;
        quoteMovie = data.docs[randomInt].movie;
        document.getElementById("myQuote").innerHTML = randomQuote;
    });
}

var allCharacters = [];
var characterBox;
function getCharacters() {
    characterBox = document.getElementById("characterName");
    
    var allCharactersResponse = callAPI("character").then(data => {
        allCharacters = data.docs

        for (var i in allCharacters) {
            var option = document.createElement("option");
            option.value = allCharacters[i]._id;
            option.text = allCharacters[i].name;

            characterBox.appendChild(option);
        }
    });
}

var allMovies = [];
var movieBox;
function getMovies() {
    movieBox = document.getElementById("movieName");

    var allMoviesResponse = callAPI("movie").then(data => {
        allMovies = data.docs

        for (var i in allCharacters) {
            var option = document.createElement("option");
            option.value = allMovies[i]._id;
            option.text = allMovies[i].name;

            movieBox.appendChild(option);
        }
    });
}

//check quote
function checkQuote() {
    if(characterBox.value == quoteCharacter && movieBox.value == quoteMovie) {
        document.getElementById("userOutput").innerHTML = "Correct!";
        document.getElementById("userOutput").style.color = "#00ff00"; //groen
        winstreakCorrect();
    }
    else if(characterBox.value == quoteCharacter && !(movieBox.value == quoteMovie)) {
        document.getElementById("userOutput").innerHTML = "Het character is correct maar niet de juiste film.";
        document.getElementById("userOutput").style.color = "#ffa500"; //orange
    }
    else if(!(characterBox.value == quoteCharacter) && movieBox.value == quoteMovie) {
        document.getElementById("userOutput").innerHTML = "De film is correct maar niet de juiste character.";
        document.getElementById("userOutput").style.color = "#ffa500"; //orange
    }
    else {
        document.getElementById("userOutput").innerHTML = "Incorrect.";
        document.getElementById("userOutput").style.color = "#ff0000"; //rood
        winstreakWrong();
    }
}

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
