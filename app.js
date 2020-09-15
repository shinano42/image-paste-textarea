var express = require('express');
var multer = require('multer');


var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/static', express.static(__dirname + '/public/static')); // for serving the HTML file
app.set('views', __dirname + '/views');
var port = 3000;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname.slice(-4));
    }
});
var upload = multer({ storage: storage })

app.post('/api/postimage', upload.single('data'), function (req, res, next) {
    console.log(req.file);
    res.status(200).send({ result: 'OK' });
});

app.get('/', function (req, res, next) {
    res.render('index.html');
});

app.listen(port);