$(document).ready(function() {
    $('#suffixName').val("ttddss");

var formularConf = [];
var currentFormular = {};
var selectedSourceDataList = {};

var selectedData = {};
/*
var selectedData = 
{
    srcDataName:"ccc",
    suffixName : "xlcd",
    formular : "xxxx",
    parameters : [{"name":"x", "value":1}, {"name":"y", "value":2}]
}
*/

    function setSelectedData(srcDataName, suffixName, formularExpress, parameterList){
        selectedData.srcDataName = srcDataName;
        selectedData.suffixName = suffixName;
        selectedData.formularExpress = formularExpress;
        selectedData.parameters = parameterList;
    }

    $('#parameterSubmit').click(function() {

        $.unblockUI();

        return true;
    });

    $('#parameterCancel').click(function() {

        $.unblockUI();

        return true;
    });

    function getFormulaConfFromServer() {
        
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
                initSelectedSourceDataList();
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
        setCurrentSelectFormular(buttonNameList[0]);
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
                    if (value){
                        setCurrentSelectFormular(value);
                        refreshCheckBox();
                    } //alert(value);
                }

            }],
        })

    }


    function setCurrentSelectFormular(formularName){
        currentFormular = getFormularConfByButtonName(formularName);
        alert(currentFormular.buttonName);
    }

    function getCurrentSelectFormular(){
        return currentFormular;
    }

    function getFormularConfByButtonName(buttonName){
        var formular = _.find(formularConf, function(formular){
            return (formular.buttonName === buttonName)
        })
        return formular;
    }

    function getFormularConfByName(formularName){
        var formular = _.find(formularConf, function(formular){
            return (formular.name === formularName)
        })
        return formular;
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

        if (this.checked) {
            //alert(this.name + "checked");
            generateParameterHintForm(this.name);
            //$.blockUI({ message: $('#parameterHintFrm') }); 
 
            //setTimeout($.unblockUI, 2000); 

            selectedSouceDataListAdd(this.name);
        } else {
            //alert(this.name + "unchecked");
            selectedSourceDataListDel(this.name);
        }
        showSelectedSourceDataList();
        generaterFormularExpressionList();

    }



    function generateParameterHintForm(srcDataName){

        var suffixName = currentFormular.defaultSuffixName;
        var parameterList = currentFormular.parameters;
        var parameterAppendStr = "";
        var inputSrcDataAppendStr = "";

        inputSrcDataAppendStr = '<p><label>input data:</label><input type="text" id = "inputSrcDataText" placeholder= ' + srcDataName + ' readonly="readonly"/></p>';

        $("#inputSrcData").append(inputSrcDataAppendStr);
        //var suffixAppendStr = '<p><label>suffix name:</label><input type="text" id = "suffixNameText" /></p>';
        var suffixAppendStr = '<p><label>suffix name:</label><input type="text" id = "suffixNameText" placeholder= ' + suffixName + '/></p>';
        $("#suffixName").html('');
        $("#suffixName").append(suffixAppendStr);

        _.each(parameterList, function(ele){
            console.info("ele.name :", ele.name);
            console.info("ele.hint :", ele.hint);
            parameterAppendStr = parameterAppendStr + '<p><label>' + ele.hint + ' </label> <p><label>' + ele.name + ' :</label><input type="text" id = "parameters_' + ele.name + '" /></p>'

        })
        $("#parameterList").html('');
        $("#parameterList").append(parameterAppendStr);

        $.blockUI({ message: $('#parameterHintFrm') }); 

    }

    function refreshCheckBox(){
        var list = selectedSourceDataList[currentFormular.name];

        var el = document.getElementById('colNameList');

        var tops = el.getElementsByTagName('input');

        // assign updateTotal function to onclick property of each checkbox
        for (var i = 0, len = tops.length; i < len; i++) {
            if (tops[i].type === 'checkbox') {
                if(undefined != _.find(list, function(name){
                    return (name === tops[i].name);
                })){
                    tops[i].checked = true;
                } else {
                    tops[i].checked = false;
                }
            }
        }

    }



    function initSelectedSourceDataList(){
        var formularNameList = _.map(formularConf, function(conf) {
            return conf.name;
        })

        for(var i = 0; i < formularNameList.length; i++){
            selectedSourceDataList[formularNameList[i]] = [];
        }
        console.info("selectedSourceDataList : ", selectedSourceDataList);

    }

    function clearSelectedSourceDataList(){
        initSelectedSourceDataList();
    }

    function selectedSouceDataListAdd(ele){
        if(undefined == _.find(selectedSourceDataList[currentFormular.name], function(e){
            return (ele === e);
        })){
            selectedSourceDataList[currentFormular.name].push(ele);
        }
    }

    function selectedSourceDataListDel(ele){
        var index = _.indexOf(selectedSourceDataList[currentFormular.name], ele);
        if(-1 != index){
            selectedSourceDataList[currentFormular.name].splice(index, 1);
        }
    }

    function showSelectedSourceDataList(){
        console.info("selectedSourceDataList : ", selectedSourceDataList);
    }


    function generaterFormularExpressionList(){


        var generaterFormularExpression = function(formularName, colName){
            var formularConf = getFormularConfByName(formularName);
            var formularExpress = 'fn(' + formularConf.name + ')' + '(' + colName + " , " + formularConf.formula + ')';
            return formularExpress;

        }

        
        var expressionListStr = "";
        for(var formular in selectedSourceDataList){
            var list = selectedSourceDataList[formular]
            for(var i = 0; i < list.length; i++){
                var formularExpress = generaterFormularExpression(formular, list[i]);
                expressionListStr = expressionListStr.concat(formularExpress + '\n');
            }

        }
        
        setExpression(expressionListStr);

    }



    getFormulaConfFromServer();
    generaterColumList();
    attachCheckboxHandlers();


})

var gExpressionRes = {
    expressionString: "",
    cursorStart: 0,
    cursorEnd: 0
};

function getExpressionAndCursorPosition() {
    gExpressionRes.expressionString = $('#numericExpressions').val();
    gExpressionRes.cursorStart = $('#numericExpressions').prop("selectionStart");
    gExpressionRes.cursorEnd = $('#numericExpressions').prop("selectionEnd");
    //alert(JSON.stringify(gExpressionRes));
}

function setExpression(expressString) {
    $('#numericExpressions').val(expressString);
}

function setHints(hitMessage) {
    $('#numericExpressionsHint').val(hitMessage);
}

function getExpression() {
    return $('#numericExpressions').val();
}

function getTargetVarName() {
    return $('#targetVariable').val();
}

function modifyExpression(addString) {
    var newExpress = "";
    getExpressionAndCursorPosition();
    if (0 == gExpressionRes.expressionString) {
        newExpress = addString;
    } else {
        var first = gExpressionRes.expressionString.slice(0, gExpressionRes.cursorStart);
        var tail = gExpressionRes.expressionString.slice(gExpressionRes.cursorEnd,
            gExpressionRes.expressionString.length);
        newExpress = first + addString + tail;

    }
    //alert(newExpress);
    setExpression(newExpress);
    //alert($('#yesButton').text());
}