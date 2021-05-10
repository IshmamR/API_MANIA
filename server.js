const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

// 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.status(200);
	fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
})


// Minify CSS Route
const routeCssMinify = require('./routes/minifiers/routes_css_minify.js');
app.use('/css-minify', routeCssMinify);




// PORT for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`app is listenig on PORT:${PORT}`)
})