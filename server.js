// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
// var ids = require('short-id');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// app.get("/views", function (request, response) {
//   console.log(JSON.stringfy(request.url))
//   // response.send(dreams);
// });


app.use(function (req ,res) {
  
    // console.log(JSON.stringify(req.url))   // new/https://www.google.com

    var original_url = JSON.stringify(req.url).slice(6,-1)
    console.log(original_url)  // https://www.google.com

    var result = {
           original_url:original_url
    }


        
//              if (decodeURI(date) != date){
//                  time = new Date(decodeURI(date))
//                  result = parsetime(time) 

//                } else if(decodeURI(date) == date){
//                  time = new Date(Number(date))
//                  result = parsetime(time)   
              // }
    
      if (result) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(result))
      } else {
        res.writeHead(404)
        res.end()
      }
    })


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
