import express from 'express';
import http from 'http';
import io from 'socket.io';
import md5 from 'md5';

var app = express();
var server = http.createServer(app);
var socket = io(server);

var port:number = <number><unknown>process.env.PORT || 80;

app.get('/', (req,res) => {
    res.redirect("index.html");
});

socket.on("connection", (req) => {
    console.log("Client Connect");
    // console.log("token: ", req.request.headers.cookie);
});

app.use('/get_token', (req, res, next) => {
    req.query.name || res.status(412).send("Missing parameters!").end();
    req.query.name && next();
});

app.get('/get_token', (req, res) => {
    var token: string = `${req.query.name}@${req.ip}`;
    console.log("get token from " + req.ip);
    var response: object = {
        token: md5(token)
    }
    res.send(JSON.stringify(response));
});

app.use(express.static('public'));
app.use('/plugin', express.static("plugin"));
app.use('/javascript', express.static('dst/public'));


server.listen(port, () => {
    console.log("Server listen at:" +　port);
})
