#-*- coding:utf-8 -*-
from scipy import *
import numpy as np
from sheetHandle import generateNumpyArray
from sheetHandle import generateSheetByNSheet
from sheetHandle import getNColumnByVarName
from sheetHandle import appendSheetnewArr


def getXib(colList, positive):
    if(positive == "1"):
        return np.max(colList)
    else:
        return np.min(colList)

def getNewColArr(colList, positive, xib):
    if(positive == "1"):
        for i in range(0, len(colList)):
            colList[i] = colList[i]/xib
    else:
        for i in range(0, len(colList)):
            colList[i] = xib/colList[i]

    return colList


def verify(targetVarName, expression, argList, sheet, nSheet):
    print "in gyzsf_jiZhiFa verify"
    [res, colArr] = getNColumnByVarName(argList[0], sheet, nSheet)
    if(False == res):
        return False, "incorrect data source"
    
    print "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"
    for x in np.nditer(colArr):
        if (x == 0):
            errorReason = "gyzsf_jiZhiFa does not allow " + argList[0] + "has 0 to be elements"
            return False, errorReason
    print "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkend"    

    return True, ""



def gyzsf_jiZhiFa(targetVarName, expression, argList, sheet, nSheet):
    print "execute gyzsf_jiZhiFa"
    print "targetVarName: ", targetVarName
    print "argList :", argList
    print "sheet: ", sheet
    print "nSheet :", nSheet

    verifyRes = verify(targetVarName, expression, argList, sheet, nSheet)
    if(False == verifyRes[0]):
        return False, sheet, verifyRes[1];


    [res, colArr] = getNColumnByVarName(argList[0], sheet, nSheet)
    if(False == res):
        return False, 0, "incorrect data source"
    else:
        print "colArr = ", var, " : ", colArr

    xib = getXib(colArr, argList[1])

    newCol = getNewColArr(colArr, argList[1], xib)

    print "newCol :", newCol

    appendSheetnewArr(targetVarName, sheet, newCol)

    return True, sheet, ""




