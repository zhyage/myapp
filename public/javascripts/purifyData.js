

function purifyData() {
	this.purifyDataMethods =
		[{
			name : "平均法",
			method : function fun(dataSrc, colNum, rowNum, cOrR) {
				console.info("colNum = ", colNum, "rowNum = ", rowNum, "dataSrc = ", dataSrc);
				var resArray = new Array();
				var i = 0;
				var j = 0;
				if(1 == cOrR)//col
				{
					for (i = 0; i < colNum; i++)
					{
						var total = 0;
						for(j = 0; j < rowNum; j++)
						{
							total = total + parseFloat(dataSrc[j][i]);
						}
						var avg = total / rowNum;
						resArray[i] = avg.toFixed(2);
						
						
					}
					console.info("get resArray = ", resArray);
					return resArray;
				}
				else//row
				{
					for(i = 0; i < rowNum; i++)
					{
						var total = 0;
						for(j = 0; j < colNum; j++)
						{
							total = total + parseFloat(dataSrc[i][j]);
						}
						var avg = total /colNum;
						resArray[i] = avg.toFixed(2);
						
					}
					console.info("get resArray = ", resArray);
					return resArray;
				}

			}
		},
		{
			name : "累加法",
			method : function fun(dataSrc, colNum, rowNum, cOrR) {
				console.info("colNum = ", colNum, "rowNum = ", rowNum, "dataSrc = ", dataSrc);
				var resArray = new Array();
				var i = 0;
				var j = 0;
				if(1 == cOrR)//col
				{
					for (i = 0; i < colNum; i++)
					{
						var total = 0;
						for(j = 0; j < rowNum; j++)
						{
							total = total + parseFloat(dataSrc[j][i]);
						}
						var avg = total;
						resArray[i] = avg.toFixed(2);
						
						
					}
					console.info("get resArray = ", resArray);
					return resArray;
				}
				else//row
				{
					for(i = 0; i < rowNum; i++)
					{
						var total = 0;
						for(j = 0; j < colNum; j++)
						{
							total = total + parseFloat(dataSrc[i][j]);
						}
						var avg = total;
						resArray[i] = avg.toFixed(2);
						
					}
					console.info("get resArray = ", resArray);
					return resArray;
				}

			}
		},

	];

	this.getPurifyDataMethod = function (methodName) {
		var i = 0;
		for (i = 0; i < this.purifyDataMethods.length; i++) {
			var method = this.purifyDataMethods[i];
			if (methodName == method.name) {
				return method;
			}
		}
	}
	
	
	this.getPurifyDataMethodList = function()
	{
		var list = [];
		for (var i = 0; i < this.purifyDataMethods.length; i++)
		{
			var e = this.purifyDataMethods[i];
			list.push(e.name);
		}
		return list;
	}
}