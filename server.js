
'use strict';

var express = require('express'),
    app = express(),
   request = require('request');
   
app.use(express.static('./'));
app.listen(3000);

app.get('/proxy', function(req, res){
    console.log(req.query.url + '?key=' + process.env.DISCOGS_KEY + '&secret=' + process.env.DISCOGS_SECRET);
    let options = {
        url: req.query.url + '?key=' + process.env.DISCOGS_KEY + '&secret=' + process.env.DISCOGS_SECRET,
        headers: {
            'User-Agent': 'Playlistr/1.0'
        }
    };
    
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.end(body);
        }
    })
});

console.log("Playlistr listening on port 3000")