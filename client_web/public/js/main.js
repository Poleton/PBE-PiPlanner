//Variables
//Icons
const icon = document.getElementById('pw1');
//Inputs
const inputPW = document.getElementById('pw');
const inputUSR = document.getElementById('usr');
//Detect
const detector = document.getElementById('detect');
//button
const btn = document.querySelector('#action-btn');

//Change symbol and show/hide pw
detector.addEventListener("click", () => {
    console.log("hello");
    if (inputPW.type === "password") {
        inputPW.type = "text";
        //icon.classList.remove("fa-eye-slash");
        //icon.classList.add("fa-eye");
    } else {
        inputPW.type = "password";
        //icon.classList.remove("fa-eye");
        //icon.classList.add("fa-eye-slash");
    }
});


inputPW.addEventListener("keyup", () => {
    document.getElementById('msg').innerHTML = "";
    
})
inputUSR.addEventListener("keyup", () => {
    document.getElementById('msg').innerHTML = "";
})

btn.addEventListener("click", () => {
    if (inputPW.value.length == 0 || inputUSR.value.length == 0) {
        document.getElementById('msg').innerHTML = "Some inputs are empty";
    } else {
        url = "/check?username=" + inputUSR.value + "&id=" + inputPW.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", url, true);
        xhttp.onload = function () {
            var data = JSON.parse(xhttp.response);
            console.log(data);
            if(data.valid){
                window.open(data.url);
            }else{
                document.getElementById('msg').innerHTML = "Password or Username Incorrects";
            }
        }
        xhttp.send();
        
    }
});
