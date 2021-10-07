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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});



app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});


const links = [];
let id = 0;

// 8'11''


app.post("/api/shorturl", function(req, res) {
	//console.log(req);
	// console.log(req.body);
	
	// Atenção: veja a var url na propriedade name de input type="text"
	const { url } = req.body;
	
	console.log(url);
	
	const noHTTPUrl = url.replace(/^https?:\/\//, '');
	
	console.log(url);

	
	// check if this url is valid
	dns.lookup(noHTTPUrl, function (err, address, family) {
		console.log('err', err);
		console.log('address', address);
		console.log('family', family);
		
		if (err) {
			return res.json({
				error: 'invalid url'
			});
		} else {
			id++;
			
			// create a new entry for the arr
			const newShortURL = {
				original_url: ur,
				short_url: id
			};
			
			links.push(newShortURL);
			
			return res.json(newShortURL);
		}
	});
	
	// dns.lookup(host, cb); 
	
	
	// res.json({
		// "original_url": url,
		// "short_url": "short_url"
	// });
	
	// res.json({ error: 'invalid url' });
});



app.get("/api/shorturl/:id", function(req, res) {
	const { id } = req.params;
	
	const shortURL = links.find(link => link.short_url === id);
	
	
	if (shortURL) {
		return res.redirect(shortURL.original_url);
	} else {
		return res.json({
			error: 'No short url'
		});
	}
});





app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});









