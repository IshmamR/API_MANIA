const express = require('express');
const router = express.Router();

// CSS minifier module
const csso = require('csso');

// Get request not needed, will redirect later
router.get('/', (req, res) => {
	// const query = req.query
	res.json({ sup: "hello" })
})

// Posted CSS -> minify
router.post('/', (req, res) => {
	// console.log('Posted');
	const cssToMinify = req.body.css;
	
	if (cssToMinify) {
		// console.log('CSS found');
		var minifiedCss = csso.minify( String(cssToMinify), {
			restructure: true, // don't change CSS structure, i.e. don't merge declarations, rulesets etc
			debug: false 
		});
		const sizeBefore = new TextEncoder().encode(String(cssToMinify)).length;
		const sizeAfter = new TextEncoder().encode(minifiedCss.css).length;
		
		res.status(200);
		res.json({ 
			dataCss: minifiedCss,
			sizeBefore: sizeBefore,
			sizeAfter: sizeAfter 
		});
	} 
	else {
		res.status(404); 
		res.json({ 
			dataCss: { 
				err: "No CSS found to minify :(" 
			} 
		});
	}
})


module.exports = router;