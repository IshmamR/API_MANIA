const express = require('express');
const router = express.Router();

// Minifier controller
const minifier = require('../../controllers/minify_controller.js');

// Get request not needed, will redirect later
router.get('/', (req, res) => {
	// const query = req.query
	res.json({ sup: "hello" })
})

// Posted JS -> minify
router.post('/', (req, res) => {
	// console.log('Posted');
	if (req.body.js) minifier(req, res, 'js');
	else res.json({ dataErr: "No JS found to minify :(" });
})


module.exports = router;