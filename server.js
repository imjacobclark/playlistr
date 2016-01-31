
'use strict';

let express = require('express'),
    app = express(),
   request = require('request'),
   compression = require('compression'),
   oneHour = 3600000;
   
app.use(express.static('./', { maxAge: oneHour }));
app.use(compression());
app.listen(3000);

app.get('/proxy', function(req, res){
    if(
        req.query.url != undefined && 
        req.query.url.indexOf('https://api.discogs.com') > -1 ||
        req.query.url.indexOf('/collection/folders/0/releases' > -1
    )){
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
        });
    }else{
        res.end();
    }
});

console.log("Playlistr listening on port 3000");