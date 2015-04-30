var express = require('express');
var router = express.Router();
var fs = require('fs');
var zmq = require('zmq');

/* GET users listing. */
router.post('/', function(req, res, next) {

	var submitBody = req.body;
	console.info("targetVarName = ", submitBody.targetVarName);
	console.info("expression = ", submitBody.expression);
	console.info("matrix = ", submitBody.matrix);
	var submitBodyString = JSON.stringify(submitBody);
	/*
	var path = "public/dataSave/" + saveInfo.fileName;
	
	fs.writeFile(path, JSON.stringify(saveInfo.matrix), function(err) {
		if(err) {
			console.log(err);
		} else {
			console.log("The file was saved!");
		}
	}); 
	*/
  //res.send('save success');

  	function sendResBack(res, resultMsg)
  	{
  		console.info("here message back from python:", resultMsg);
  		res.send(resultMsg);
  	}

  	sendMsg2Py(submitBodyString, sendResBack, res);
});

function sendMsg2Py(msg, callback, res) 
{
    var requester = zmq.socket('req');
    requester.on("message", function(reply) 
    {
      //console.log("Received reply", x, ": [", reply.toString(), ']');
      callback(res, reply.toString());
      requester.close();
      //process.exit(0);
    });
    requester.connect("tcp://localhost:5556");
    requester.send(msg);
}

module.exports = router;
