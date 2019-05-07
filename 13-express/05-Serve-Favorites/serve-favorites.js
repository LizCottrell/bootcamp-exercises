var http = require("http");
var fs = require("fs");

var PORT = 8080;
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
  var path = req.url;

  switch (path) {

  case "/favorite-movies":
    return handleGET(res, "/favorite-movies.html")

  case "/favorite-foods":
    return handleGET(res, "/favorite-foods.html")

  case "/favorite-css-frameworks":
    return handleGET(res, "/favorite-css-frameworks.html")

  default:
    return handleGET(res, "/index.html")
  }
}

const handleGET = (response, path) => {
  return fs.readFile(__dirname + path, function(err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(data);
  });;
}

server.listen(PORT, function() {
  console.log("Server is listening on PORT: " + PORT);
});
