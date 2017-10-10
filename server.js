const express = require('express');
const app = express();

//must parse this so app.post can read it
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/airplanes");

let NerdSchema = mongoose.Schema({
	name: String,
	title: String
});

let Nerd = mongoose.model('Nerd', NerdSchema);

app.set('views', __dirname);
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/style.css'));

app.get('/', function(req, res){
	res.send("Oh Hai!");
});

app.get('/nerds/new', function(req, res){
	res.sendFile(__dirname+'/newNerd.html');
});

app.post('/nerds', function (req, res) {
	Nerd.create(req.body, function(err, nerd){
		res.render('nerd_show', {nerd});
	});
});

app.listen(3000, function (){
	console.log("listening on port 3000");
});