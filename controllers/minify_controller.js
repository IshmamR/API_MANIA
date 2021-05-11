const minify = require('@node-minify/core');
const htmlMinifier = require('@node-minify/html-minifier');
const csso = require('@node-minify/csso');
const uglify = require('@node-minify/uglify-es')


var compressor, content;

const minifier = (req, res, lang) => {
	if (lang === 'html') {
		// console.log('Code found');
		compressor = htmlMinifier;
		content = req.body.html;
	} else if (lang === 'css') {
		compressor = csso;
		content = req.body.css;
	} else if (lang === 'js') {
		compressor = uglify;
		content = req.body.js;
	} else {
		res.json({ dataErr: "Nothing found to minify :(" });
	}

	minify({
		compressor: compressor,
		content: String(content)
	}).then(minifiedData => {
		// console.log(minifiedData);
		// console.log('Minified')
		let sizeBefore = new TextEncoder().encode(String(content)).length;
		let sizeAfter = new TextEncoder().encode(String(minifiedData)).length;
		
		res.status(200);
		res.json({ 
			dataMin: minifiedData,
			sizeBefore: sizeBefore,
			sizeAfter: sizeAfter 
		});
	})
}


module.exports = minifier;