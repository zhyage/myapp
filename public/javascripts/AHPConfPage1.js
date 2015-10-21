$(document).ready(function() {


    var g_selectSourceList=[];

    var g_AHPMatrix = [];

    var g_matrix;

    function addEleIntoSelectSourceList(ele) {
        if (undefined == _.find(g_selectSourceList, function(e) {
                return (ele === e);
            })) {
            g_selectSourceList.push(ele);
        }
    }

    function delEleFromSelectSourceList(ele) {
        var index = _.indexOf(g_selectSourceList, ele);
        if (-1 != index) {
            g_selectSourceList.splice(index, 1);
        }
    }

    function showSelectSourceList() {
        console.info("g_selectSourceList : ", g_selectSourceList);
    }


    function columDataSelected(e) {
        if (this.checked) {
            addEleIntoSelectSourceList(this.name);
        } else {
            delEleFromSelectSourceList(this.name);
        }
        showSelectSourceList();
        generaterAHPMatrix();
    }

    function attachCheckboxHandlers() {
            // get reference to element containing toppings checkboxes

            var el = document.getElementById('sourceDataList');

            // get reference to input elements in toppings container element
            var tops = el.getElementsByTagName('input');

            // assign updateTotal function to onclick property of each checkbox
            for (var i = 0, len = tops.length; i < len; i++) {
                if (tops[i].type === 'checkbox') {
                    tops[i].onclick = columDataSelected;
                }
            }
        }

    function generateColumListCheckBoxButton() {
        getMatrixData();

        var appendStr = "";
        var i = 0;
        for (i = 0; i < colNameList.length; i++) {
            var colName = '"' + colNameList[i] + '"';
            console.info("colName :", colName);

            var tmpStr = '<label class="btn btn-primary"> <input type="checkbox" autocomplete="off" name=' + colName + ' value = ' + colName + '> ' + colName + ' </label>'


            console.info("tmpStr : ", tmpStr);
            appendStr = appendStr.concat(tmpStr);
        }
        console.log("appendStr :", appendStr);
        $("#sourceDataList").append(appendStr);
        attachCheckboxHandlers();
    }


    var AHPConfPage1Matrix = new matrix();
    var colNameList = [];

    function getMatrixData() {
        loadMatrixFromLocalStorage("localMatrix", AHPConfPage1Matrix);
        console.info("AHPConfPage1Matrix colNum: ", AHPConfPage1Matrix.colNum);

        var i = 0;

        for (i = 0; i < AHPConfPage1Matrix.colNum; i++) {
            colNameList.push(AHPConfPage1Matrix.getColHeaderNameByColNo(i));
        }

    }

    function generaterAHPMatrix() {
        var matrixDim = g_selectSourceList.length + 1;
        console.info("matrixDim : ", matrixDim);

        g_AHPMatrix = new Array();
        for(i = 0; i < matrixDim ; i++)
        {
            g_AHPMatrix[i] = new Array();
            for(j = 0; j < matrixDim; j++)
            {
                if(0 === i && 0 === j){
                    g_AHPMatrix[i][j] = '\\';
                }else if(0 === j){
                    g_AHPMatrix[i][j] = g_selectSourceList[i - 1];
                }else if(0 === i){
                    g_AHPMatrix[i][j] = g_selectSourceList[j - 1];
                }else if(i == j){
                    g_AHPMatrix[i][j] = '1';
                }else{
                    g_AHPMatrix[i][j] = '1';
                }
                
            }
        }

        g_matrix.loadData(g_AHPMatrix);
    }

    
    function onEditCell(changeArray) {
        console.info("changeArray : ", changeArray)
        console.info("after change AHPMatrix : ", g_AHPMatrix);
        var changeCellNum = changeArray.length;
        var i = 0;
        var res = true;
        for (i = 0; i < changeCellNum; i++) {
            var rowNo = changeArray[i][0];
            var colNo = changeArray[i][1];
            var oldValue = changeArray[i][2];
            var newValue = changeArray[i][3];

            g_AHPMatrix[colNo][rowNo] = '1/' + newValue;

        }
        g_matrix.loadData(g_AHPMatrix);
    }

    function validateInputData(changeArray) {
        console.info("beforechangeArray : ", changeArray)
        console.info("before change AHPMatrix : ", g_AHPMatrix);
        var changeCellNum = changeArray.length;
        var i = 0;
        var res = true;
        for (i = 0; i < changeCellNum; i++) {
            var rowNo = changeArray[i][0];
            var colNo = changeArray[i][1];
            var oldValue = changeArray[i][2];
            var newValue = changeArray[i][3];

            if(newValue != '2'){
                g_AHPMatrix[rowNo][colNo] = oldValue;
            }
        }
        g_matrix.loadData(g_AHPMatrix);
    }



    function initAHPMatrix() {

        var container = document.getElementById('AHPMatrix');
        g_matrix = new Handsontable(container, {
            data: g_AHPMatrix,
            minSpareRows: 1,
            rowHeaders: true,
            colHeaders: true,

            afterChange: function(changes, source) {
                console.info("afterChange changes : ", changes);
                console.info("afterChange source : ", source);

                if (source == "edit") {
                    onEditCell(changes);
                }
            },


            cells: function(row, col, prop) {


                var cellProperties = {};
                if (row == 0 || col == 0 || row == col) {
                    cellProperties.readOnly = true;
                }
                return cellProperties;

            },

            beforeChange: function(changes, source) {
                // [[row, prop, oldVal, newVal], ...]
                validateInputData(changes);
            },


        });
    }

    generateColumListCheckBoxButton();
    initAHPMatrix();
    /*generaterAHPMatrix();*/


})