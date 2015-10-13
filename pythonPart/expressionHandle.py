import sys
import numpy as np
import os
import os.path
from scipy import *
from py_expression_eval import Parser
import json
from copy import deepcopy
from sheetHandle import generateNumpyArray
from sheetHandle import generateSheetByNSheet
from sheetHandle import getNColumnByVarName
from sheetHandle import appendSheetnewArr

sys.path.append("")
sys.path.append("method")

# def generateNumpyArray(sheet):
#     colNum = sheet['colNum']
#     rowNum = sheet['rowNum']
#     matrix = sheet['matrix']
#     nSheet = np.zeros((rowNum, colNum), float32)

#     for i in range(0, rowNum):
#         for j in range(0, colNum):
#             ele = matrix[i][j]
#             dataStr = ele["data"]
#             data = float(dataStr);
#             nSheet[i][j] = data
#     print "nSheet :--------------------"
#     print nSheet

#     return nSheet

# def generateSheetByNSheet(nSheet, sheet, targetVarName):
#     shape = nSheet.shape
#     nRowNum = sharp[0]
#     nColNum = sharp[1]
#     colNum = sheet['colNum']
#     rowNum = sheet['rowNum']
#     matrix = sheet['matrix']

# def getNColumnByVarName(varName, sheet, nSheet):
#     colNum = sheet['colNum']
#     rowNum = sheet['rowNum']
#     matrix = sheet['matrix']

#     for i in range(0, colNum):
#         ele = matrix[0][i]
#         if varName == ele['colHeaderName']:
#             return nSheet[:, i]

# def appendSheetnewArr(targetVarName, sheet, newArr):
#     colNum = sheet['colNum']
#     sheet['colNum'] = colNum + 1;
#     rowNum = sheet['rowNum']
#     matrix = sheet['matrix']        
#     elePattern = {u'writeable': False, u'colHeaderName': u'', u'dataType': u'integer', u'init': True, u'rowHeaderName': u'', u'data': u''}   
#     for i in range(0, rowNum):
#         ele = elePattern
#         ele['colHeaderName'] = targetVarName
#         ele['data'] = str(newArr[i])
#         print "ele : ", ele
#         sheet['matrix'][i].append(deepcopy(ele))

#     print sheet

#fn(gyzsf_jiZhiFa)(x, y)
def parseExpressionMethodAndArgList(expression, srcVarName, parameteList):
    print("expression === ", expression)
    print("parameteList === ", parameteList)
    tmp = expression.strip()
    tmp = tmp[3:]
    npos = tmp.index(")")
    method = tmp[:npos]
    parameteList.insert(0, srcVarName)
    #npos = tmp.index("(")
    # argListStr = tmp[npos+1:-1]
    # argList = argListStr.split(',');
    # for i in range(0, len(argList)):
    #     argList[i] = argList[i].strip()


    print "method : ", method
    print "argList :", parameteList
    return method, parameteList



def computingFnSheet(targetVarName, srcVarName, expression, parameteList, sheet, nSheet):

    tmp = parseExpressionMethodAndArgList(expression, srcVarName, parameteList)
    methodName = tmp[0]
    argList = tmp[1]
    callFunction = methodName


    module = __import__(methodName, globals(), locals(), [callFunction])
    ds = getattr(module, callFunction)
    res = ds(targetVarName, expression, argList, sheet, nSheet)
    print "execute result : ", res
    return res

def computingnSheet(targetVarName, srcVarName, expression, parameteList, sheet, nSheet):
    if("fn(" in expression):
        return computingFnSheet(targetVarName, srcVarName, expression, parameteList, sheet, nSheet)
        #return True, sheet;
    else:
        parser = Parser()
        expr = parser.parse(expression)
        varList = expr.variables()
        varDic = {}
        for var in varList:
            [res, colArr] = getNColumnByVarName(var, sheet, nSheet)
            if(False == res):
                return False, sheet
            else:
                print "colArr = ", var, " : ", colArr
                varDic[var] = colArr

        print varDic    


        newCol = parser.evaluate(expression, varDic)
        print "newCol : ", newCol

        appendSheetnewArr(targetVarName, sheet, newCol)

        return True, sheet





def expressionHandle(targetVarName, srcVarName, expression, parameteList, sheet):
    nSheet = generateNumpyArray(sheet)
    [res, newSheet, reason] = computingnSheet(targetVarName, srcVarName, expression, parameteList, sheet, nSheet)
    newSheetJson =  json.dumps(newSheet)
    return res, newSheetJson, reason
    
