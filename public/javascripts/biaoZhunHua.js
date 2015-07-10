$(document).ready(function() {
    $('#suffixName').val("ttddss");

    function getFormulaConfFromServer() {
        var formularConf = [];
        console.info("entry getFormulaConfFromServer");

        $.ajax({
            type: "POST",
            url: "/toGetBiaoZhunFaConf",
            data: "",
            contentType: "application/json; charset=utf-8",
            async: "false",
            success: function(data) {
                //alert(data);
                formularConf = JSON.parse(data);
                console.info("formularConf : ", formularConf);
                showFormulaList(formularConf);
            },
            failure: function(errMsg) {
                alert(errMsg);
                //return false;
            }
        });
    }

    function showFormulaList(formularConf) {
        console.info("ffff formularConf :", formularConf);

        var buttonNameList = _.map(formularConf, function(conf) {
            return conf.buttonName;
        })

        $("#methodList").jsonForm({
            "schema": {
                "methodList": {
                    "type": "string",
                    "title": "methodList",
                    "required": true,
                    "enum": buttonNameList
                }
            },
            "form": [{
                "key": "methodList",
                "onChange": function(evt) {
                    var value = $(evt.target).val();
                    if (value) alert(value);
                }

            }],
        })

    }

    var biaoZhunHuaMatrix = new matrix();
    var colNameList = [];

    function getMatrixData() {
        var biaoZhunHuaMatrixString = sessionStorage.getItem("localMatrix");
        console.info("dddddddddddd:", biaoZhunHuaMatrixString);
        biaoZhunHuaMatrix.loadData(JSON.parse(biaoZhunHuaMatrixString));


        console.info("biaoZhunHuaMatrix colNum: ", biaoZhunHuaMatrix.colNum);

        var i = 0;

        for (i = 0; i < biaoZhunHuaMatrix.colNum; i++) {
            colNameList.push(biaoZhunHuaMatrix.getColHeaderNameByColNo(i));
        }

    }


    function generaterColumList() {

        getMatrixData();
        var appendStr = "";
        var i = 0;
        for (i = 0; i < colNameList.length; i++) {
            var colName = colNameList[i];
            console.info("colName : ", colName);
            var tmpStr = '<label><input type="checkbox" name= ' + colName + '  /> ' + colName + ' </label> <br>';
            console.info("tmpStr : ", tmpStr);
            appendStr = appendStr.concat(tmpStr);

        }
        console.log("appendStr :", appendStr);
        $("#colNameList").append(appendStr);
        attachCheckboxHandlers();

    }

    // call onload or in script segment below form
    function attachCheckboxHandlers() {
        // get reference to element containing toppings checkboxes
        var el = document.getElementById('colNameList');

        // get reference to input elements in toppings container element
        var tops = el.getElementsByTagName('input');

        // assign updateTotal function to onclick property of each checkbox
        for (var i = 0, len = tops.length; i < len; i++) {
            if (tops[i].type === 'checkbox') {
                tops[i].onclick = columDataSelected;
            }
        }
    }

    // called onclick of toppings checkboxes
    function columDataSelected(e) {


        // if check box is checked, add its value to val, otherwise subtract it
        if (this.checked) {
            alert(this.name + "checked");
        } else {
            alert(this.name + "unchecked");
        }

    }




    getFormulaConfFromServer();
    generaterColumList();
    attachCheckboxHandlers();


})