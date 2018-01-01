var   express = require('express')
    , http = require('http')
    , path = require('path')
    , openfinLauncher = require('openfin-launcher');

var app = express();

const configPath = path.join(__dirname, 'src', 'app_local.json');

app.set('title','OpenFin window amimation');
app.use(express.static(path.join(__dirname, 'src')));

/* serves main page  */
app.get('/', function (req, res) {
    res.sendFile("src/index.html", {"root": __dirname});
});

var port = process.env.PORT || 9071;

const localServer = http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
    openfinLauncher.launchOpenFin( { configPath }).then(() => {
        localServer.close();
    })
});
