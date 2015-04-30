import json
import zmq
import time
import sys
from validateMathExpression import validateMathExpression
from expressionHandle import expressionHandle


def parseMsg(jsonStr):
    returnVar = {"result":"", "matrix":""}
    jsonObj = json.loads(jsonStr)
    #print json.dumps(jsonObj)

    targetVarName = jsonObj["targetVarName"]
    expression = jsonObj["expression"]


    sheet = jsonObj["matrix"]
    colNum = sheet['colNum']
    rowNum = sheet['rowNum']
    matrix = sheet['matrix']

    for i in range(0, rowNum):
        for j in range(0, colNum):
            print "matrix [%d][%d] : %s" % (i, j, matrix[i][j]);

    if True != validateMathExpression(targetVarName, expression, sheet):
        returnVar["result"] = "validate Mathexpression failed"
        returnVar["matrix"] = ""
        return returnVar    

    res = expressionHandle(targetVarName, expression, sheet)
    if True != res[0]:
        returnVar["result"] = "expressionHandle failed"
        returnVar["matrix"] = ""
        return returnVar
    else:
        returnVar["result"] = "success"
        returnVar["matrix"] = jsonStr
        return returnVar
                


port = "5556"
if len(sys.argv) > 1:
    port = sys.argv[1]
    int(port)

context = zmq.Context()
socket = context.socket(zmq.REP)
socket.bind("tcp://*:%s" % port)


while True:
    #  Wait for next request from client
    message = socket.recv()
    resultMsg = parseMsg(message)
    #print "Received request: ", message
    # time.sleep(1)
    #socket.send("World from %s" % port)
    socket.send(json.dumps(resultMsg));    