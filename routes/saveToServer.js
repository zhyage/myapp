var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res, next) {

	var saveInfo = req.body;
	console.info("filename = ", saveInfo.fileName);
	console.info("matrix = ", saveInfo.matrix);
	var path = "public/dataSave/" + saveInfo.fileName;
	
	fs.writeFile(path, JSON.stringify(saveInfo.matrix), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("The file was saved!");
		}
	}); 
	
  res.send('save success');
});

module.exports = router;
