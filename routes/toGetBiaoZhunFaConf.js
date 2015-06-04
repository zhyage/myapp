var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res, next) {


	var conf = JSON.parse(fs.readFileSync('biaoZhunFaformula.json', 'utf8'));
	console.info("biaoZhunFa conf: ", conf);
    var returnMsgStr = JSON.stringify(conf.allFormula);

	console.info("returnMsgStr :", returnMsgStr);

	res.send(returnMsgStr);

});


module.exports = router;
