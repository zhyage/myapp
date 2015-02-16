var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res, next) {

	console.info("handle getFileList");
	var fileList = [];
	fileList = fs.readdirSync("public/dataSave/");
	var fileListStr = JSON.stringify(fileList);
	console.info("fileListStr = ", fileListStr);
	
  res.send(fileListStr);
});

module.exports = router;
