$(document).ready(function () {

    var yellowRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'yellow';
    };

    var orangeRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'orange';

    };

    var greyRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'grey';

    };

    var greenRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'green';

    };

    var redRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'red';

    };

    var pinkRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'pink';

    };

    var blueRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'blue';

    };

    var blackRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'black';

    };

    var whiteRenderer = function (instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'white';

    };


    function generateInsertColumnForm(sheet, matrix, rowNo, colNo, before) {
        $('#insertFrm').html('');
        var oldMatrix = matrix.copyMatrix();
        var insertColNo = 0;
        if(true == before)
        {
            insertColNo = colNo - 2;
        }
        else
        {
            insertColNo = colNo - 2 + 1;
        }
        console.info("entry generateInsertCBForm");
        if (insertColNo < 0 || insertColNo > matrix.colNum) {
            setTimeout(function () {
                $.unblockUI({
                    onUnblock : function () {
                        alert('please select position where you want insert column first');
                    }
                });
            }, 200);
            return;
        }
        var dataTypeList = [];
        dataTypeList = g_eleType.getUseableDatatypeNameList();

        $('#insertFrm').jsonForm({
            schema : {
                columnHeader : {
                    type : 'string',
                    title : 'column Header Name',
                    required : true
                },
                dataType : {
                    type : 'string',
                    title : 'data type',
                    required : true,
                    'enum' : dataTypeList,
                }
            },
            "value" : {
                "columnHeader" : "",
                "dataType" : "float",
            },

            "form" : [
                "columnHeader",
                "dataType", 
                {
                    "type" : "actions",
                    "items" : [{
                            "type" : "submit",
                            "title" : "Submit"
                        }, {
                            "type" : "button",
                            "title" : "Cancel",
                            "onClick" : function (evt) {
                                evt.preventDefault();
                                console.info("cancel insert column on submit");
                                $.unblockUI();
                            }
                        }
                    ]
                }
            ],

            onSubmit : function (errors, values) {
                if (errors) {
                    alert("error happens when set colHEaderName cell");
                } else {
                    console.info("submit insert column on submit");
                    columnName = values.columnHeader;
                    dataType = values.dataType;
                    

                    if(false == matrix.insertColumn(insertColNo, columnName, dataType))
                    {
                        reloadData(sheet, oldMatrix);
                    }
                    else
                    {
                        reloadData(sheet, matrix);
                    }

                }
                $.unblockUI();
            },

        });
    }

    function generateInsertRowForm(sheet, matrix, rowNo, colNo, before) {
        $('#insertFrm').html('');
        console.info("entry generateInsertRowForm");
        var oldMatrix = matrix.copyMatrix();
        var insertRowNo = 0;
        if(true == before)
        {
            insertRowNo = rowNo - 2;
        }
        else
        {
            insertRowNo = rowNo - 2 + 1;
        }
        
        if (insertRowNo < 0 || insertRowNo > matrix.rowNum) {
            setTimeout(function () {
                $.unblockUI({
                    onUnblock : function () {
                        alert('please select position where you want insert row first');
                    }
                });
            }, 200);
            return;
        }

        $('#insertFrm').jsonForm({
            schema : {
                rowHeader : {
                    type : 'string',
                    title : 'row Header Name',
                    //required : true
                },
            },
            "value" : {
                "rowHeader" : "",
            },

            "form" : [
                "rowHeader", {
                    "type" : "actions",
                    "items" : [{
                            "type" : "submit",
                            "title" : "Submit"
                        }, {
                            "type" : "button",
                            "title" : "Cancel",
                            "onClick" : function (evt) {
                                evt.preventDefault();
                                console.info("cancel insert row");
                                $.unblockUI();
                            }
                        }
                    ]
                }
            ],

            onSubmit : function (errors, values) {
                if (errors) {
                    alert("error happens when set rowHEaderName cell");
                    reloadData(sheet, oldMatrix);
                } else {

                    if(false == matrix.insertRow(insertRowNo))
                    {
                        reloadData(sheet, oldMatrix);
                    }
                    else
                    {
                        if(false == matrix.setRowHeader(insertRowNo, values.rowHeader))
                        {
                            reloadData(sheet, oldMatrix);
                        }
                        else
                        {
                            reloadData(sheet, matrix);
                        }
                        
                    }
                }
                $.unblockUI();
            },

        });
    }

    function generateDeleteColForm(sheet, matrix, rowNo, colNo) {
        $('#insertFrm').html('');
        var oldMatrix = matrix.copyMatrix();
        var delColNo = colNo - 2;
        console.info("entry generateDeleteColForm");
        if (delColNo < 0 || delColNo > matrix.colNum) {
            setTimeout(function () {
                $.unblockUI({
                    onUnblock : function () {
                        alert('please select position where you want delete column first');
                    }
                });
            }, 200);
            return;
        }

        $('#insertFrm').jsonForm({
            "form" : [{
                    "type" : "help",
                    "helpvalue" : "Would you like to contine?."
                }, {
                    "type" : "actions",
                    "items" : [{
                            "type" : "submit",
                            "title" : "Submit"
                        }, {
                            "type" : "button",
                            "title" : "Cancel",
                            "onClick" : function (evt) {
                                evt.preventDefault();
                                console.info("cancel delete column");
                                $.unblockUI();
                            }
                        }
                    ]
                }
            ],

            onSubmit : function (errors, values) {
                if (errors) 
                {
                    alert("error happens when delete column");
                    reLoadSheet(sheet, oldMatrix);
                } 
                else 
                {
                    console.info("submit delete column on submit");
                    if(false == matrix.deleteColumn(delColNo))
                    {
                        reloadData(sheet, oldMatrix);
                    }
                    else
                    {
                        reloadData(sheet, matrix);
                    }
                }
                $.unblockUI();
            },

        });
    }

    function generateDeleteRowForm(sheet, matrix, rowNo, colNo) {
        $('#insertFrm').html('');
        console.info("entry generateDeleteRowForm");
        var oldMatrix = matrix.copyMatrix();
        var delRowNo = rowNo - 2;
        if (delRowNo < 0 || delRowNo > matrix.rowNum) {
            setTimeout(function () {
                $.unblockUI({
                    onUnblock : function () {
                        alert('please select position where you want delete row first');
                    }
                });
            }, 200);
            return;
        }

        $('#insertFrm').jsonForm({
            "form" : [{
                    "type" : "help",
                    "helpvalue" : "Would you like to contine?."
                }, {
                    "type" : "actions",
                    "items" : [{
                            "type" : "submit",
                            "title" : "Submit"
                        }, {
                            "type" : "button",
                            "title" : "Cancel",
                            "onClick" : function (evt) {
                                evt.preventDefault();
                                console.info("cancel delete row");
                                $.unblockUI();
                            }
                        }
                    ]
                }
            ],

            onSubmit : function (errors, values) {
                if (errors) {
                    alert("error happens when delete row");
                    reloadData(sheet, oldMatrix);
                } else {
                    if(false == matrix.deleteRow(delRowNo))
                    {
                        reloadData(sheet, oldMatrix);
                    }
                    else
                    {
                        reloadData(sheet, matrix);
                    }
                }
                $.unblockUI();
            },

        });
    }

    function generateColHeaderForm(sheet, matrix, colNo) {
        console.info("entry generateColHeaderForm");
        var oldMatrix = matrix.copyMatrix();
        var currentColHeaderName = matrix.getColHeaderNameByColNo(colNo - 2);
        var currentColDataType = matrix.getDataTypeByColNo(colNo - 2);

        var dataTypeList = [];
        dataTypeList = g_eleType.getUseableDatatypeNameList();
        console.info("dataTypeList : ", dataTypeList);
        $('#editFrm').html('');
        $('#editFrm').jsonForm({
            schema : {
                columnHeader : {
                    type : 'string',
                    title : 'column Header Name',
                    required : true,

                },
                dataType : {
                    type : 'string',
                    title : 'data type',
                    required : true,
                    'enum' : dataTypeList,
                }
            },
            "value" : {
                "columnHeader" : currentColHeaderName,
                //"dataType": e.dataType
                "dataType" : currentColDataType
            },
            onSubmit : function (errors, values) {
                if (errors) {
                    alert("error to set column information");
                    reloadData(sheet, oldMatrix);
                } else {
                    if(values.dataType != currentColDataType)
                    {
                        if(true == matrix.changeColDataType(colNo - 2, values.dataType))
                        {
                            reloadData(sheet, matrix);
                        }
                        else
                        {
                            alert("error to set column information!");
                            reloadData(sheet, oldMatrix);
                        }
                    }
                    if(values.columnHeader != currentColHeaderName)
                    {
                        if(true == matrix.setColHeader(colNo - 2, values.columnHeader))
                        {
                            reloadData(sheet, matrix);
                        }
                        else
                        {
                            alert("error to set column information");
                            reloadData(sheet, oldMatrix);
                        }
                    }
                }
            }

        });
    }

    function generateRowHeaderForm(sheet, matrix, rowNo) {
        console.info("entry generateRowHeaderForm");
        var oldMatrix = matrix.copyMatrix();
        var currentRowHeaderName = matrix.getRowHeaderNameByRowNo(rowNo - 2);
        
        $('#editFrm').html('');
        $('#editFrm').jsonForm({
            schema : {
                rowHeader : {
                    type : 'string',
                    title : 'row Header Name',
                    required : true
                },
            },
            "value" : {
                "rowHeader" : currentRowHeaderName,
            },
            onSubmit : function (errors, values) {
                if (errors) {
                    alert("error happens when set rowHeaderName cell");
                    reloadData(sheet, oldMatrix);
                } else {
                    if(values.rowHeader != currentRowHeaderName)
                    {
                        if(true == matrix.setRowHeader(rowNo - 2, values.rowHeader))
                        {
                            reloadData(sheet, matrix);
                        }
                        else
                        {
                            reloadData(sheet, oldMatrix);
                        }
                    }
                }
            }

        });
    }

    function generateTestForm(sheet, matrix) {
        console.info("entry generateTestForm");
        var i = 0;
        var colHeaderList = [];
        for(i = 0; i < matrix.colNum; i++)
        {
            colHeaderList.push(matrix.getColHeaderNameByColNo(i));
        }
        
        $('#editFrm').html('');
        $('#editFrm').jsonForm({
              "schema": {
                "language": {
                  "type": "string",
                  "title": "Best language",
                  //"enum": [ "JavaScript", "Python", "PHP", "Java", "C++", "other" ]
                  "enum": colHeaderList
                }
              },

              "form": [
                {
                  "key": "language",
                  //"type": "radiobuttons",
                  "type": "radios",
                  "activeClass": "btn-success",

                  
                  "onClick": function(evt)
                  {
                    var value = $(evt.target).val();
                    console.info("value :", value, "length :", value.length);
                    if(value.length != 0)
                    {
                        alert("value :", value);
                    }
                  } 
                            
                }
              ]
            });  
    }


    function generateNormalDataForm(sheet, matrix, rowNo, colNo) {
        console.info("entry generateNormalDataForm");
        var oldMatrix = matrix.copyMatrix();
        var currentColHeaderName = matrix.getColHeaderNameByColNo(colNo - 2);
        var currentColDataType = matrix.getDataTypeByColNo(colNo - 2);
        var currentRowHeaderName = matrix.getRowHeaderNameByRowNo(rowNo - 2);
        var tmp = matrix.getEleByXY(rowNo - 2, colNo - 2);
        var currentData = "";
        if(false == tmp)//ugly, fix me
        {
            currentData = "";
        }
        else
        {
            currentData = tmp.data;
        }

        $('#editFrm').html('');
        $('#editFrm').jsonForm({
            schema : {
                columnHeaderName : {
                    type : 'string',
                    title : 'column header name',
                    readonly : true,
                },
                rowHeaderName : {
                    type : 'string',
                    title : 'row header name',
                    readonly : true,
                },
                dataType : {
                    type : 'string',
                    title : 'data type',
                    readonly : true,
                },
                data : {
                    type : 'string',
                    title : 'data',
                    required : true
                },
            },
            "value" : {
                "columnHeaderName" : currentColHeaderName,
                "rowHeaderName" : currentRowHeaderName,
                "dataType" : currentColDataType,
                "data" : currentData,
            },
            onSubmit : function (errors, values) {
                if (errors) {
                    alert("error happens when set rowHeaderName cell");
                    reloadData(sheet, oldMatrix);
                } else {
                    res = matrix.setData(rowNo - 2, colNo - 2, values.data);
                    if(false == res)
                    {
                        alert("error to set data!");
                        reloadData(sheet, oldMatrix);
                    }
                    else
                    {
                        reloadData(sheet, matrix);
                    }
                }
            }

        });
    }

    function generateRightWeightForm(column) {
        $('#insertFrm').html('');
        console.info("entry generateRightWeightForm");

        var methodList = [];
        var g_rightWeight = new rightWeight();
        methodList = g_rightWeight.getRWMethodList();

        $('#insertFrm').jsonForm({
            schema : {
                method : {
                    type : 'string',
                    title : '权重算法',
                    required : true,
                    'enum' : methodList,
                },
            },
            "value" : {
                "method" : methodList[0]
            },

            "form" : [
                "method", {
                    "type" : "actions",
                    "items" : [{
                            "type" : "submit",
                            "title" : "Submit"
                        }, {
                            "type" : "button",
                            "title" : "Cancel",
                            "onClick" : function (evt) {
                                evt.preventDefault();
                                console.info("cancel select right weight");
                                $.unblockUI();
                            }
                        }
                    ]
                }
            ],

            onSubmit : function (errors, values) {
                if (errors) {
                    alert("error happens when select right weight");
                } else {
                    console.info("submit select right weight on submit");
                    methodName = values.method;
                    if (true == column) {
                        //myData_1.setCurrentColRWMethod(g_rightWeight.getRightWeightMethod(methodName));
                        myData_1.setCurrentColRWMethod(methodName);
                    } else {
                        //myData_1.setCurrentRowRWMethod(g_rightWeight.getRightWeightMethod(methodName));
                        myData_1.setCurrentRowRWMethod(methodName);
                    }
                    //myData_1.setMatrixColRW();
                    hot.loadData(myData_1.getShowPureDataMatrix());
                }
                $.unblockUI();
            },

        });
    }
    
    function generatePurifyDataForm() {
        $('#insertFrm').html('');
        console.info("entry generatePurifyDataForm");

        var methodList = [];
        var directList = ['纵向','横向'];
        var g_purifyData = new purifyData();
        methodList = g_purifyData.getPurifyDataMethodList();

        $('#insertFrm').jsonForm({
            schema : {
                method : {
                    type : 'string',
                    title : '无量纲化算法',
                    required : true,
                    'enum' : methodList,
                },
                direct : {
                    type : 'string',
                    title : '方向',
                    required : true,
                    'enum' : directList,
                },
            },
            "value" : {
                "method" : methodList[0],
                "direct" : directList[0],
            },

            "form" : [
                "method", 
                {
                            "key" : "direct",
                            "type" : "radios"
                },
                {
                    "type" : "actions",
                    "items" : [{
                            "type" : "submit",
                            "title" : "Submit"
                        }, {
                            "type" : "button",
                            "title" : "Cancel",
                            "onClick" : function (evt) {
                                evt.preventDefault();
                                console.info("cancel select purify data");
                                $.unblockUI();
                            }
                        }
                    ]
                }
            ],

            onSubmit : function (errors, values) {
                if (errors) {
                    alert("error happens when select purify data");
                } else {
                    console.error("submit select purify data on submit");
                    var methodName = values.method;
                    var directName = values.direct;
                    //var purifyDataMatrix = myData_1.getUsefulPureDataMatrix();
                    //console.info("getUsefulPureDataMatrix :", purifyDataMatrix);
                    //var resArray = [];
                    //var method = g_purifyData.getPurifyDataMethod(methodName);
                    
                    myData_1.addCurrentPurifyMethod(directName, methodName);
                    alert("kkkkkk");
                    hot.loadData(myData_1.getShowPureDataMatrix());
        
                    /*
                    if ('纵向' == directName) {
                        console.info("calculate 纵向");
                        if(null != method)
                        {
                            //resArray = method.method(purifyDataMatrix, myData_1.getPureDataColNum(), myData_1.getPureDataRowNum(), 1);
                            //console.info("resArray", resArray );
                            //myData_1.appendResData(methodName, 1, "rowRes", resArray);
                            myData_1.addCurrentPurifyMethod(directName, methodName);
                            hot.loadData(myData_1.getShowPureDataMatrix());
                            //alert(resArray);
                        }
                    } else {
                        console.info("calculate 横向");
                        if(null != method)
                        {
                            //resArray = method.method(purifyDataMatrix, myData_1.getPureDataColNum(), myData_1.getPureDataRowNum(), 0);
                            //console.info("resArray", resArray );
                            //myData_1.appendResData(methodName, 1, "rowRes", resArray);
                            hot.loadData(myData_1.getShowPureDataMatrix());
                            
                            //alert(resArray);
                        }
                    }
                    */
                    
                    //hot.loadData(myData_1.getShowPureDataMatrix());
                }
                $.unblockUI();
            },

        });
    }
    

    function loadFileFromServer(fileName)
    {
        var loadBody = new fileInServer();
        loadBody.setSaveData(fileName, '');
        var bodyData = JSON.stringify(loadBody);

        $.ajax({
            type : "POST",
            url : "/loadFileFromServer",
            data : bodyData,
            contentType : "application/json; charset=utf-8",
            //contentType: "text/html; charset=utf-8",
            //dataType: "json",
            async: "false",
            success : function (data) {
                console.info("load file = ", data);
                var loadMatrix = JSON.parse(data);
                myMatrix.loadData(loadMatrix);
                reloadData(mySheet, myMatrix);
            },
            failure : function (errMsg) {
                alert("load file error");
            }
        });

    }

    function generateLoadForm() {
        $('#insertFrm').html('');
        console.info("entry generateLoadForm");

        fileNameList = [];
        $.ajax({
            type : "POST",
            url : "/getSaveFileList",
            data : '',
            contentType : "application/json; charset=utf-8",
            async : "false",
            success : function (data) {
                console.info("getSaveFileListFromServer = ", data);
                fileNameList = JSON.parse(data);
                console.info("fileNameList parse = ", fileNameList);
                if (fileNameList.length == 0) {
                    alert("no file exist");
                    $.unblockUI();
                    return;
                }

                $('#insertFrm').jsonForm({
                    schema : {
                        "fileName" : {
                            "type" : 'string',
                            "title" : 'fileName',
                            "required" : true,
                            'enum' : fileNameList,
                        },
                    },
                    "value" : {
                        "fileName" : "",
                    },

                    "form" : [{
                            "key" : "fileName",
                            "type" : "radios"
                        },
                        {
                            "type" : "actions",
                            "items" : [{
                                    "type" : "submit",
                                    "title" : "Submit"
                                }, {
                                    "type" : "button",
                                    "title" : "Cancel",
                                    "onClick" : function (evt) {
                                        evt.preventDefault();
                                        console.info("cancel Load file");
                                        $.unblockUI();
                                    }
                                }
                            ]
                        }
                    ],

                    onSubmit : function (errors, values) {
                        if (errors) {
                            alert("error happens when set LoadFile");
                        } else {
                            console.info("submit loadFile select fileName = ", values.fileName);
                            loadFileFromServer(values.fileName);
                        }
                        $.unblockUI();
                    },

                });
            },
            failure : function (errMsg) {
                alert("no file exist");
                $.unblockUI();
                return;
            }
        });

    }

    function createForm(sheet, matrix, rowNo, colNo) {
        $('#editFrm').html('');
        var cellType = sheet.getCellDataType(rowNo, colNo);
        switch(cellType)
        {
            case "colHeader" :
            {
                //alert("colHeader");
                generateColHeaderForm(sheet, matrix, colNo);
            }
            break;
            case "rowHeader" :
            {
                //alert("rowHeader");
                generateRowHeaderForm(sheet, matrix, rowNo);
            }
            break;
            case "data" :
            case "pendingData" :
            {
                generateNormalDataForm(sheet, matrix, rowNo, colNo);
                //alert("data");
            }
            break;
            default:
            {
                return false;
            }
            break;
        }

        /*
        var cellInfo = "";
        $('#editFrm').html('');
        if (rowNo < 2 && colNo < 2) //the nosence blank
        {
            return false;
        }
        if (rowNo < 0 || colNo < 0) //the colId and RowId
        {
            return false;
        }
        cellInfo = myData_1.getCellByColNoAndRowNo(rowNo, colNo);
        if ("" == cellInfo) {
            console.error("invalid cellInfo");
            return false;
        }
        console.info("cellInfo : ", cellInfo);

        if (rowNo == 0 && colNo >= 2) //the colHeaderName cell
        {
            generateColHeaderForm(rowNo, colNo, cellInfo);
        } else if (colNo == 0 && rowNo >= 2) //the RowHeaderName cell
        {
            generateRowHeaderForm(rowNo, colNo, cellInfo);
        } else if (rowNo == 1 && colNo >= 2) //the colRW cell
        {}
        else if (colNo == 1 && rowNo >= 2) //the colNo cell
        {}
        else //normal data cell
        {
            generateNormalDataForm(rowNo, colNo, cellInfo);
        }

        return true;
        */

    }

    function fileInServer() {
        this.fileName = '';
        this.matrix = '';
        this.setSaveData = function (fileName, matrix) {
            this.fileName = fileName;
            this.matrix = matrix;
        }
    }

    function saveCurrentSheetToServer(fileName, matrix) {
        console.info("entry saveCurrentSheetToServer");
        var saveBody = new fileInServer();
        
        saveBody.setSaveData(fileName, matrix)
        var bodyData = JSON.stringify(saveBody);
        $.ajax({
            type : "POST",
            url : "/saveToServer",
            // The key needs to match your method's input parameter (case-sensitive).
            //data: JSON.stringify({ Markers: markers }),
            data : bodyData,
            //data: JSON.stringify(myData_1.matrix),
            contentType : "application/json; charset=utf-8",
            //contentType: "text/html; charset=utf-8",
            //dataType: "json",
            //async: "false",
            success : function (data) {
                //alert(data);
                return true;
            },
            failure : function (errMsg) {
                alert(errMsg);
                return false;
            }
        });
    }



    var clickRow = 0;
    var clickCol = 0;

    function setClickRowAndCol(sheet, matrix, row, col) {
        clickRow = row;
        clickCol = col;
        createForm(sheet, matrix, row, col);
    }

    function reloadData(sheet, matrix)
    {
        sheet.reLoadSheet(matrix);
        hot.loadData(sheet.showSheet);
        console.info("after reloadData");
    }

    function setChange(sheet, matrix, changeArray)
    {
        var changeCellNum = changeArray.length;
        var i = 0;
        var res = true;
        for(i = 0; i < changeCellNum; i++)
        {
            var rowNo = changeArray[i][0];
            var colNo = changeArray[i][1];
            var oldValue = changeArray[i][2];
            var newValue = changeArray[i][3];

            var cellType = sheet.getCellDataType(rowNo, colNo);
            if("colHeader" == cellType)
            {
                res = matrix.setColHeader(colNo - 2, newValue);
                if(false == res)
                {
                    alert("error to set column header name!");
                }
                return res;
            }
            else if("rowHeader" == cellType)
            {
                res = matrix.setRowHeader(rowNo - 2, newValue);
                if(false == res)
                {
                    alert("error to set row header name!");
                }
                return res;
                
            }
            else if("data" == cellType || "pendingData"  == cellType)
            {
                res = matrix.setData(rowNo - 2, colNo - 2, newValue);
                if(false == res)
                {
                    alert("error to set data!");
                }
                return res;
            }
            else
            {
                var msg = "incorrect cell type to modify rowNo: " + rowNo + "colNo: " + colNo;
                alert(msg);
                return false;
            }
        }
        return false;
    }

    function checkMatrixValid(matrix)
    {
        return true;
    }

    function onEditCell(sheet, matrix, changeArray)
    {
        var oldMatrix = matrix;
        if(false == setChange(sheet, matrix, changeArray))
        {
            reloadData(sheet, oldMatrix);
            return false;
        }
        if(false == checkMatrixValid(matrix))
        {
            alert("error to checkMatrixValid");
            reloadData(sheet, oldMatrix);
            return false;
        }
        reloadData(sheet, matrix);
        return true;
        
    }


    console.info("xxxxxxxxxxxxxx start xxxxxxxxxxxxxx");

    var myMatrix = new matrix();
    
    
    myMatrix.insertColumn(0, "kkk", "integer");
    myMatrix.insertColumn(1, "bbb", "integer");
    myMatrix.insertColumn(2, "ccc", "integer");
    
    myMatrix.setMatrixData("400", 0, 0);
    myMatrix.setMatrixData("401", 0, 1);
    myMatrix.setMatrixData("402", 0, 2);

    myMatrix.setMatrixData("500", 1, 0);

    myMatrix.setMatrixData("501", 1, 1);
    myMatrix.setMatrixData("601", 2, 1);
    myMatrix.setMatrixData("701", 3, 1);

    // myMatrix.insertColumn(3, "ddd", "integer");
    // myMatrix.insertColumn(4, "eee", "float");
    // myMatrix.insertColumn(5, "fff", "string");
    // myMatrix.insertColumn(6, "ggg", "region");
    

    var mySheet = new sheet(myMatrix);

    var data = mySheet.showSheet;

    console.info("ttt data: ", data);

    mySheet.printShowSheet();



    var container = document.getElementById('hot');
    var hot = new Handsontable(container, {
            data : data,
            minSpareRows : 1,
            colHeaders : true,
            rowHeaders : true,
            manualColumnMove : true,
            //manualRowMove : true,
            /*
            afterOnCellMouseDown : function (changes, sources) {
                console.info(" sources === ", sources);
                console.info("sources.row = ", sources.row, "sources.col = ", sources.col);
                setClickRowAndCol(sources.row, sources.col);
            },
            afterColumnMove : function (srcColNo, destColNo) {
                console.info("afterColumnMove, srcColNo:", srcColNo, "destColNo:", destColNo);
                myData_1.moveCol(srcColNo, destColNo);
                hot.loadData(myData_1.getShowPureDataMatrix());
            },
            afterRowMove : function (srcRowNo, destRowNo) {
                console.info("afterRowMove, srcRowNo:", srcRowNo, "destRowNo:", destRowNo);
                myData_1.moveRow(srcRowNo, destRowNo);
                hot.loadData(myData_1.getShowPureDataMatrix());
            },
            */

            afterOnCellMouseDown : function (changes, sources) {
                console.info(" sources === ", sources);
                console.info("sources.row = ", sources.row, "sources.col = ", sources.col);
                setClickRowAndCol(mySheet, myMatrix, sources.row, sources.col);
            },

            afterColumnMove : function (srcColNo, destColNo) {
                console.info("afterColumnMove, srcColNo:", srcColNo, "destColNo:", destColNo);
                //myData_1.moveCol(srcColNo, destColNo);
                //hot.loadData(mySheet.showSheet);
                myMatrix.moveCol(srcColNo - 2, destColNo - 2);
                reloadData(mySheet, myMatrix);
            },

            afterChange : function (changes, source)
            {
                console.info("afterChange changes : ", changes);
                console.info("afterChange source : ", source);

                if(source == "edit")
                {
                    
                    onEditCell(mySheet, myMatrix, changes);
                    
                }
            },
            
            
            cells : function (row, col, prop) {
                
                if("grey" == mySheet.getCellColorByXY(row, col))
                {
                    this.renderer = greyRenderer;
                }
                else if("yellow" == mySheet.getCellColorByXY(row, col))
                {
                    this.renderer = yellowRenderer;
                }
                else if("black" == mySheet.getCellColorByXY(row, col))
                {
                    this.renderer = blackRenderer;
                }
                else if("white" == mySheet.getCellColorByXY(row, col))
                {
                    this.renderer = whiteRenderer;
                }
                else
                {
                    this.renderer = orangeRenderer;
                }
                
                /*
                var cellProperties = {};
                if (row < 2 || col < 2) {
                    cellProperties.readOnly = true;
                }
                */
                var cellProperties = {};
                if(true == mySheet.getCellEditableByXY(row, col))
                {
                    cellProperties.readOnly = false;
                }
                else
                {
                    cellProperties.readOnly = true;
                }
                return cellProperties;
                
            },
            
            

        });


    $('#cssmenu > ul > li > a').click(function () {
        console.info("hello2");
        $('#cssmenu li').removeClass('active');
        $(this).closest('li').addClass('active');
        var checkElement = $(this).next();
        if ((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            $(this).closest('li').removeClass('active');
            checkElement.slideUp('normal');
        }
        if ((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#cssmenu ul ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
        }
        if ($(this).closest('li').find('ul').children().length == 0) {
            return true;
        } else {
            return false;
        }
    });

    /*
    $('#New').click(function () {
        console.info("new");
        $.blockUI({
            //$.fn.blockUI({
            message : $('#newForm')
        });
    });
    */

    $('#Save').click(function () {
        console.info("save");
        $.blockUI({
            //$.fn.blockUI({
            message : $('#saveForm')
        });

        //saveCurrentSheetToServer();

    });

    $('#Load').click(function () {
        console.info("Load");
        generateLoadForm();
        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });

    });

    $('#New').click(function () {
        console.info("new");
        generateInsertColumnForm(mySheet, myMatrix, 0, mySheet.sheetColNum - 1, false);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#InsertCB').click(function () {
        console.info("insert column before");
        generateInsertColumnForm(mySheet, myMatrix, clickRow, clickCol, true);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#InsertCA').click(function () {
        console.info("insert column after");
        generateInsertColumnForm(mySheet, myMatrix, clickRow, clickCol, false);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#InsertRB').click(function () {
        console.info("insert row before");
        generateInsertRowForm(mySheet, myMatrix, clickRow, clickCol, true);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#InsertRA').click(function () {
        console.info("insert row after");
        generateInsertRowForm(mySheet, myMatrix, clickRow, clickCol, false);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#DeleteColumn').click(function () {
        console.info("delete column");
        generateDeleteColForm(mySheet, myMatrix, clickRow, clickCol);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#DeleteRow').click(function () {
        console.info("delete row");
        generateDeleteRowForm(mySheet, myMatrix, clickRow, clickCol);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#ColumnWeight').click(function () {
        console.info("set column right weight");
        generateRightWeightForm(true);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#RowWeight').click(function () {
        console.info("set row right weight");
        generateRightWeightForm(false);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });
    /*
    $('#purifyData').click(function () {
        console.info("set purify Data method");
        generatePurifyDataForm();

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });
    */

    $('#purifyData').click(function () {
        //generateTestForm(mySheet, myMatrix);
        
        sessionStorage.setItem("localMatrix", JSON.stringify(myMatrix));
        $.get('javascripts/computing.html', function(html) {
            console.info("1111111111111111");
        $.blockUI({ 
                    message: html ,
                    css: 
                    {
                        //top:  ($(window).height() - 400) /2 + 'px', 
                        //left: ($(window).width() - 400) /2 + 'px', 
                        //width: '400px'
                        top: '10px',
                        left: '10px',
                        width: '400px' 
                    }
                });
        });
        
    });


    $("#load li a").click(function (e) {
        console.info("load");
    });

    $("#import li a").click(function (e) {
        console.info("import");
    });

    $('#newFormNo').click(function () {
        var frm = document.getElementById('newFrm');
        var colNum = document.getElementById('colNum');
        var rowNum = document.getElementById('rowNum');
        console.info("col:", colNum.value, "row:", rowNum.value);
        $.unblockUI();
        return false;
    });

    $('#newFormYes').click(function () {
        var frm = document.getElementById('newFrm');
        var colNum = document.getElementById('colNum');
        var rowNum = document.getElementById('rowNum');
        console.info("col:", colNum.value, "row:", rowNum.value);
        //myData_1.initMatrix(5, 5);
        myData_1.initMatrix(parseInt(colNum.value), parseInt(rowNum.value));
        hot.loadData(myData_1.getShowPureDataMatrix());
        $.unblockUI();
        return true;
    });

    $('#saveFormNo').click(function () {
        var frm = document.getElementById('saveFrm');
        var colNum = document.getElementById('fileName');
        $.unblockUI();
        return false;
    });

    $('#saveFormYes').click(function () {
        var frm = document.getElementById('saveFrm');
        var fileName = document.getElementById('fileName');
        console.info("save to server file name: ", fileName.value);
        saveCurrentSheetToServer(fileName.value, myMatrix);
        $.unblockUI();
        return true;
    });



});