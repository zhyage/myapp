var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res, next) {

	var saveInfo = req.body;
	console.info("filename = ", saveInfo.fileName);
	
	var path = "public/dataSave/" + saveInfo.fileName;
	
	/*
	fs.readFile(path, function (err, data) 
	{
		if (err)
		{
			console.info("load error");
		}
		else
		{
			console.info("read file = ", data);
		}
	});
	*/
	var text = fs.readFileSync(path,'utf8')
	console.info("read file = ", text);
	
	res.send(text);
  
});

module.exports = router;
