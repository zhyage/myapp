var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.post('/', function(req, res, next) {


	var conf = JSON.parse(fs.readFileSync('biaoZhunFaformula.json', 'utf8'));
	console.info("biaoZhunFa conf: ", conf);
	var toGetData = req.body;
	console.info("biaoZhunFaName = ", toGetData.biaoZhunFaName);
	var matchConf = {};
	conf.allFormula.forEach(function(confEle){
		if(confEle.name == toGetData.biaoZhunFaName){
			matchConf = confEle;
		}
	})
	console.info("matchConf :", matchConf);
	var returnMsg = {"formula":"",
						"hints": ""};
	returnMsg.formula = generateFormula(matchConf);
	returnMsg.hints = generateHint(matchConf);
	var returnMsgStr = JSON.stringify(returnMsg);
	console.info("returnMsgStr :", returnMsgStr);

	res.send(returnMsgStr);

});

function generateFormula(conf){
	var formula = 'fn(' + conf.name + ')' + '(' + conf.formula + ')';
	return formula; 

}

function generateHint(conf){
	var hints = conf.hints;
	return hints;
}

module.exports = router;
