$(document).ready(function() {


    var yellowRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'yellow';

    };

    var greenRenderer = function(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.backgroundColor = 'green';

    };


    function generateColHeaderForm(rowNo, colNo, cellInfo) {
        var e = JSON.parse(cellInfo);
        var dataTypeList = [];
        dataTypeList = g_eleType.getUseableDatatypeNameList();
        console.info("dataTypeList : ", dataTypeList);
        $('form').jsonForm({
            schema: {
                columnHeader: {
                    type: 'string',
                    title: 'column Header Name',
                    required: true
                },
                dataType: {
                    type: 'string',
                    title: 'data type',
                    required: true,
                    'enum': dataTypeList,
                }
            },
            "value": {
                "columnHeader": e.data,
                "dataType": e.dataType
            },
            onSubmit: function(errors, values) {
                if (errors) {
                    alert("error happens when set colHEaderName cell");
                } else {
                    e.data = values.columnHeader;
                    e.dataType = values.dataType;
                    var jsonStr = JSON.stringify(e);
                    myData_1.modifyCell(rowNo, colNo, jsonStr);
                    hot.loadData(myData_1.getPureDataMatrix());

                }
            }

        });
    }

    function generateRowHeaderForm(rowNo, colNo, cellInfo) {
        var e = JSON.parse(cellInfo);
        $('form').jsonForm({
            schema: {
                rowHeader: {
                    type: 'string',
                    title: 'row Header Name',
                    required: true
                },
            },
            "value": {
                "rowHeader": e.data
            },
            onSubmit: function(errors, values) {
                if (errors) {
                    alert("error happens when set rowHeaderName cell");
                } else {
                    e.data = values.rowHeader;
                    var jsonStr = JSON.stringify(e);
                    myData_1.modifyCell(rowNo, colNo, jsonStr);
                    hot.loadData(myData_1.getPureDataMatrix());

                }
            }

        });
    }

    function generateColRWForm(cellInfo) {}

    function generateRowRWForm(cellInfo) {}

    function generateNormalDataForm(rowNo, colNo, cellInfo) {
        var e = JSON.parse(cellInfo);
        $('form').jsonForm({
            schema: {
                columnHeaderName: {
                    type: 'string',
                    title: 'column header name',
                },
                rowHeaderName: {
                    type: 'string',
                    title: 'row header name',
                },
                dataType: {
                    type: 'string',
                    title: 'data type',
                },
                data: {
                    type: 'string',
                    title: 'data',
                    required: true
                },
            },
            "value": {
                "columnHeaderName": e.colHeaderName,
                "rowHeaderName": e.rowHeaderName,
                "dataType": e.dataType,
                "data": e.data
            },
            onSubmit: function(errors, values) {
                if (errors) {
                    alert("error happens when set rowHeaderName cell");
                } else {
                    e.data = values.data;
                    var jsonStr = JSON.stringify(e);
                    myData_1.modifyCell(rowNo, colNo, jsonStr);
                    hot.loadData(myData_1.getPureDataMatrix());

                }
            }

        });
    }

    function createForm(rowNo, colNo) {
        var cellInfo = "";
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
        {} else if (colNo == 1 && rowNo >= 2) //the colNo cell
        {} else //normal data cell
        {
            generateNormalDataForm(rowNo, colNo, cellInfo);
        }

        return true;





    }
    /*
function addFields(){
    // Number of inputs to create
    var number = document.getElementById("member").value;
    // Container <div> where dynamic content will be placed
    var container = document.getElementById("container");
    // Clear previous contents of the container
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }
    for (i=0;i<number;i++){
        // Append a node with a random text
        container.appendChild(document.createTextNode("Member " + (i+1)));
        // Create an <input> element, set its type and name attributes
        var input = document.createElement("input");
        input.type = "text";
        input.name = "member" + i;
        container.appendChild(input);
        // Append a line break 
        container.appendChild(document.createElement("br"));
    }
}
*/

    console.info("xxxxxxxxxxxxxx start xxxxxxxxxxxxxx");



    var clickRow = 0;
    var clickCol = 0;

    function setClickRowAndCol(row, col) {
        clickRow = row;
        clickCol = col;
        createForm(row, col);
    }


    jQuery(window).load(function() {
        $("#nav > li > a").click(function(e) { // binding onclick
            //console.info(e);

            if ($(this).parent().hasClass('selected')) {
                console.info("111");
                $("#nav .selected div div").slideUp(100); // hiding popups
                $("#nav .selected").removeClass("selected");
            } else {
                console.info("112");
                $("#nav .selected div div").slideUp(100); // hiding popups
                $("#nav .selected").removeClass("selected");

                if ($(this).next(".subs").length) {
                    console.info("113");
                    $(this).parent().addClass("selected"); // display popup
                    $(this).next(".subs").children().slideDown(200);
                    $(this).select(function(event, ui) {
                        console.info("text :", ui.item.text());
                    })
                }
            }
            e.stopPropagation();
        });

        $("body").click(function() { // binding onclick to body
            $("#nav .selected div div").slideUp(100); // hiding popups
            $("#nav .selected").removeClass("selected");
        });

        //$("#create ul li a").click(function (e){
        $("#New li a").click(function(e) {
            console.info("new");
            $.blockUI({
            //$.fn.blockUI({  
                message: $('#newForm')
            });
        });

        $("#load li a").click(function(e) {
            console.info("load");
        });

        $("#import li a").click(function(e) {
            console.info("import");
        });

        $('#newFormNo').click(function() {
            var frm = document.getElementById('newFrm');
            var colNum = document.getElementById('colNum');
            var rowNum = document.getElementById('rowNum');
            console.info("col:", colNum.value, "row:", rowNum.value);
            $.unblockUI();
            return false;
        });


        $('#newFormYes').click(function() {
            var frm = document.getElementById('newFrm');
            var colNum = document.getElementById('colNum');
            var rowNum = document.getElementById('rowNum');
            console.info("col:", colNum.value, "row:", rowNum.value);
            $.unblockUI();
            return true;
        });



    });




    var g_eleType = new eleDataTypeEnume();

    console.info("new matrix");
    var myData_1 = new myMatrix();
    //var g_RWMethod = new rightWeight();
    //myData_1.clearMatrix();
    myData_1.initMatrix(5, 5);
    
//console.info(myData_1.getMatrixRowNum());
//console.info(myData_1.getMatrixDimmenInfo());
//console.info("colheaderArray = ", myData_1.getMatrixColHeader());
//console.info("rowheaderArray = ", myData_1.getMatrixRowHeader());
// console.info(myData_1.getCurrentColRWMethod().name);
// console.info(myData_1.getCurrentRowRWMethod().name);
// console.info(myData_1.getMatrixData());
// console.info("whole matrix = ")
// console.info(myData_1.GetWholeMatrix());
// myData_1.insertCol(4);
// console.info(myData_1.GetWholeMatrix());


    var data = myData_1.getPureDataMatrix();

    var container = document.getElementById('hot');
    var hot = new Handsontable(container, {
        data: data,
        minSpareRows: 1,
        colHeaders: true,
        rowHeaders: true,
        manualColumnMove: true,
        manualRowMove: true,
        afterOnCellMouseDown: function(changes, sources) {
            console.info(" sources === ", sources);
            console.info("sources.row = ", sources.row, "sources.col = ", sources.col);
            setClickRowAndCol(sources.row, sources.col);
        },
        afterColumnMove: function(srcColNo, destColNo) {
            console.info("afterColumnMove, srcColNo:", srcColNo, "destColNo:", destColNo);
            myData_1.moveCol(srcColNo, destColNo);
            hot.loadData(myData_1.getPureDataMatrix());
        },
        afterRowMove: function(srcRowNo, destRowNo) {
            console.info("afterRowMove, srcRowNo:", srcRowNo, "destRowNo:", destRowNo);
            myData_1.moveRow(srcRowNo, destRowNo);
            hot.loadData(myData_1.getPureDataMatrix());
        }


        //contextMenu: true,
        //      manualColumnMove: true,
        //      manualRowMove: true,

        
//       cells: function (row, col, prop) {
//         if (row === 0 || col === 0) {
//         this.renderer = greenRenderer;
//         }
        
//      },
     
//      cells: function (row, col, prop) {
//     var cellProperties = {};
//     if (row === 0){
//       cellProperties.readOnly = true;
//         }
//     return cellProperties;
// }

    });

    hot.updateSettings({

        contextMenu: {
            callback: function(key, options) {
                if (key === 'about') {
                    setTimeout(function() {
                        //timeout is used to make sure the menu collapsed before alert is shown
                        //alert("This is a context menu with default and custom options mixed");
                        myData_1.insertCol(clickCol, "newInsert", "xiaoshu");
                        hot.loadData(myData_1.getPureDataMatrix());
                        setClickRowAndCol(0, 0);
                    }, 100);
                }
            },
            items: {
                "row_above": {
                    
                        // disabled: function () 
                        // {
                        //     //if first row, disable this option
                        //     return (hot3.getSelected()[0]===0)
                        // }
                        
                },
                "row_below": {},
                "hsep1": "---------",
                "remove_row": {
                    
                        // name: 'Remove this row, ok?',
                        // disabled: function () 
                        // {
                        //     //if first row, disable this option
                        //     return  (hot3.getSelected()[0] === 0)
                        // }
                        
                },
                "hsep2": "---------",
                "about": {
                    name: 'About this menu'
                }
            }
        }

    })
});