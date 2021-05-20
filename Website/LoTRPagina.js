src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js";
src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.1/js/bootstrap.bundle.min.js";
src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.1.4/toastr.min.js";
const fetch = require('node-fetch');

// togglePopup
function togglePopup() {
    document.getElementById("popup-1")
        .classList.toggle("active");
}

// call API
var token = "L-r_2iO5N7DkmeeHq1V6";
var uri = 'https://the-one-api.dev/v2/quote';
async function callAPI() {
    let response = await fetch(uri, {
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
    }})
    let data = await response.json();
    return data;
}
callAPI().then(data => console.log(data));

// // get quote
// function getQuote() {
//     var randomId = Math.floor(Math.random() * 2390); 

//     get(`${uri}/${randomId}`)
//         .done(function (data) {
//             // quote.innerHTML = data.dialog;
//             console.log(data.dialog);
//         })
//         .fail(function (oError) {
//             console.log(oError);
//         });
// }

// getQuote();
// var startButton = document.getElementById("startButtonContainer");
// startButton.onclick = function () { getQuote() };

// var quote = document.getElementById("myQuote");