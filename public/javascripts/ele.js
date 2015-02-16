function eleDataTypeEnume()
{
    this.datatypeEnume = 
    [
        {
            name: "zhengshu",
            comment: "this is zhengshu",
            validate: function fun(n)
            {
                return (Number(n)===n && n%1===0);
            }
        },
        {
            name: "xiaoshu",
            comment: "this is xiaoshu",
            validate: function fun(n)
            {
				var res = parseFloat(n);
				if(isNaN(res))
				{
					return false;
				}
				else
				{
					return true;
				}
                
            }
        },
        {
            name: "zifuchang",
            comment: "this is zifuchang",
            validate: function fun(n)
            {
                if(n.length == 0)
                {
                    return false;
                }
                return true;
            }
        },
        {
            name: "qujianshu",
            comment: "this is qujianshu",
            validate: function fun(n)
            {
                var arr = n.split("-");
                if (arr.length != 2)
                {
                    return false;
                }
                for (e in arr)
                {
                    if(Number(e) != e)
                    {
                        return false;
                    }
                }
                return true;
            }
        },
        {
            name: "undefine",
            comment: "this is undefine data",
            validate: function fun(n)
            {
                return true;
            }
        }
    ]

    this.getDatatypeByName = function(name)
    {
        for(t in this.typeEnume)
        {
            if(name == t.name)
            {
                return t;
            }
        }
        return null;
    }

    this.getDataTypeCommentByName = function(name)
    {
        for(t in this.typeEnume)
        {
            if(name == t.name)
            {
                return t.comment;
            }
        }
        return "";
    }

    this.getDatatypeNameList = function()
    {
        var list = [];
        for (t in this.typeEnume)
        {
            list.push(t.name);
        }
        return list;
    }

    this.getUseableDatatypeNameList = function()
    {
        var list = [];
        for(i = 0; i < this.datatypeEnume.length; i++)
        {
            var e = this.datatypeEnume[i];
            if('undefine' != e.name)
            {
                list.push(e.name);
            }
        }
        return list;
    }

    this.checkDataValide = function(data, type)
    {
        var i = 0;
        for(i = 0; i < this.datatypeEnume.length; i++)
        {
            var e = this.datatypeEnume[i];
            if(type == e.name)
            {
                console.info("----type ", type, "e.name", e.name, "data = ", data)
                if(true == e.validate(data))
                {
                    return true;
                }
            }
        }
        return false;

    }
    this.isRealDataTypeValide = function(type)
    {
        var i = 0;
        for(i = 0; i < this.datatypeEnume.length; i++)
        {
            var e = this.datatypeEnume[i];
            if(type == e.name)
            {
                if(type == "zhengshu" || type == "xiaoshu" || type == "qujianshu")
                {
                    return true;
                }
            }
        }
        return false;
    }

};

var g_eleType = new eleDataTypeEnume();


	

function cellTypeEnume()
{
    this.cellEnume = 
    [
        {
            type: "blank",
            editable: false,
        },
        {
            type: "colHeader",
            editable: false,
        },
        {
            type: "rowHeader",
            editable: false,
        },
        {
            type: "colRW",
            editable: false,
        },
        {
            type: "rowRW",
            editable: false,
        },
        {
            type: "data", 
            editable: true,
        }

    ]

    this.checkCellTypeValide = function(type)
    {
        var i = 0;
        for(i = 0; i < this.cellEnume.length; i++)
        {
            var e = this.cellEnume[i];
            if(type == e.type)
            {
                return true;
            }

        }
        return false;
    }
}

var g_cellType = new cellTypeEnume();

function checkEleValide(ele)
{
    //console.info("checkEleValide = ", 
    //    ele.cellType, ele.dataType, ele.colHeaderName, ele.rowHeaderName, ele.data);
    if(false == g_cellType.checkCellTypeValide(ele.cellType))
    {
        console.info("111");
        return false;
    }

    if(false == g_eleType.checkDataValide(ele.data, ele.dataType))
    {
        console.info("112");
        return false;
    }
    return true;
}

function ele()
{
    this.cellType = "";
    this.dataType = "";
    this.colHeaderName = "";//for the column headerName
    this.rowHeaderName = "";//for the row headerName
    this.data = "";//data all store by string

    this.setEle = function(cellType, dataType, colHeaderName, rowHeaderName, data, i, j)
    {
        this.cellType = cellType;
        this.dataType = dataType;
        this.colHeaderName = colHeaderName;
        this.rowHeaderName = rowHeaderName;
        this.data = data;
        //console.info("in setEle [",i,"][",j,"]", this);
        if(false == checkEleValide(this))
        {
            console.info("11");
            return false;
        }
        else
        {
            console.info("12");
            return true;
        }
       return true;
    }

}

//var g_rightWeight = new rightWeight();

function myMatrix()
{
    this.colNum = 2;
    this.rowNum = 2;
    this.dataColNum = this.colNum - 2;
    this.dataRowNum = this.rowNum - 2;
    this.matrix = [];
	this.currentColRWMethod = null;
	this.currentRowRWMethod = null;
	
	
	this.loadData = function(colNum, rowNum, currentColRWMethod, currentRowRWMethod, matrix)
	{
		this.colNum = colNum;
		this.rowNum = rowNum;
		this.currentColRWMethod = currentColRWMethod;
		this.currentRowRWMethod = currentRowRWMethod;
		this.matrix = matrix;
	}

    this.initMatrix = function(x, y)
    {
        this.colNum = x + 2;
        this.rowNum = y + 2;
        var i = 0;
        var j = 0;
        this.matrix = new Array();
        for(i = 0; i < this.rowNum; i++)
        {
            this.matrix[i] = new Array();
            for(j = 0; j < this.colNum; j++)
            {
                var e = new ele()
                var res = true;
                if(i < 2 && j < 2)//the blank area
                {
                    res = e.setEle("blank", "undefine", "", "", "NULL", i, j);
                }
                else if(i == 0 && j >= 2)//colHeader
                {
                    res = e.setEle("colHeader", "zifuchang", "", "", "col"+(j-2).toString(), i, j);
                }
                else if(j == 0 && i >= 2)//rowHeader
                {
                    res = e.setEle("rowHeader", "zifuchang", "", "", "row"+(i-2).toString(), i, j);
                }
                else if(i == 1 && j >= 2)//colRW
                {
                    res = e.setEle("colRW", "xiaoshu", "col"+(j-2).toString(), "", "0.00", i, j);
                }
                else if(j == 1 && i >= 2)//rowRW
                {
                    res = e.setEle("rowRW", "xiaoshu", "", "row"+(i-2).toString(), "0.00", i, j);
                }
                else
                {
                    res = e.setEle("data", "xiaoshu", "col"+(j-2).toString(), "row"+(i-2).toString(), "0.00", i, j);
                }
                
                //var res 
                if(false == res)
                {
                    console.error("incorrect ele data");
                    return false;
                }
                else
                {
                    var jsonStr = JSON.stringify(e);
                    this.matrix[i][j] = jsonStr;
                    //console.info("this.matrix[",i,"][",j,"] = ",this.matrix[i][j]);
                }
            }
        }
        return true;

    }
	
	this.generateJsonData = function()
	{
		var jsonFormatTable = JSON.stringify(this.matrix);
		console.info("********************************************");
		console.info(jsonFormatTable);
		console.info("********************************************");
	}

	/*
    this.modifyCell = function(rowNo, colNo, jsonStr)
    {
        this.matrix[rowNo][colNo] = jsonStr;
        return true;

    }
	*/
	
	this.modifyPureData = function(rowNo, colNo, data, dataType)
	{
		if(rowNo < 2 || rowNo > this.rowNum)
		{
			console.error("incorrect rowNo", rowNo);
			return false;
		}
		
		if(colNo < 2 || colNo > this.colNum)
		{
			console.error("incorrect colNo", colNo);
			return false;
		}
		
		if(false == g_eleType.checkDataValide(data, dataType))
		{
			console.error("incorrect data", data, "unfit type", dataType);
			{
				return false;
			}
		}
		
		var e = JSON.parse(this.matrix[rowNo][colNo]);
		e.data = data;
		this.matrix[rowNo][colNo] = JSON.stringify(e);
		return true;
		
		
		
	}
	
	this.modifyColumnHeader = function(colNo, newColName, dataType)//call by change column header
	{
		if(colNo < 2 || colNo > this.colNum)
		{
			console.error("incorrect colNo", colNo);
			return false;
		}
		
		if(false == g_eleType.isRealDataTypeValide(dataType))
        {
            console.error("incorrect data type", dataType);
            return false;
        }
		
		var i = 0;
		
        
			for(i = 0; i < this.rowNum; i++)
			{
				var e = JSON.parse(this.matrix[i][colNo]);
				if(i == 0)//the column header line
				{
					e.data = newColName;
				}
				else if(i == 1)//weight line
				{
					//do nothing
				}
				else
				{
					e.colHeaderName = newColName;
					e.dataType = dataType;
				}
				this.matrix[i][colNo] = JSON.stringify(e);
			}
        
		return true;
	}
	
	this.modifyRowHeader = function(rowNo, newRowName)//call by change row header
	{
		if(rowNo < 2 || rowNo > this.rowNum)
		{
			console.error("incorrect rowNo", rowNo);
			return false;
		}
		
		
		var i = 0;
		
        
			for(i = 0; i < this.colNum; i++)
			{
				var e = JSON.parse(this.matrix[rowNo][i]);
				if(i == 0)//the row header line
				{
					e.data = newRowName;
				}
				else if(i == 1)//weight line
				{
					//do nothing
				}
				else
				{
					e.rowHeaderName = newRowName;
				}
				this.matrix[rowNo][i] = JSON.stringify(e);
			}
        
		return true;
	}

    this.moveCol = function(srcColNo, destColNo)
    {
        if(srcColNo < 2 || destColNo < 2)
        {
            console.error("moveCol, incorrect srcColNo:", srcColNo,  "or destColNo:", destColNo);
            return false;
        }
        var i = 0;
        var j = 0;
        var tempCol = [];
        for(i = 0; i < this.rowNum; i++)
        {
            tempCol[i] = this.matrix[i][srcColNo];
        }

        if(srcColNo < destColNo)
        {
            for(i = srcColNo; i < destColNo; i++)
            {
                for(j = 0; j < this.rowNum; j++)
                {
                    this.matrix[j][i] = this.matrix[j][i + 1];
                }
            }
        }
        else
        {
            for(i = srcColNo; i > destColNo; i--)
            {
                for(j = 0; j < this.rowNum; j++)
                {
                    this.matrix[j][i] = this.matrix[j][i - 1];
                }
            }
        }

        for(i = 0; i < this.rowNum; i++)
        {
            this.matrix[i][destColNo] = tempCol[i];
        }


    }


    this.moveRow = function(srcRowNo, destRowNo)
    {
        if(srcRowNo < 2 || destRowNo < 2)
        {
            console.error("moveRow, incorrect srcRowNo:", srcRowNo,  "or destRowNo:", destRowNo);
            return false;
        }
        var i = 0;
        var j = 0;
        var tempRow = [];
        for(i = 0; i < this.colNum; i++)
        {
            tempRow[i] = this.matrix[srcRowNo][i];
        }

        if(srcRowNo < destRowNo)
        {
            for(i = srcRowNo; i < destRowNo; i++)
            {
                for(j = 0; j < this.colNum; j++)
                {
                    this.matrix[i][j] = this.matrix[i + 1][j];
                }
            }
        }
        else
        {
            for(i = srcRowNo; i > destRowNo; i--)
            {
                for(j = 0; j < this.colNum; j++)
                {
                    this.matrix[i][j] = this.matrix[i - 1][j];
                }
            }
        }

        for(i = 0; i < this.colNum; i++)
        {
            this.matrix[destRowNo][i] = tempRow[i];
        }


    }


    this.printMatrix = function()
    {
        var i = 0;
        var j = 0;
        for(i = 0; i < this.rowNum; i++)
        {
            for(j = 0; j < this.colNum; j++)
            {
                console.info("matrix[", i, "][", j, "] = ", this.matrix[i][j]);
            }
        }
    }

    this.getPureDataMatrix = function()
    {
        var i = 0;
        var j = 0;
		this.setMatrixColRW();
		this.setMatrixRowRW();
        var dataMatrix = new Array();
        for(i = 0; i < this.rowNum; i++)
        {
            dataMatrix[i] = new Array();
            for(j = 0; j < this.colNum; j++)
            {
                var e = JSON.parse(this.matrix[i][j]);
                dataMatrix[i][j] = e.data;
            }
        }
        return dataMatrix;
    }
	
	this.getUsefulPureDataMatrix = function()
    {
        var i = 0;
        var j = 0;

        var usefulDataMatrix = new Array();
        for(i = 0; i < this.rowNum - 2 ; i++)
        {
            usefulDataMatrix[i] = new Array();
            for(j = 0; j < this.colNum - 2; j++)
            {
                var e = JSON.parse(this.matrix[i + 2][j + 2]);
                usefulDataMatrix[i][j] = e.data;
            }
        }
        return usefulDataMatrix;
    }

    this.isColHeaderNameExist = function(colHeaderName)
    {
        var i = 0;
        for(i = 2; i < this.colNum; i++)
        {
            var e = JSON.parse(this.matrix[0][i]);
            if(colHeaderName == e.data)//for colHeader cell, colHeaderName store in data field
            {
                return true;
            }
        }
        return false;
    }

    this.isRowHeaderNameExist = function(rowHeaderName)
    {
        var i = 0;
        for(i = 2; i < this.rowNum; i++)
        {
            var e = JSON.parse(this.matrix[i][0]);
            if(rowHeaderName == e.data)//for rowHeader cell, rowHeaderName store in data field
            {
                return true;
            }
        }
        return false;
    }


    this.copyCurrentMatrix = function()
    {
        var copyMatrix = this.matrix;
        return copyMatrix;
    }

    this.getColHeaderNameByColNo = function(colNo)
    {
        var e = JSON.parse(this.matrix[0][colNo]);
        return e.data;
    }

    this.getRowHeaderNameByRowNo = function(rowNo)
    {
        var e = JSON.parse(this.matrix[rowNo][0]);
        return e.data;
    }

    this.getDataTypeByColNo= function(colNo, copyMatrix)//put copyMatrix here, since row2 could be just the insert row
    {
        var e = JSON.parse(copyMatrix[2][colNo]);
        return e.dataType;
    }

    this.insertCol = function(colNo, colHeaderName, dataType)
    {
        console.info("--------insert col colNo:", colNo, "colHeaderName:", colHeaderName, "dataType:", dataType, "------------------");
        if(this.colNum <= 2 || this.rowNum <= 2)
        {
            console.error("matrix is not init yet");
            return false;
        }
        if(colNo < 2 || colNo > this.colNum)
        {
            console.error("incorrect colNo", colNo);
            return false;
        }
        if(true == this.isColHeaderNameExist(colHeaderName))
        {
            console.error("colHeaderName ", colHeaderName, "already exist");
            return false;
        }
        if(false == g_eleType.isRealDataTypeValide(dataType))
        {
            console.error("incorrect data type", dataType);
            return false;
        }

        var copyMatrix = this.copyCurrentMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        
        this.initMatrix(oldColNum + 1 - 2, oldRowNum - 2);

        for(i = 0; i < this.rowNum; i++)
        {

            for(j = 0; j < this.colNum; j++)
            {
                
                if(j > colNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j - 1];
                }
                else if(j < colNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j];
                }
                else
                {
                    //console.info("tttttttttttttttttttttttttttttttt");
                    var e = new ele();
                    if(i == 0)//header
                    {
                        res = e.setEle("colHeader", "zifuchang", "", "", colHeaderName, i,j);
                    }
                    else if(i == 1)//colRW
                    {
                        res = e.setEle("colRW", "xiaoshu", colHeaderName, "", "0.01", i, j);
                    }
                    else//data
                    {
                        console.info("here.....");
                        res = e.setEle("data", dataType, colHeaderName, this.getRowHeaderNameByRowNo(i), "0.02", i, j);
                    }

                    //console.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

                    if(false == res)
                    {
                        console.info("incorrect new insert data");
                        return false;
                    }
                    this.matrix[i][j] = JSON.stringify(e);

                }
            }
        }
        return true;
 
    }

    this.insertRow = function(rowNo, rowHeaderName)
    {
        console.info("--------insert row rowNo:", rowNo, "rowHeaderName:", rowHeaderName, "------------------");
        if(this.colNum <= 2 || this.rowNum <= 2)
        {
            console.error("matrix is not init yet");
            return false;
        }
        if(rowNo < 2 || rowNo >= this.rowNum)
        {
            console.error("incorrect rowNo", rowNo);
            return false;
        }
        if(true == this.isRowHeaderNameExist(rowHeaderName))
        {
            console.error("rowHeaderName ", rowHeaderName, "already exist");
            return false;
        }

        var copyMatrix = this.copyCurrentMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        
        this.initMatrix(oldColNum - 2, oldRowNum + 1 - 2);

        for(i = 0; i < this.rowNum; i++)
        {
            for(j = 0; j < this.colNum; j++)
            {
                if(i > rowNo)
                {
                    this.matrix[i][j] = copyMatrix[i - 1][j];
                }
                else if(i < rowNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j];
                }
                else
                {
                    //console.info("tttttttttttttttttttttttttttttttt");
                    var e = new ele();
                    if(j == 0)//header
                    {
                        res = e.setEle("rowHeader", "zifuchang", "", "", rowHeaderName, i,j);
                    }
                    else if(j == 1)//rowRW
                    {
                        res = e.setEle("rowRW", "xiaoshu", "", rowHeaderName, "0.01", i, j);
                    }
                    else//data
                    {
                        res = e.setEle("data", this.getDataTypeByColNo(j, copyMatrix), 
                            this.getColHeaderNameByColNo(j), rowHeaderName, "0.02", i, j);
                    }
                    //console.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");

                    if(false == res)
                    {
                        console.info("incorrect new insert data");
                        return false;
                    }
                    this.matrix[i][j] = JSON.stringify(e);

                }
            }
        }
        return true;
 
    }


    this.deleteCol = function(colNo)
    {   
        console.info("----------------deleteCol colNo: ", colNo, "----------------------");
        if(this.colNum <= 2 || this.rowNum <= 2)
        {
            console.error("matrix is not init yet");
            return false;
        }


        if(colNo < 2 || colNo > this.colNum)
        {
            console.error("incorrect colNo", colNo);
            return false;
        }
        var copyMatrix = this.copyCurrentMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        var i = 0;
        var j = 0;

        this.initMatrix(oldColNum - 1 - 2, oldRowNum - 2);

        for(i = 0; i < this.rowNum; i++)
        {
            for(j = 0; j < oldColNum; j++)
            {

                if(j > colNo)
                {
                    this.matrix[i][j - 1] = copyMatrix[i][j];
                }
                else if(j < colNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j];
                }
                else
                {
                    //do nothing
                }
            }
        }
        return true;

    }

    this.deleteRow = function(rowNo)
    {   

        console.info("----------------deleteRow rowNo: ", rowNo, "----------------------");
        if(this.colNum <= 2 || this.rowNum <= 2)
        {
            console.error("matrix is not init yet");
            return false;
        }


        if(rowNo < 2 || rowNo > this.rowNum)
        {
            console.error("incorrect rowNo", rowNo);
            return false;
        }
        var copyMatrix = this.copyCurrentMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        var i = 0;
        var j = 0;


        this.initMatrix(oldColNum - 2, oldRowNum - 1 - 2);

        for(i = 0; i < oldRowNum; i++)
        {
            for(j = 0; j < this.colNum; j++)
            {
                if(i > rowNo)
                {
                    this.matrix[i - 1][j] = copyMatrix[i][j];
                }
                else if(i < rowNo)
                {
                    this.matrix[i][j] = copyMatrix[i][j];
                }
                else
                {
                    //do nothing
                }
            }
        }
        return true;

    }

    this.getCellByColNoAndRowNo = function(rowNo, colNo)
    {
        if(rowNo >= this.rowNum || colNo >= this.colNum)
        {
            return "";
        }

        return this.matrix[rowNo][colNo];

    }

	this.getColumnNum = function()
	{
		return this.colNum;
	}
	
	this.getRowNum = function()
	{
		return this.rowNum;
	}
	
	this.setCurrentColRWMethod = function(method)
	{
		this.currentColRWMethod = method;
	}
	
	this.setCurrentRowRWMethod = function(method)
	{
		this.currentRowRWMethod = method;
	}
	
	this.getCurrentColRWMethod = function()
	{
		return this.currentColRWMethod;
	}
	
	this.getCurrentRowRWMethod = function()
	{
		return this.currentRowRWMethod;
	}
	
	this.setMatrixColRW = function()
    {
		console.info("entry setMatrixColRW : ", this.colNum);
        var methodName = this.getCurrentColRWMethod();
		var g_rightWeight = new rightWeight();
		var method = g_rightWeight.getRightWeightMethod(methodName);
		if(null != method)
		{
			var colRwArr = method.method(this.matrix, this.colNum - 2, this.rowNum - 2, 1);
			console.info("colRwArr :", colRwArr);
			var i = 0;
			for (i = 2; i < this.colNum; i++)
			{
				var e = new ele()
				var res = e.setEle("colRW", "xiaoshu", 
					this.getColHeaderNameByColNo(i), "", colRwArr[i - 2].toString(), 1, i);
				//console.info("RW: e = ", e);
				var jsonStr = JSON.stringify(e);
                this.matrix[1][i] = jsonStr;
			}
			return true;
		}
		else
		{
			console.error("setMatrixColRW error");
			return false;
		}

   }
   
   this.setMatrixRowRW = function()
    {
		console.info("entry setMatrixRowRW : ", this.rowNum);
        var methodName = this.getCurrentRowRWMethod();
		var g_rightWeight = new rightWeight();
		var method = g_rightWeight.getRightWeightMethod(methodName);
		if(null != method)
		{
			var rowRwArr = method.method(this.matrix, this.colNum - 2, this.rowNum - 2, 0);
			console.info("rowRwArr :", rowRwArr);
			var i = 0;
			for (i = 2; i < this.rowNum; i++)
			{
				var e = new ele()
				var res = e.setEle("rowRW", "xiaoshu", 
					"", this.getRowHeaderNameByRowNo(i), rowRwArr[i - 2].toString(), i, 1);
				//console.info("RW: e = ", e);
				var jsonStr = JSON.stringify(e);
                this.matrix[i][1] = jsonStr;
			}
			return true;
		}
		else
		{
			console.error("setMatrixRowRW error");
			return false;
		}

   }


};

/*

var myData = new myMatrix();
myData.initMatrix(2, 3);
myData.printMatrix();
console.info("pure data = ");
console.info(myData.getPureDataMatrix());

myData.insertCol(2, "newInsert", "xiaoshu");
myData.printMatrix();
console.info("after pure data = ");
console.info(myData.getPureDataMatrix());

myData.insertCol(4, "new2Insert", "xiaoshu");
myData.printMatrix();
console.info("after pure data = ");
console.info(myData.getPureDataMatrix());

myData.deleteCol(3);
myData.printMatrix();
console.info("after pure data = ");
console.info(myData.getPureDataMatrix());

myData.insertRow(2, "newRow");
myData.printMatrix();
console.info("after pure data = ");
console.info(myData.getPureDataMatrix());

myData.deleteRow(3);
myData.printMatrix();
console.info("after pure data = ");
console.info(myData.getPureDataMatrix());
*/
