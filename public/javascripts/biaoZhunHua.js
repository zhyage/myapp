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
                    "required" : true,
                    "enum": buttonNameList
                }
            },
            "form": [{
                "key": "methodList",
                "onChange": function (evt) {
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

    function showMatrixColNameList() {

        getMatrixData();

        $("#colNameList").jsonForm({
            "schema": {
                "menu": {
                    "type": "array",
                    "title": "Options",
                    "items": {
                        "type": "string",
                        "title": "Option",
                        "enum": colNameList
                    }
                }
            },
            "form": [{
                "key": "menu",
                "onClick": function (evt) {
                    alert("checked");
                    var value = $(evt.target).val();
                    if (value) alert(value);
                },
                "type": "checkboxes",

                
            }]
        })
    }

    getFormulaConfFromServer();
    showMatrixColNameList();

})