

function cellTypeEnume()
{
    this.cellEnume = 
    [
        {
            type: "blank",
            editable: false,
            color:"grey",
        },
        {
            type: "colHeader",
            editable: false,
            color:"yellow",
        },
        {
            type: "rowHeader",
            editable: false,
            color: "yellow",
        },
        {
            type: "colRW",
            editable: false,
            color: "black",
        },
        {
            type: "rowRW",
            editable: false,
            color: "black",
        },
        {
            type: "data", 
            editable: true,
            color: "white",
        },
        
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

function eleDataTypeEnume()
{
    this.datatypeEnume = 
    [
        {
            name: "integer",
            comment: "this is an integer",
            validate: function fun(n)
            {
                var tmp = Number(n);
                return (tmp.toString()===n && tmp%1===0);
            }
        },
        {
            name: "float",
            comment: "this is float",
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
            name: "string",
            comment: "this is string",
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
            name: "region",
            comment: "this is region",
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
                //console.info("----type ", type, "e.name", e.name, "data = ", data)
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

    this.checkDataTypeValide = function(dataType)
    {
        var i = 0;
        for(i = 0; i < this.datatypeEnume.length; i++)
        {
            var e = this.datatypeEnume[i];
            if(dataType == e.name)
            {
                return true;
            }
        }
        console.error("checkDataTypeValide error dataType : ", dataType);
        return false;
    }


};

var g_eleType = new eleDataTypeEnume();


function ele()
{
    this.init = false;//just for hold the place, no real data be set
    this.dataType = "";
    this.colHeaderName = "";//for the column headerName
    this.rowHeaderName = "";//for the row headerName
    //this.posX = 0;
    //this.posY = 0;
    this.writeable = false;
    this.data = "";//data all store by string


    this.setEleColHeaderName = function(colHeaderName)
    {
        this.colHeaderName = colHeaderName;
        return true;
    }
    this.setEleRowHeaderName = function(rowHeaderName)
    {
        this.rowHeaderName = rowHeaderName;
        return true;
    }
    /*
    this.setElePos = function(x, y)
    {
        this.posX = x;
        this.posY = y;
        return true;
    }
    */
    this.setEleWriteable = function(writeable)
    {
        this.writeable = writeable;
        return true;
    }
    this.setEleData = function(dataType, data, init)
    {
        if(init == false)
        {
            this.data = "";
            if(false == g_eleType.checkDataTypeValide(dataType))
            {
                return false;
            }
            this.dataType = dataType;
            return true;
        }
        else
        {
            if(false == g_eleType.checkDataValide(data, dataType))
            {
                console.info("error to checkDataValide data: ", data, "dataType :", dataType);
                return false;
            }
            this.init = true;
            this.data = data;
            this.dataType = dataType;
            return true;
        }
    }

    this.setEle = function(dataType, colHeaderName, rowHeaderName, data, x, y)
    {  
        var res = this.setEleColHeaderName(colHeaderName)&
                    this.setEleRowHeaderName(rowHeaderName)&
                    this.setEleData(dataType, data, true);
        if(false == res)
        {
            console.info("setEle res : false");
        }
        else
        {
            console.info("setEle res: true");
        }
        return res;
    }

    this.createEle = function(dataType, colHeaderName, rowHeaderName, x, y)//hold the ele place.
    {
        var res = this.setEleColHeaderName(colHeaderName)&
                    this.setEleRowHeaderName(rowHeaderName)&
                    this.setEleData(dataType, "", false);
        if(false == res)
        {
            console.info("createEle res : false");
        }
        else
        {
            console.info("createEle res: true");
        }
        return res;
    }
}


function matrix()
{
    this.colNum = 0;
    this.rowNum = 0;
    this.matrix = [];


    this.initMatrix = function(x, y)
    {
        this.colNum = x;
        this.rowNum = y;
        var i = 0;
        var j = 0;
        this.matrix = new Array();
        for(i = 0; i < this.rowNum; i++)
        {
            this.matrix[i] = new Array();
            for(j = 0; j < this.colNum; j++)
            {
                var e = new ele()
                //this.setEle = function(dataType, colHeaderName, rowHeaderName, data, x, y)

                var res = e.createEle("undefine", "col"+j.toString(), "row"+i.toString(), i, j);

                if(false == res)
                {
                    console.error("in initMatrix, createEle error");
                    return false;
                }
                else
                {
                    var jsonStr = JSON.stringify(e);
                    this.matrix[i][j] = jsonStr;
                }
            }
        }
        return true;
    }


    this.copyMatrix = function()
    {
        var copyMatrix = this.matrix;
        return copyMatrix;
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
                console.info(" | ");
            }
            console.info("------------------------------------------------------------");
        }
    }

    this.insertColumn = function(colNo, colHeaderName, dataType)
    {
        var i = 0;
        var j = 0;

        if(colNo > this.colNum)//column must continuous
        {
            console.info("error to insertColumn, column must continuous");
            return false;
        }

        if(0 == this.rowNum)//no data in matrix
        {
            this.initMatrix(1, 1);
            var e = new ele();
            res = e.createEle(dataType, colHeaderName, "", 0, 0);
            if(false == res)
            {
                console.info("incorrect new insert data");
                return false;
            }
            this.matrix[i][j] = JSON.stringify(e);
            return true;
        }

        var copyMatrix = this.copyMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;

        this.initMatrix(oldColNum + 1, oldRowNum);

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
                    var e = new ele();
                    var rowName = this.getRowHeaderNameByRowNo(i,j);
                    //console.info("rowName :", rowName);
                    res = e.createEle(dataType, colHeaderName, this.getRowHeaderNameByRowNo(i,j), i, j);

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


    this.getRowHeaderNameByRowNo = function(rowNo, colNo)
    {
        if(colNo > 0)
        {
            var e = JSON.parse(this.matrix[rowNo][0]);
            return e.rowHeaderName;
        }
        else
        {
            if(this.colNum == 1)//only one column
            {
                var e = JSON.parse(this.matrix[rowNo][0]);
                return e.rowHeaderName;
            }
            else
            {
                var e = JSON.parse(this.matrix[rowNo][1]);
                return e.rowHeaderName;
            }
        }
    }

    this.deleteColumn = function(colNo)
    {
        console.info("----------------deleteCol colNo: ", colNo, "----------------------");

        if(colNo >= this.colNum)
        {
            console.error("incorrect colNo", colNo);
            return false;
        }
        var copyMatrix = this.copyMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        var i = 0;
        var j = 0;

        this.initMatrix(oldColNum - 1, oldRowNum);

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

    this.setMatrixData = function(data, x, y)
    {
        console.info("entry setMatrixData");
        if(y >= this.colNum)
        {
            console.error("no y space");
            return false;
        }

        if(x > this.rowNum)
        {
            console.error("in x must continuous");
            return false;
        }

        if(x == this.rowNum)//the max row, must create new ele for whole row
        {
            this.insertRow(x);
        }

        var e = this.getEleByXY(x, y)
        if(false == e)
        {
            return false;
        }
        else
        {
            var newData = new ele();

            console.info("getDataTypeByColNo: ", this.getDataTypeByColNo(x, y));
            console.info("getColHeaderNameByColNo: ", this.getColHeaderNameByColNo(x, y));
            console.info("getRowHeaderNameByRowNo: ", this.getRowHeaderNameByRowNo(x, y));
            res = newData.setEle(this.getDataTypeByColNo(x, y), 
                    this.getColHeaderNameByColNo(x, y), 
                    this.getRowHeaderNameByRowNo(x, y), 
                    data, x, y);
            if(false == res)
            {
                console.info("incorrect new insert data");
                return false;
            }
            this.matrix[x][y] = JSON.stringify(newData);
            
        }
    }


    this.insertRow = function(rowNo)
    {
        console.info("--------insert row rowNo:", rowNo, "------------------");
        if(this.colNum == 0)
        {
            console.error("matrix is not init yet");
            return false;
        }
        if(rowNo > this.rowNum)
        {
            console.error("incorrect rowNo", rowNo);
            return false;
        }
        

        var copyMatrix = this.copyMatrix();
        var oldColNum = this.colNum;
        var oldRowNum = this.rowNum;
        
        this.initMatrix(oldColNum, oldRowNum + 1);

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

                    res = e.createEle(this.getDataTypeByColNo(i, j), this.getColHeaderNameByColNo(i, j), "", i, j);
                    
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


    this.getColHeaderNameByColNo = function(rowNo, colNo)
    {
        if(rowNo > 0)
        {
            var e = JSON.parse(this.matrix[0][colNo]);
            return e.colHeaderName;
        }
        else
        {
            if(this.rowNum == 1)//only one column
            {
                var e = JSON.parse(this.matrix[0][colNo]);
                return e.colHeaderName;
            }
            else
            {
                var e = JSON.parse(this.matrix[1][colNo]);
                return e.colHeaderName;
            }
        }
    }

    this.getDataTypeByColNo = function(rowNo, colNo)
    {
        if(rowNo > 0)
        {
            var e = JSON.parse(this.matrix[0][colNo]);
            return e.dataType;
        }
        else
        {
            console.info("this.rowNum ==== ", this.rowNum)
            if(this.rowNum == 1)//only one column
            {
                var e = JSON.parse(this.matrix[0][colNo]);
                return e.dataType;
            }
            else
            {
                var e = JSON.parse(this.matrix[1][colNo]);
                return e.dataType;
            }
        }
    }

    this.getEleByXY = function(x, y)
    {
        
        if(x >= this.rowNum || y >= this.colNum)
        {
            console.error("error to getEleByXY");
            return false;
        }        
        var e = JSON.parse(this.matrix[x][y]);
        return e;

    }

}




var testEle = new ele();
//this.setEle = function(dataType, colHeaderName, rowHeaderName, data, x, y)
/*
testEle.setEle("integer", "col1", "row1", "333.3", 0, 0);
testEle.setEle("integer", "col1", "row1", "333", 0, 0);

var myMatrix = new matrix();
myMatrix.initMatrix(3, 5);
myMatrix.printMatrix();

myMatrix.insertColumn(2, "aaa", "integer");
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.deleteColumn(3);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.insertRow(3);
console.info("#############################################")
myMatrix.printMatrix();
*/

var myMatrix = new matrix();
myMatrix.insertColumn(0, "aaa", "integer");
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("400", 0, 0);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("410", 1, 0);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("420", 2, 0);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.insertColumn(1, "bbb", "integer");
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("401", 0, 1);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("411", 1, 1);
console.info("#############################################")
myMatrix.printMatrix();

myMatrix.setMatrixData("421", 2, 1);
console.info("#############################################")
myMatrix.printMatrix();


