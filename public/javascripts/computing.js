$(document).ready(function() {

    $('#cancelButton').click(function() {

        $.unblockUI();

        return true;
    });

    $('#yesButton').click(function() {
        var targetVarName = getTargetVarName();
        var expression = getExpression();

        submitComputExpressAndData(targetVarName, expression, computingMatrix);

        //$.unblockUI();
        return true;
    });

/*    $('#gyzsf_jiZhiFa').click(function() {
        toGetBiaoZhunFaExpress("gyzsf_jiZhiFa");
        return true;
    })

    $('#gyzsf_junZhiFa').click(function() {
        toGetBiaoZhunFaExpress("gyzsf_junZhiFa");
        return true;
    })*/

    $('#addVar2ExpressionButton').click(function() {
        console.info("addVar2ExpressionButton clicked");
        var inputVar = getInputVar();
        if ("" == inputVar) {
            alert("must select a variable");
        } else {
            modifyExpression(inputVar);
        }
    });

    $('#bbb').click(function() {
        alert("aaa");
    });

    function computExpressAndData() {
        this.targetVarName = '';
        this.expression = '';
        this.matrix = '';
        this.setComputExpressAndData = function(targetVarName, expression, matrix) {
            this.targetVarName = targetVarName;
            this.expression = expression;
            this.matrix = matrix;
        }
    }


    function submitComputExpressAndData(targetVarName, expression, matrix) {
        console.info("entry submitComputExpressAndData");
        var submitBody = new computExpressAndData();

        submitBody.setComputExpressAndData(targetVarName, expression, matrix);
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
                if (resData.result == "success") {
                    //sessionStorage.setItem("computedMatrix", JSON.stringify(resData.matrix));
                    //console.info("cccccccccccccc:", JSON.stringify(resData.matrix))
                    sessionStorage.setItem("computedMatrix", resData.matrix);
                    console.info("cccccccccccccc:", resData.matrix)
                } else {
                    var origData = sessionStorage.getItem("localMatrix");
                    sessionStorage.setItem("computedMatrix", origData);
                    console.info("cccccccccccccc:", origData);
                    alert("computing error!");
                }
                console.info("now complete submitComputExpressAndData");
                location.replace("http://192.168.56.101:3000");
                $.unblockUI();
                //return true;
            },
            failure: function(errMsg) {
                alert(errMsg);
                //return false;
            }
        });
    }


    
    function getFormulaConfFromServer(){
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
                getEvalStr(formularConf);
            },
            failure: function(errMsg) {
                alert(errMsg);
                //return false;
            }
        });
    }

    getFormulaConfFromServer();

    function toGetBiaoZhunFaExpress(biaoZhunFaName) {
        console.info("entry toGetBiaoZhunFaExpress");
        var submitBody = {
            "biaoZhunFaName": ""
        };
        submitBody.biaoZhunFaName = biaoZhunFaName;

        var bodyData = JSON.stringify(submitBody);
        $.ajax({
            type: "POST",
            url: "/toGetBiaoZhunFaExpress",
            data: bodyData,
            contentType: "application/json; charset=utf-8",
            async: "false",
            success: function(data) {
                var returnMsg = JSON.parse(data);
                setExpression(returnMsg.formula);
                setHints(returnMsg.hints);

            },
            failure: function(errMsg) {
                alert(errMsg);
                //return false;
            }
        });
    }




    var computingMatrix = new matrix();
    var colHeaderList = [];

    var computingMatrixString = sessionStorage.getItem("localMatrix");
    console.info("dddddddddddd:", computingMatrixString);
    computingMatrix.loadData(JSON.parse(computingMatrixString));


    console.info("computingMatrix colNum: ", computingMatrix.colNum);

    var i = 0;

    for (i = 0; i < computingMatrix.colNum; i++) {
        colHeaderList.push(computingMatrix.getColHeaderNameByColNo(i));
    }


    var gSelectString = "";

    function selectInputVar(varString) {
        gSelectString = varString;
    }

    function getInputVar() {
        return gSelectString;
    }

    $('#varList').jsonForm({
        "schema": {
            "colVar": {
                "type": "string",
                "title": "input colVar",
                //"enum": [ "JavaScript", "Python", "PHP", "Java", "C++", "other" ]
                "enum": colHeaderList
            }
        },
        "value": {
            "colVar": "",
        },
        "form": [{
            "key": "colVar",
            //"type": "radiobuttons",
            "type": "radios",
            "activeClass": "btn-success",

            "onClick": function(evt) {
                var value = $(evt.target).val();
                console.info("select value :", value);
                selectInputVar(value);
                //alert("value :", value);
            }
        }],

    });


function getEvalStr(formularConf) {
  console.info("ffff formularConf :", formularConf);


    var genStr = "";
    for (i = 0; i < formularConf.length; i++) {
        var buttonName = formularConf[i].buttonName;
        console.info("buttonName :", buttonName);
        var functionStr = '"onClick" : function(evt){ evt.preventDefault(); toGetBiaoZhunFaExpress("' + formularConf[i].name + '");}},';
        var tmpStr = '{ "type" : "button", "title" : "' + buttonName + '",' + functionStr;

        genStr = genStr + tmpStr;

    }

    genStr = '$("#methodList").jsonForm({"form": [{"type": "actions","items": [' + genStr + ']}],});'

    console.info("genStr = ", genStr);
    eval(genStr);
    
}


});






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


/*

function getGy_jizhFormula(){
  var gy = new gy_jizh_method();
  setExpression(gy.getFormulaName());
  $('#numericExpressions').select();
}

  

function gy_jizh_method(){
    this.formulaName = "gyzhishufa";
    this.inputCol = "x";
    this.positive = "y";

    this.getFormulaName = function(){
        return this.formulaName;
    }
    this.gethitDescript = function(){

    }
}



function showHint(hitMessage) {
  $('#numericExpressionsHint').val(hitMessage);
}
function clearHint() {
  $('#numericExpressionsHint').val("");
}

*/