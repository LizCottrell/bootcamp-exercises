// Dependencies
var http = require("http");
var fs = require("fs");
var PORT = 8080;
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var path = req.url;

  switch (path) {
  case "/thanks":
    return renderThankYouPage(req, res);
  default:
    return renderWelcomePage(req, res);
  }
}

const renderWelcomePage = (req, res) => {
  fs.readFile(__dirname + "/index.html", function(err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

const renderThankYouPage = (req, res) => {
  var requestData = "";

  var html = "<h1>Thanks</h1>"

  req.on("data", function(data) {
    requestData += data;
  });

  req.on("end", function() {
    console.log("You did a", req.method, "with the data:\n", requestData);
    res.end(html);
  });
}

server.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
