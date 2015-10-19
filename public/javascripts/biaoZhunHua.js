$(document).ready(function() {
    $('#suffixName').val("ttddss");

    var formularConf = [];
    var currentFormular = {};
    var selectedSourceDataList = {};

    var selectedData = {};


    g_generateFormularDataList = [];


    $('#formularCommitButton').click(function() {


        //submitFormular2Server();
        //function submitMath2Server(userName, passwd, mathType, matrix, mathContent) {
        submitMath2Server("zhy", "123", "purifyCompute", biaoZhunHuaMatrix, g_generateFormularDataList);

        return true;
    });

/*    function submitFormularReq() {
        this.userName = '';
        this.passwd = '';
        this.sessionId = 0;
        this.matrix = '';
        this.formularList = '';

        this.generateSubmitFormularReq = function(userName, passwd, sessionId, matrix, formularList) {
            this.userName = userName;
            this.passwd = passwd;
            this.sessionId = sessionId;
            this.matrix = matrix;
            this.formularList = formularList;
        }
    }

    function submitFormular2Server() {
        console.info("entry submitFormular2Server");

        var userName = "zhy";
        var passwd = "123456";
        var sessionId = 1;

        var submitBody = new submitFormularReq();

        submitBody.generateSubmitFormularReq(userName, passwd, sessionId,
            biaoZhunHuaMatrix, g_generateFormularDataList);
        var bodyData = JSON.stringify(submitBody);

        $.ajax({
            type: "POST",
            url: "/submitComputExpressAndData",
            data: bodyData,
            contentType: "application/json; charset=utf-8",
            async: "false",
            success: function(data) {
                //alert(data);
                var resData = JSON.parse(data);
                console.info(" resData.reason = ", resData.reason);
                if (resData.result == "success") {
                    saveMatrixStr2LocalStorage("computedMatrix", resData.matrix)
                    //console.info("cccccccccccccc:", resData.matrix)
                } else {
                    var origDataStr = "";
                    origDataStr = loadMatrixStrFromLocalStorage("localMatrix");
                    if(origDataStr){
                        saveMatrixStr2LocalStorage("computedMatrix", origDataStr);
                        alert(resData.result);
                    }else{
                        alert("error to handle local storage");
                    }
                }
                console.info("now complete submitComputExpressAndData");
                location.replace("http://192.168.56.101:3000");
                //$.unblockUI();
                //return true;
            },
            failure: function(errMsg) {
                alert(errMsg);
                //return false;
            }
        });

    }*/


    function g_generateFormularDataLisRepeat(generateFormularData) {
        /*_.some(g_generateFormularDataList, function(ele){
            console.info("ele.srcDataName :", ele.srcDataName, "generateFormularData.srcDataName :", generateFormularData.srcDataName);
            console.info("ele.targetName :", ele.targetName, "generateFormularData.targetName :", generateFormularData.targetName);
            console.info("ele.formularName :", ele.formularName, "generateFormularData.formularName :", generateFormularData.formularName);
            console.info("ele.parameterList.length :", ele.parameterList.length, "generateFormularData.parameterList.length :", generateFormularData.parameterList.length);
            return (ele.srcDataName == generateFormularData.srcDataName &&
               ele.targetName == generateFormularData.targetName &&
               ele.formularName == generateFormularData.formularName &&
               ele.parameterList.length == generateFormularData.parameterList.length)
            
        })*/
        //return _.contains(g_generateFormularDataList, generateFormularData);
        var i = 0;
        for (i = 0; i < g_generateFormularDataList.length; i++) {
            if (g_generateFormularDataList[i].targetName == generateFormularData.targetName) {
                return true;
            } else if (g_generateFormularDataList[i].srcDataName == generateFormularData.srcDataName &&
                g_generateFormularDataList[i].formularName == generateFormularData.formularName &&
                g_generateFormularDataList[i].parameterList.length == generateFormularData.parameterList.length) {
                if (g_generateFormularDataList[i].parameterList.toString() == generateFormularData.parameterList.toString()) {
                    return true;
                }

            }
        }


        return false;

    }

    function append_g_generateFormularDataList(srcDataName, targetName, formularName, parameterList) {
        var generateFormularData = {};

        generateFormularData.srcDataName = srcDataName;
        generateFormularData.targetName = targetName;
        generateFormularData.formularName = formularName;
        generateFormularData.parameterList = parameterList;

        if (true == g_generateFormularDataLisRepeat(generateFormularData)) {
            alert("formular already exist");
            return false;
        }

        g_generateFormularDataList.push(generateFormularData);


        return true;
    }

    /*
var selectedData = 
{
    srcDataName:"ccc",
    suffixName : "xlcd",
    formular : "xxxx",
    parameters : [{"name":"x", "value":1}, {"name":"y", "value":2}]
}
*/

    function setSelectedData(srcDataName, suffixName, formularExpress, parameterList) {
        selectedData.srcDataName = srcDataName;
        selectedData.suffixName = suffixName;
        selectedData.formularExpress = formularExpress;
        selectedData.parameters = parameterList;
    }

    /*    $('#parameterSubmit').click(function() {

            $.unblockUI();

            return true;
        });

        $('#parameterCancel').click(function() {

            $.unblockUI();

            return true;
        });*/

    $('#HintYesButton').click(function() {

        // TODO: function to check the validate of parameters
        $.unblockUI();

        //console.info("inputSrcDataText :", inputSrcDataText,  "targetNameText :", targetNameText, "parameters_ :", parameters_);
        //console.info("targetNameText :", $('#targetNameText').val() );
        var srcDataName = $('#inputSrcDataText').val();
        var targetName = $('#targetNameText').val();
        var formularName = 'fn(' + currentFormular.name + ')';
        var parameterList = currentFormular.parameters;
        var formularParameterList = [];
        _.each(parameterList, function(ele) {
            var parameterName = '#targetParameters_' + ele.name;
            //console.info("targetParameters : ", $(parameterName).val());
            formularParameterList.push($(parameterName).val());
        })

        append_g_generateFormularDataList(srcDataName, targetName, formularName, formularParameterList);
        console.info("g_generateFormularDataList : ", g_generateFormularDataList);

        generaterFormularExpressionList();

        return true;

    })

    $('#HintCancelButton').click(function() {
        $.unblockUI();

        return true;

    })

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
                //initSelectedSourceDataList();
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
                    if (value) {
                        setCurrentSelectFormular(value);
                        //refreshCheckBox();
                    } //alert(value);
                }

            }],
        })

    }


    function setCurrentSelectFormular(formularName) {
        currentFormular = getFormularConfByButtonName(formularName);
        alert(currentFormular.buttonName);
    }

    function getCurrentSelectFormular() {
        return currentFormular;
    }

    function getFormularConfByButtonName(buttonName) {
        var formular = _.find(formularConf, function(formular) {
            return (formular.buttonName === buttonName)
        })
        return formular;
    }

    function getFormularConfByName(formularName) {
        var formular = _.find(formularConf, function(formular) {
            return (formular.name === formularName)
        })
        return formular;
    }

    var biaoZhunHuaMatrix = new matrix();
    var colNameList = [];

    function getMatrixData() {
        /*var biaoZhunHuaMatrixString = localStorage.getItem("localMatrix");
        console.info("dddddddddddd:", biaoZhunHuaMatrixString);
        biaoZhunHuaMatrix.loadData(JSON.parse(biaoZhunHuaMatrixString));*/
        loadMatrixFromLocalStorage("localMatrix", biaoZhunHuaMatrix);


        console.info("biaoZhunHuaMatrix colNum: ", biaoZhunHuaMatrix.colNum);

        var i = 0;

        for (i = 0; i < biaoZhunHuaMatrix.colNum; i++) {
            colNameList.push(biaoZhunHuaMatrix.getColHeaderNameByColNo(i));
        }

    }

    function generateParameterHintForm(srcDataName) {

        var suffixName = currentFormular.defaultSuffixName;
        var parameterList = currentFormular.parameters;
        var parameterAppendStr = "";
        var inputSrcDataAppendStr = "";

        inputSrcDataAppendStr = '<p><label>input data:</label><input type="text" id = "inputSrcDataText" value= ' + srcDataName + ' readonly="readonly"/></p>';

        $("#HintInputSrcData").html('');
        $("#HintInputSrcData").append(inputSrcDataAppendStr);
        //var suffixAppendStr = '<p><label>suffix name:</label><input type="text" id = "suffixNameText" /></p>';
        var targetName = suffixName + '_' + srcDataName;
        var targetNameAppendStr = '<p><label>target name:</label><input type="text" id = "targetNameText" value= ' + targetName + '></p>';
        $("#HintTargetName").html('');
        $("#HintTargetName").append(targetNameAppendStr);

        _.each(parameterList, function(ele) {
            console.info("ele.name :", ele.name);
            console.info("ele.hint :", ele.hint);
            parameterAppendStr = parameterAppendStr + '<p><label>' + ele.hint + ' </label> <p><label>' + ele.name + ' :</label><input type="text" id = "targetParameters_' + ele.name + '" /></p>'

        })
        $("#HintParameterList").html('');
        $("#HintParameterList").append(parameterAppendStr);

        var commentStr = '<p><label>commnet :</label><input type="text" id = "inputTargetDataComment" value= ""></p>';
        $('#HintComment').html('');
        $('#HintComment').append(commentStr);

        //TODO: to design a more flex and complicate rules for show parameters

        $.blockUI({
            message: $('#parameterHintFrm')
        });

    }


    /*    function generaterColumList() {

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

        }*/



    function generateColumListButton() {
        getMatrixData();

        var appendStr = "";
        var i = 0;
        for (i = 0; i < colNameList.length; i++) {
            var colName = '"' + colNameList[i] + '"';
            console.info("colName :", colName);
            //var tmpStr = '<button type="button"  onClick=this.generateParameterHintForm(' + colName + ') class="btn btn-default">' + colName + ' </button> <br>';
            //var tmpStr = '<button type="button"  class="btn btn-default">' + colName + ' </button> <br>';
            var tmpStr = '<label><input type="button" name=' + colName + ' value = ' + colName + ' /> </label> <br>';

            console.info("tmpStr : ", tmpStr);
            appendStr = appendStr.concat(tmpStr);
        }
        console.log("appendStr :", appendStr);
        $("#colNameList").append(appendStr);
        attachButtonClickHandlers();
    }


    /*    // call onload or in script segment below form
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
        }*/

    function attachButtonClickHandlers() {
        // get reference to element containing toppings checkboxes
        var el = document.getElementById('colNameList');

        // get reference to input elements in toppings container element
        var tops = el.getElementsByTagName('input');

        // assign updateTotal function to onclick property of each checkbox
        for (var i = 0, len = tops.length; i < len; i++) {
            if (tops[i].type === 'button') {
                tops[i].onclick = columDataClicked;
            }
        }
    }

    function columDataClicked(e) {
        generateParameterHintForm(this.name);
    }



    /*    // called onclick of toppings checkboxes
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



        function refreshCheckBox() {
            var list = selectedSourceDataList[currentFormular.name];

            var el = document.getElementById('colNameList');

            var tops = el.getElementsByTagName('input');

            // assign updateTotal function to onclick property of each checkbox
            for (var i = 0, len = tops.length; i < len; i++) {
                if (tops[i].type === 'checkbox') {
                    if (undefined != _.find(list, function(name) {
                        return (name === tops[i].name);
                    })) {
                        tops[i].checked = true;
                    } else {
                        tops[i].checked = false;
                    }
                }
            }

        }



        function initSelectedSourceDataList() {
            var formularNameList = _.map(formularConf, function(conf) {
                return conf.name;
            })

            for (var i = 0; i < formularNameList.length; i++) {
                selectedSourceDataList[formularNameList[i]] = [];
            }
            console.info("selectedSourceDataList : ", selectedSourceDataList);

        }

        function clearSelectedSourceDataList() {
            initSelectedSourceDataList();
        }

        function selectedSouceDataListAdd(ele) {
            if (undefined == _.find(selectedSourceDataList[currentFormular.name], function(e) {
                return (ele === e);
            })) {
                selectedSourceDataList[currentFormular.name].push(ele);
            }
        }

        function selectedSourceDataListDel(ele) {
            var index = _.indexOf(selectedSourceDataList[currentFormular.name], ele);
            if (-1 != index) {
                selectedSourceDataList[currentFormular.name].splice(index, 1);
            }
        }

        function showSelectedSourceDataList() {
            console.info("selectedSourceDataList : ", selectedSourceDataList);
        }
    */

    /*    function generaterFormularExpressionList() {


        var generaterFormularExpression = function(formularName, colName) {
            var formularConf = getFormularConfByName(formularName);
            var formularExpress = 'fn(' + formularConf.name + ')' + '(' + colName + " , " + formularConf.formula + ')';
            return formularExpress;

        }


        var expressionListStr = "";
        for (var formular in selectedSourceDataList) {
            var list = selectedSourceDataList[formular]
            for (var i = 0; i < list.length; i++) {
                var formularExpress = generaterFormularExpression(formular, list[i]);
                expressionListStr = expressionListStr.concat(formularExpress + '\n');
            }

        }

        setExpression(expressionListStr);

    }*/
    /*

        generateFormularData.srcDataName = srcDataName;
        generateFormularData.targetName = targetName;
        generateFormularData.formularName = formularName;
        generateFormularData.parameterList = parameterList;
    */

    function generaterFormularExpressionList() {
        var generaterFormularExpression = function(ele) {
            var targetName = ele.targetName;
            var formularName = ele.formularName;
            var defaultArg = ele.srcDataName;
            var argList = ele.parameterList;

            var expressString = targetName + " = " + formularName + "( " + defaultArg + ", " + argList.toString() + " )";
            console.info(expressString);
            return expressString;
        }
        var expressStringList = "";
        _.each(g_generateFormularDataList, function(ele) {

            expressStringList = expressStringList.concat(generaterFormularExpression(ele) + '\n');

        })
        setExpression(expressStringList);
    }



    getFormulaConfFromServer();
    //generaterColumList();
    generateColumListButton();
    //attachCheckboxHandlers();


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

/*    function generateParameterHintForm_step(srcDataName) {

        var suffixName = currentFormular.defaultSuffixName;
        var parameterList = currentFormular.parameters;
        var parameterAppendStr = "";
        var inputSrcDataAppendStr = "";

        inputSrcDataAppendStr = '<p><label>input data:</label><input type="text" id = "inputSrcDataText" placeholder= ' + srcDataName + ' readonly="readonly"/></p>';

        $("#HintInputSrcData").append(inputSrcDataAppendStr);
        //var suffixAppendStr = '<p><label>suffix name:</label><input type="text" id = "suffixNameText" /></p>';
        var targetName = suffixName + '_' + srcDataName;
        var targetNameAppendStr = '<p><label>target name:</label><input type="text" id = "targetNameText" placeholder= ' + targetName + '></p>';
        $("#HintTargetName").html('');
        $("#HintTargetName").append(targetNameAppendStr);

        _.each(parameterList, function(ele) {
            console.info("ele.name :", ele.name);
            console.info("ele.hint :", ele.hint);
            parameterAppendStr = parameterAppendStr + '<p><label>' + ele.hint + ' </label> <p><label>' + ele.name + ' :</label><input type="text" id = "parameters_' + ele.name + '" /></p>'

        })
        $("#HintParameterList").html('');
        $("#HintParameterList").append(parameterAppendStr);

        var commentStr = '<p><label>commnet :</label><input type="text" id = "inputTargetDataComment" placeholder= "comment"></p>';
        $('#HintComment').html('');
        $('#HintComment').append(commentStr);

        //TODO: to design a more flex and complicate rules for show parameters

        $.blockUI({
            message: $('#parameterHintFrm')
        });

    }*/

function step_step(name) {
    generateParameterHintForm(name);
}