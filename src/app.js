const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const https = require('https');


const makePath = (dir, filename) => {
  return path.resolve(__dirname, "..", "public", dir, filename);
};

// a junior should know how memory storage works
// using a file for this is also ok
const todos = ["get milk", "get butter", "learn Javascript"];

app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.render(makePath("www", "index.v3.ejs"), { todos });
});

app.get("/nowplaying", (req, response) => {
    //todos.push(req.body.todo);
    const options = {
	'method': 'GET',
	'hostname': 'a1.pcmusic.com',
	'path': '/api/nowplaying?key=9454B18C8142B16E902FE9D7FC05061C',
	'headers': {
	}
    };

    var req = https.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
	    chunks.push(chunk);
	});

	res.on("end", function (chunk) {
	    var body = Buffer.concat(chunks);
	    console.log(JSON.parse(body.toString()));
	    response.json(JSON.parse(body.toString()));
	    //return body.toString();
	});

	res.on("error", function (error) {
	    console.error(error);
	});
    });

    req.end();
    //res.json("HELLO WORLD");
    
});




module.exports = app;
