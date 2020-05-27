//Declare all the variables
var btnsnd = document.getElementById('send-btn');
var input = document.getElementById('srch');

//Event Listener to load the data
btnsnd.addEventListener("click", () => {
    var url = "/" + input.value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.onload = function () {
        var data = JSON.parse(xhttp.response);
        console.log(data[0]);
        var html = `
                <div class="title-cont">${input.value.split('?')[0]}</div>

            `;
        var i = 0;
        console.log(data);
        for (i = 0; i < data.length; i++) {
            
            if (i === 0) {
                let firts = `<div class="first">`;
                for (row in data[i]) {
                    console.log(row);
                    firts += `<span>${row}</span>`
                }
                firts += `</div>`;
                html += firts;
            }
            let temp = `<div class="row">`;
            for(row in data[i]){
               
                temp += `<span>${data[i][row]}</span>`;
               
            }
            temp +=`</div>`;
            html += temp;
        }
        document.querySelector('.content').innerHTML = html;
    }

    xhttp.send();
})


//Get Username from our sesion
function getUserName(){
    console.log(window.location.pathname);
}
getUserName();