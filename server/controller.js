/*----------------------------
    IMPORT NODE MODULES
http: enables to create web apps
url: helps parsing url
-----------------------------*/
const http = require('http');
const url = require('url');

//Server must be created with
//request as req and response as res

module.exports = http.createServer((req, res) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    //Send the main view
    switch (reqUrl.pathname) {
        //First view of the page
        case "/":
            service.firstView(req, res);
            break;
        //Main view of the web app
        case "/coursemanager":
            service.courseManager(req, res);
            break;
        //Send the students
        case "/students":
            service.sendStudents(req, res);
            break;
        //Check if the user is in the database;
        case "/check":
            service.checkRequest(req, res);
            break;
        //Select the marks
        case "/marks":
            service.sendMarks(req, res);
            break;
        //Select the tasks
        case "/tasks":
            service.sendTasks(req, res);
            break;
        case "/timetables":
            service.sendTimetable(req, res);
            break;
        default:
            //Check for images/styles/jscripts
            if(req.url.match("\.css$")){

                service.sendStyle(req, res);

            }else if(req.url.match("\.jpg$")){

                service.sendJpg(req, res);

            }else if(req.url.match("\.js$")){

                service.sendJs(req, res);

            }else if(req.url.match("\.png$")){

                service.sendPng(req, res);

            }else{
                //Error in the url
                service.invalidRequest(req, res);

            }
            break;
    }
    

});
