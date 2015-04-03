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


    var clickRow = 0;
    var clickCol = 0;

    function setClickRowAndCol(row, col) {
        clickRow = row;
        clickCol = col;
        createForm(row, col);
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
        for(i = 0; i < changeCellNum; i++)
        {
            var rowNo = changeArray[i][0];
            var colNo = changeArray[i][1];
            var oldValue = changeArray[i][2];
            var newValue = changeArray[i][3];

            var cellType = sheet.getCellDataType(rowNo, colNo);
            if("colHeader" == cellType)
            {
                return matrix.setColHeader(colNo - 2, newValue);
            }
            else if("rowHeader" == cellType)
            {
                return matrix.setRowHeader(rowNo - 2, newValue);
            }
            else if("data" == cellType || "pendingData"  == cellType)
            {
                return matrix.setData(rowNo - 2, colNo - 2, newValue);
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
            alert("error to setChange");
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
    myMatrix.insertColumn(0, "aaa", "integer");
    myMatrix.insertColumn(1, "bbb", "integer");
    myMatrix.insertColumn(2, "ccc", "integer");
    
    myMatrix.setMatrixData("400", 0, 0);
    myMatrix.setMatrixData("401", 0, 1);
    myMatrix.setMatrixData("402", 0, 2);

    myMatrix.setMatrixData("500", 1, 0);

    myMatrix.setMatrixData("501", 1, 1);
    myMatrix.setMatrixData("601", 2, 1);
    myMatrix.setMatrixData("701", 3, 1);

    myMatrix.insertColumn(3, "ddd", "integer");
    myMatrix.insertColumn(4, "eee", "float");
    myMatrix.insertColumn(5, "fff", "string");
    myMatrix.insertColumn(6, "ggg", "region");
    

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

    $('#New').click(function () {
        console.info("new");
        $.blockUI({
            //$.fn.blockUI({
            message : $('#newForm')
        });
    });

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

    $('#InsertCB').click(function () {
        console.info("insert column before");
        generateInsertColumnForm(clickRow, clickCol, true);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#InsertCA').click(function () {
        console.info("insert column after");
        generateInsertColumnForm(clickRow, clickCol, false);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#InsertRB').click(function () {
        console.info("insert row before");
        generateInsertRowForm(clickRow, clickCol, true);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#InsertRA').click(function () {
        console.info("insert row after");
        generateInsertRowForm(clickRow, clickCol, false);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#DeleteColumn').click(function () {
        console.info("delete column");
        generateDeleteColForm(clickRow, clickCol);

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
        });
    });

    $('#DeleteRow').click(function () {
        console.info("delete row");
        generateDeleteRowForm(clickRow, clickCol);

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
    
    $('#purifyData').click(function () {
        console.info("set purify Data method");
        generatePurifyDataForm();

        $.blockUI({
            //$.fn.blockUI({
            message : $('#insertFrm')
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
        saveCurrentSheetToServer(fileName.value);
        $.unblockUI();
        return true;
    });


});