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


	function generateInsertColumnForm(rowNo, colNo, before) {
		$('#insertFrm').html('');
		console.info("entry generateInsertCBForm");
		if (colNo < 2 || colNo > myData_1.getColumnNum()) {
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
				"dataType" : "xiaoshu"
			},

			"form" : [
				"columnHeader",
				"dataType", {
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
					if (true == before) {
						myData_1.insertCol(colNo, columnName, dataType);
					} else {
						myData_1.insertCol(colNo + 1, columnName, dataType);
					}
					hot.loadData(myData_1.getShowPureDataMatrix());
				}
				$.unblockUI();
			},

		});
	}

	function generateInsertRowForm(rowNo, colNo, before) {
		$('#insertFrm').html('');
		console.info("entry generateInsertRowForm");
		if (rowNo < 2 || rowNo > myData_1.getRowNum()) {
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
					required : true
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
				} else {
					console.info("submit insert row on submit");
					rowHeadName = values.rowHeader;
					if (true == before) {
						myData_1.insertRow(rowNo, rowHeadName);
					} else {
						myData_1.insertRow(rowNo + 1, rowHeadName);
					}
					hot.loadData(myData_1.getShowPureDataMatrix());
				}
				$.unblockUI();
			},

		});
	}

	function generateDeleteColForm(rowNo, colNo) {
		$('#insertFrm').html('');
		console.info("entry generateDeleteColForm");
		if (colNo < 2 || colNo > myData_1.getColumnNum()) {
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
				if (errors) {
					alert("error happens when delete column");
				} else {
					console.info("submit delete column on submit");
					myData_1.deleteCol(colNo);
					hot.loadData(myData_1.getShowPureDataMatrix())

				}
				$.unblockUI();
			},

		});
	}

	function generateDeleteRowForm(rowNo, colNo) {
		$('#insertFrm').html('');
		console.info("entry generateDeleteRowForm");
		if (rowNo < 2 || rowNo > myData_1.getRowNum()) {
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
				} else {
					console.info("submit delete row on submit");
					myData_1.deleteRow(rowNo);
					hot.loadData(myData_1.getShowPureDataMatrix())

				}
				$.unblockUI();
			},

		});
	}

	function generateColHeaderForm(rowNo, colNo, cellInfo) {
		console.info("entry generateColHeaderForm");
		var e = JSON.parse(cellInfo);
		var dataTypeList = [];
		var currentDataType = myData_1.getDataTypeByColNo(colNo, myData_1.copyCurrentMatrix2());
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
				"columnHeader" : e.data,
				//"dataType": e.dataType
				"dataType" : currentDataType
			},
			onSubmit : function (errors, values) {
				if (errors) {
					alert("error happens when set colHEaderName cell");
				} else {
					//e.data = values.columnHeader;
					//e.dataType = values.dataType;
					myData_1.modifyColumnHeader(colNo, values.columnHeader, values.dataType);
					//var jsonStr = JSON.stringify(e);
					//myData_1.modifyCell(rowNo, colNo, jsonStr);
					hot.loadData(myData_1.getShowPureDataMatrix());

				}
			}

		});
	}

	function generateRowHeaderForm(rowNo, colNo, cellInfo) {
		console.info("entry generateRowHeaderForm");
		var e = JSON.parse(cellInfo);
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
				"rowHeader" : e.data
			},
			onSubmit : function (errors, values) {
				if (errors) {
					alert("error happens when set rowHeaderName cell");
				} else {
					myData_1.modifyRowHeader(rowNo, values.rowHeader);
					//e.data = values.rowHeader;
					//var jsonStr = JSON.stringify(e);
					//myData_1.modifyCell(rowNo, colNo, jsonStr);
					hot.loadData(myData_1.getShowPureDataMatrix());

				}
			}

		});
	}

	function generateColRWForm(cellInfo) {}

	function generateRowRWForm(cellInfo) {}

	function generateNormalDataForm(rowNo, colNo, cellInfo) {
		console.info("entry generateNormalDataForm");
		$('#editFrm').html('');
		var e = JSON.parse(cellInfo);
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
				"columnHeaderName" : e.colHeaderName,
				"rowHeaderName" : e.rowHeaderName,
				"dataType" : e.dataType,
				"data" : e.data
			},
			onSubmit : function (errors, values) {
				if (errors) {
					alert("error happens when set rowHeaderName cell");
				} else {
					myData_1.modifyPureData(rowNo, colNo, values.data, values.dataType)
					//e.data = values.data;
					//var jsonStr = JSON.stringify(e);
					//myData_1.modifyCell(rowNo, colNo, jsonStr);
					hot.loadData(myData_1.getShowPureDataMatrix());

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
				var load = JSON.parse(data);
				console.info("load matrix = ", load);
				myData_1.loadData(load.colNum, load.rowNum, load.currentColRWMethod, load.currentRowRWMethod, load.matrix);
				console.info("lllllllllllllllll = ", myData_1);
				hot.loadData(myData_1.getShowPureDataMatrix());
				
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

	function createForm(rowNo, colNo) {
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

	}

	function fileInServer() {
		this.fileName = '';
		this.matrix = '';
		this.setSaveData = function (fileName, matrix) {
			this.fileName = fileName;
			this.matrix = matrix;
		}
	}

	function saveCurrentSheetToServer(fileName) {
		console.info("entry saveCurrentSheetToServer");
		var saveBody = new fileInServer();
		//saveBody.setSaveData(fileName, myData_1.matrix);
		saveBody.setSaveData(fileName, myData_1)
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
				alert(data);
			},
			failure : function (errMsg) {
				alert(errMsg);
			}
		});
	}

	console.info("xxxxxxxxxxxxxx start xxxxxxxxxxxxxx");

	var clickRow = 0;
	var clickCol = 0;

	function setClickRowAndCol(row, col) {
		clickRow = row;
		clickCol = col;
		createForm(row, col);
	}

	var g_eleType = new eleDataTypeEnume();
	//var g_rightWeight = new rightWeight();
	//console.info("WRList = ", g_rightWeight.getRWMethodList());
	console.info("new matrix");
	var myData_1 = new myMatrix();
	myData_1.initMatrix(5, 6);
	//myData_1.setCurrentColRWMethod(g_rightWeight.getRightWeightMethod("平均法"));
	//myData_1.setCurrentRowRWMethod(g_rightWeight.getRightWeightMethod("平均法"));
	myData_1.setCurrentColRWMethod("平均法");
	myData_1.setCurrentRowRWMethod("平均法");
	console.info("kkkkkkkk", myData_1.matrix);

	var data = myData_1.getShowPureDataMatrix();

	myData_1.generateJsonData();

	var container = document.getElementById('hot');
	var hot = new Handsontable(container, {
			data : data,
			minSpareRows : 1,
			colHeaders : true,
			rowHeaders : true,
			manualColumnMove : true,
			manualRowMove : true,
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

			cells : function (row, col, prop) {
				if("blank" == myData_1.getCellDataType(row, col))
				{
					this.renderer = greyRenderer;
				}
				if("colHeader" == myData_1.getCellDataType(row, col) || "rowHeader" == myData_1.getCellDataType(row, col))
				{
					this.renderer = orangeRenderer;
				}
				if("colRW" == myData_1.getCellDataType(row, col) || "rowRW" == myData_1.getCellDataType(row, col))
				{
					this.renderer = blackRenderer;
				}
				if("colRes" == myData_1.getCellDataType(row, col) || "rowRes" == myData_1.getCellDataType(row, col))
				{
					this.renderer = yellowRenderer;
				}
				/*
				if ((row == 0 && col >= 2) || (col == 0 && row >= 2)) {
					this.renderer = orangeRenderer;
				}
				
				if ((row == 1 && col >= 2) || (col == 1 && row >= 2)) {
					this.renderer = yellowRenderer;
				}
				*/
				var cellProperties = {};
				if (row < 2 || col < 2) {
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