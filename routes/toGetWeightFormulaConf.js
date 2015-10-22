var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res, next) {
    console.info("come to toGetWeightFormulaConf");

	var conf = JSON.parse(fs.readFileSync('weightFormula.json', 'utf8'));
	console.info("weightFormula.json: ", conf);
    var returnMsgStr = JSON.stringify(conf.allFormula);

	console.info("returnMsgStr :", returnMsgStr);

	res.send(returnMsgStr);

});


module.exports = router;
