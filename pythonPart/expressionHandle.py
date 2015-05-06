import sys
import numpy as np
import os
import os.path
from scipy import *
from py_expression_eval import Parser
import json
from copy import deepcopy

def generateNumpyArray(sheet):
    colNum = sheet['colNum']
    rowNum = sheet['rowNum']
    matrix = sheet['matrix']
    nSheet = np.zeros((rowNum, colNum), float32)

    for i in range(0, rowNum):
        for j in range(0, colNum):
            ele = matrix[i][j]
            dataStr = ele["data"]
            data = float(dataStr);
            nSheet[i][j] = data
    print "nSheet :--------------------"
    print nSheet

    return nSheet

def generateSheetByNSheet(nSheet, sheet, targetVarName):
    shape = nSheet.shape
    nRowNum = sharp[0]
    nColNum = sharp[1]
    colNum = sheet['colNum']
    rowNum = sheet['rowNum']
    matrix = sheet['matrix']

def getNColumnByVarName(varName, sheet, nSheet):
    colNum = sheet['colNum']
    rowNum = sheet['rowNum']
    matrix = sheet['matrix']

    for i in range(0, colNum):
        ele = matrix[0][i]
        if varName == ele['colHeaderName']:
            return nSheet[:, i]

def appendSheetnewArr(targetVarName, sheet, newArr):
    colNum = sheet['colNum']
    sheet['colNum'] = colNum + 1;
    rowNum = sheet['rowNum']
    matrix = sheet['matrix']        
    elePattern = {u'writeable': False, u'colHeaderName': u'', u'dataType': u'integer', u'init': True, u'rowHeaderName': u'', u'data': u''}   
    for i in range(0, rowNum):
        ele = elePattern
        ele['colHeaderName'] = targetVarName
        ele['data'] = str(newArr[i])
        print "ele : ", ele
        sheet['matrix'][i].append(deepcopy(ele))

    print sheet

def computingnSheet(targetVarName, expression, sheet, nSheet):
    parser = Parser()
    expr = parser.parse(expression)
    varList = expr.variables()
    varDic = {}
    for var in varList:
        colArr = getNColumnByVarName(var, sheet, nSheet)
        print "colArr = ", var, " : ", colArr
        varDic[var] = colArr

    print varDic    


    newCol = parser.evaluate(expression, varDic)
    print "newCol : ", newCol

    appendSheetnewArr(targetVarName, sheet, newCol)

    return sheet





def expressionHandle(targetVarName, expression, sheet):
    nSheet = generateNumpyArray(sheet)
    #newSheet = computingnSheet(targetVarName, 'kkk + bbb + ccc', sheet, nSheet)
    newSheet = computingnSheet(targetVarName, expression, sheet, nSheet)
    newSheetJson =  json.dumps(newSheet)
    return True, newSheetJson
    