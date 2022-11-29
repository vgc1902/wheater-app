const express = require("express");
const router = express.Router();
const imageRegex = /\/.+\.(svg|png|jpg|png|jpeg)$/; // You can add other image formats
router.get(imageRegex, (req, res) =>
{
	const filePath = req.path;
	res.redirect(303, `http://localhost:5000/src${filePath}`);
});

module.exports = router;
