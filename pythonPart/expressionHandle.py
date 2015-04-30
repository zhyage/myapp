import sys
import numpy as np
import os
import os.path
from scipy import *

def generateNumpyArray(sheet):
    colNum = sheet['colNum']
    rowNum = sheet['rowNum']
    matrix = sheet['matrix']
    nSheet = np.zeros((rowNum, colNum + 1), float32)

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
    sharp = nSheet.sharp
    nRowNum = sharp[0]
    nColNum = sharp[1]
    colNum = sheet['colNum']
    rowNum = sheet['rowNum']
    matrix = sheet['matrix']

    




def expressionHandle(targetVarName, expression, sheet):
    generateNumpyArray(sheet)
    return True, ""