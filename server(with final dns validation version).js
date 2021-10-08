require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');




const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

// bodyParser configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


const urlArr = [];
let id = 0;

app.post("/api/shorturl", function(req, res) {
	//console.log(Object.keys(req));
	console.log(req.body);
	// Output:
	// [Object: null prototype] { url: 'https://www.freecodecamp.org/' }
	
	// Atenção: a propriedade url é passada em body
	const { url } = req.body;
	console.log('Passed URL: ', url);
	
	let noHTTPUrl = url.replace(/^https?:\/\//, '');
	
	noHTTPUrl = noHTTPUrl.replace(/\/$/, '');
	
	console.log('Reformed URL: ', noHTTPUrl);
	
	
	
	// Check if the url is valid
	dns.lookup(noHTTPUrl, function(err, addresses, family) {
		console.log('err', err);
		console.log('addresses', addresses);
		console.log('family', family);
		
		if (err) {
			return res.json({
				error: 'invalid url'
			});
		} else {
			id++;
		
			let newUrl = {
				original_url : url,
				short_url : id
			};
			
			urlArr.push(newUrl);
			console.log(urlArr);
			
			res.json(newUrl);
		}
	});

});



app.get("/api/shorturl/:id", function(req, res) {
	const { id } = req.params;
	
	console.log(id);
	console.log('id typeof', typeof id);
	
	const linkToRedirect = urlArr.find(url => url.short_url === parseInt(id));
	console.log(linkToRedirect);
	
	if (linkToRedirect) {
		res.redirect(linkToRedirect.original_url);
	}
	res.json({
		"error": "Id not found"
	});
});  





app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});









