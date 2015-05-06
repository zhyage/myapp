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
    }
    );

    function computExpressAndData()
    {
      this.targetVarName = '';
      this.expression = '';
      this.matrix = '';
      this.setComputExpressAndData = function(targetVarName, expression, matrix)
      {
        this.targetVarName = targetVarName;
        this.expression = expression;
        this.matrix = matrix;
      }
    }


    function submitComputExpressAndData(targetVarName, expression, matrix) {
      console.info("entry submitComputExpressAndData");
      var submitBody = new computExpressAndData();

      submitBody.setComputExpressAndData(targetVarName, expression, matrix)
      var bodyData = JSON.stringify(submitBody);
      $.ajax({
        type: "POST",
        url: "/submitComputExpressAndData",
        data: bodyData,
        contentType: "application/json; charset=utf-8",
        async: "false",
        success: function(data) {
          //alert(data);
          sessionStorage.setItem("computedMatrix", data);
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




  var computingMatrix = new matrix();
  var colHeaderList = [];

  var computingMatrixString = sessionStorage.getItem("localMatrix");
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
      }
    ],

  });

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

function getExpression()
{
  return $('#numericExpressions').val();
}

function getTargetVarName()
{
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