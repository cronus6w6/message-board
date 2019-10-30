"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var app = express_1.default();
var server = http_1.default.createServer(app);
var socket = socket_io_1.default(server);
var port = process.env.PORT || 80;
app.get('/', function (req, res) {
    res.redirect("index.html");
});
socket.on("connection", function (req) {
    console.log("Client Connect");
});
app.get('/get_token', function (req, res) {
    console.log(req.ips);
    res.end();
});
app.use(express_1.default.static('public'));
app.use('/plugin', express_1.default.static("plugin"));
app.use('/javascript', express_1.default.static('dst/public'));
server.listen(port, function () {
    console.log("Server listen at:" + port);
});
//# sourceMappingURL=index.js.map