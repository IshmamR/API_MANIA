const express = require('express');
const router = express.Router();

// Minifier controller
const minifier = require('../../controllers/minify_controller.js');

// Get request not needed, will redirect later
router.get('/', (req, res) => {
	// const query = req.query
	res.json({ sup: "hello" })
})

// Posted HTML -> minify
router.post('/', (req, res) => {
	// console.log('Posted');
	if (req.body.html) minifier(req, res, 'html');
	else res.json({ dataErr: "No HTML found to minify :(" });
})


module.exports = router;