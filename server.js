require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});



app.post("/api/shorturl", function(req, res) {
	console.log(req.body);
	
	res.json({
		"original_url" "original_url",
		"short_url": "short_url"
	});
	
	// res.json({ error: 'invalid url' });
});



app.get("/api/shorturl/:shorturl", function(req, res) {
	
});





app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});









