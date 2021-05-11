const express = require('express');
const app = express();
const cors = require('cors');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // CORS 

app.get('/', (req, res) => {
	res.status(200);
	fs.createReadStream(path.join(__dirname, 'index.html')).pipe(res);
})


// Minify CSS Route
const routeCssMinify = require('./routes/minifiers/routes_css_minify.js');
app.use('/css-minify', routeCssMinify);
// Minify JS Route
const routeJSMinify = require('./routes/minifiers/routes_js_minify.js');
app.use('/js-minify', routeJSMinify);
// Minify HTML Route
const routeHtmlMinify = require('./routes/minifiers/routes_html_minify.js');
app.use('/html-minify', routeHtmlMinify);




// PORT for the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`app is listenig on PORT:${PORT}`)
})
