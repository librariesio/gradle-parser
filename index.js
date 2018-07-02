var g2js = require('gradle-to-js/lib/parser');
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var port = process.env.PORT || 5000;

app.use(bodyParser.text());
app.disable('x-powered-by');

app.use(function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

app.post("/parse/", bodyParser.text({type: '*/*'}), function(req,res){
  g2js.parseText(req.body).then(function(representation) {
    res.end(JSON.stringify(representation))
  });
});

app.get("/", function(req, res) {
  res.send("OK");
});

app.use(function(err, req, res, next) {
  console.error('ERR:', err);
  console.error('STACK:', err.stack);
  res.status(500).send({error: 'Something went wrong.'});
});

app.listen(port, function() {
  console.log('Listening on', port);
});
