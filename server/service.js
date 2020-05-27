const url = require('url');
var http = require('http');
var fs = require('fs');
var path = require('path');
const TodoDao = require("../db/dao");
const todoDao = new TodoDao();


exports.sendStudents = async function (req, res) {
    let response = await todoDao.readEntities("SELECT * FROM students");
    console.log(response);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};
exports.sendTimetable = async function(req, res){
    const reqUrl = url.parse(req.url, true);
    var body = reqUrl.query;
    var qr = 'SELECT * FROM timetables';
    var bol = 0;
    if(body.subject !== undefined){

        qr += ' WHERE subject="' + body.subject + '"';
        bol = 1;
    }
    if(body.room !== undefined){

        if(bol ==1){
            qr += ' AND '
        }else{
            qr += ' WHERE ';
        }
        qr += ' room = "' + body.room + '"';
        bol = 1;
    }
    if(body.day !== undefined){

        if(bol ==1){
            qr += ' AND '
        }else{
            qr += ' WHERE ';
        }
        qr += ' day = "' + body.day + '"';
        bol = 1;
    }
    if(body.hour !== undefined){

        if(bol ==1){
            qr += ' AND '
        }else{
            qr += ' WHERE ';
        }
        qr += ' hour = "' + body.hour + '"';
        bol = 1;
    }
    qr += ";";
    let response = await todoDao.readEntities(qr);
    console.log(response);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

exports.sendTasks = async function(req, res){
    const reqUrl = url.parse(req.url, true);
    var body = reqUrl.query;
    var qr = 'SELECT * FROM tasks';
    var bol = 0;
    if(body.subject !== undefined){

        qr += ' WHERE subject="' + body.subject + '"';
        bol = 1;
    }
    if(body.name !== undefined){

        if(bol ==1){
            qr += ' AND '
        }else{
            qr += ' WHERE ';
        }
        qr += ' room = "' + body.name + '"';
        bol = 1;
    }
    if(body.date !== undefined){

        if(bol ==1){
            qr += ' AND '
        }else{
            qr += ' WHERE ';
        }
        qr += ' day = "' + body.date + '"';
        bol = 1;
    }
   
    qr += ";";
    let response = await todoDao.readEntities(qr);
    console.log(response);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};
exports.checkRequest = async function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var body = reqUrl.query;
    var name = body.username;
    var userID = body.id;
    let check = await todoDao.checkUser(name, userID);
    console.log(check);
    var response = {
        "valid": 1,
        "url": "/coursemanager?" + userID,
        "name": name,
        "userID": userID
    }
    console.log(check);
    switch(check){
        case 0:
            response.valid = 0;
            response.url = "";
            break;
        case 1:
            break;
        default:
            response.name = check;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));


};

exports.sendMarks = async function (req, res) {
    const reqUrl = url.parse(req.url, true);
    var body = reqUrl.query;
    var qr = 'SELECT * FROM marks';
    var bol = 0;
    if(body.subject !== undefined){
        qr += ' WHERE subject = "'+ body.subject + ' "';
        bol = 1;
    }
    if(body.name !== undefined){
       if(bol ==1){
           qr += ' AND '
       }else{
           qr += ' WHERE ';
       }
       qr += ' name = "' + body.name + '"';
       bol = 1;
    }
    if(body.markl !== undefined){
        if(bol ==1){
            qr += ' AND '
        }else{
            qr += ' WHERE ';
        }
        qr += 'mark <= '+ body.markl;
        bol = 1;
    }
    if(body.markg !== undefined){
        if(bol ==1){
            qr += ' AND '
        }else{
            qr += ' WHERE ';
        }
        qr += 'mark >= '+ body.markg;
        bol = 1;
    }
    
    if(body.subject === undefined){
    qr += ' ORDER BY subject';
    }
    console.log(qr);
    let response = await todoDao.readEntities(qr);
    console.log(response);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};


exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};

exports.firstView = function (req, res) {
    fs.readFile("../web/public/index.html", "UTF-8", function (err, html) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
}

exports.courseManager = function (req, res) {
    fs.readFile("../web/public/html/coursemanager.html", "UTF-8", function (err, html) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
}

exports.sendStyle = function (req, res) {
    var cssPath = path.join("../web", 'public', req.url);
    var fileStream = fs.createReadStream(cssPath, "UTF-8");
    res.writeHead(200, { "Content-Type": "text/css" });
    fileStream.pipe(res);

}

exports.sendJpg = function (req, res) {
    var imagePath = path.join("../web", 'public', req.url);
    var fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/jpg" });
    fileStream.pipe(res);
}
exports.sendPng = function (req, res) {
    var imagePath = path.join("../web", 'public', req.url);
    var fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "image/png" });
    fileStream.pipe(res);
}


exports.sendJs = function (req, res) {
    var imagePath = path.join("../web", 'public', req.url);
    var fileStream = fs.createReadStream(imagePath);
    res.writeHead(200, { "Content-Type": "text/javascript" });
    fileStream.pipe(res);
}