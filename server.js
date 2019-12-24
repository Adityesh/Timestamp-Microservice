// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp/',(req,res)=>{
  res.json({unix : Date.now(),utc : new Date(Date.now()).toUTCString()})
})

app.get('/api/timestamp/:date_string?',(req,res)=>{
  const data = req.params.date_string;
  const today = new Date(data);
  if(today != 'Invalid Date'){
    res.json({unix : new Date(today).getTime(),utc : new Date(today).toUTCString()})
  }
  else if(today == 'Invalid Date' && new Date(parseInt(data)) != 'Invalid Date'){
    res.json({
      unix : new Date(parseInt(data)).getTime(),
      utc : new Date(parseInt(data)).toUTCString()
    })
  }
  else if(today == 'Invalid Date' && new Date(parseInt(data)) == 'Invalid Date') {
    res.json({
      unix : null,
      utc : 'Invalid Date'
    })
  }

  
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});