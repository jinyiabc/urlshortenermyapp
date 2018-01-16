// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient
var ObjectId = require('mongodb').ObjectID;
// Log in database with dbuser:dbpw database
var url = 'mongodb://test:1234@ds255767.mlab.com:55767/freecodecamp'

app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.use(function (req ,res,next) {
console.log(req.url.slice(1) )
var result
 mongo.connect(url, function(err, client) {
  if (err) throw err
  var db = client.db('freecodecamp')
  var collection = db.collection('urlshorten')  
  collection.find( { shorten_url: "https://urlshortenermyapp.glitch.me/"+req.url.slice(1) } )
            .toArray(function(err, docs) {
                     if (err) throw err
                     client.close()
                     if(docs.length>0){
                       var new_url = docs[0]["original_url"]    // www.google.com
                        result = {
                        orginal_url:docs[0]["original_url"],
                        shorten_url:docs[0]["shorten_url"]
                        }
                        // console.log(result)
                       // res.redirect(docs[0]["original_url"])
                       res.redirect(301, docs[0]["original_url"]);

//                         res.writeHead(200, { 'Content-Type': 'application/json' })
//                         res.end(JSON.stringify(result))
                        
                     } else {
                       next()
                     }
                     // client.close()
                     })

})

  
})

 app.use(function (req ,res) {

    var original_url = JSON.stringify(req.url).slice(6,-1)
    // console.log(original_url)  // https://www.google.com
//======================================================================================
// Connecet mLab datebase.
  var id = ObjectId().getTimestamp().getTime()
var doc = {
    _id: id,
    original_url: original_url,
    shorten_url: "https://urlshortenermyapp.glitch.me/"+id
  }
mongo.connect(url, function(err, client) {
  if (err) throw err
  var db = client.db('freecodecamp')
  var collection = db.collection('urlshorten')
  collection.insert(doc, function(err,data){
    if(err) throw err
    console.log(JSON.stringify(doc))
    client.close()
  })
  
  collection.createIndex({original_url:1,shorten_url:1,_id:1})
})


  
    var result =  {
    original_url: original_url,
    shorten_url: "https://urlshortenermyapp.glitch.me/"+id
  } 

    
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
