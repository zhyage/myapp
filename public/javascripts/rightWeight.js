

function rightWeight() {
	this.rightWeightMethods =
		[{
			name : "平均法",
			method : function fun(dataSrc, colNum, rowNum, cOrR) {
				var RWArray = new Array();
				var i = 0;
				if (1 == cOrR) //colRW
				{
					var avg = 100 / colNum;
					for (i = 0; i < colNum; i++) {
						RWArray[i] = avg.toFixed(2);
					}
					return RWArray;
				} else {
					for (i = 0; i < rowNum; i++) {
						RWArray[i] = (100 / rowNum).toFixed(2);
					}
					return RWArray;
				}

			}
		}, {
			name : "倍增法",
			method : function fun(dataSrc, colNum, rowNum, cOrR) {
				var RWArray = new Array();
				var i = 0;
				if (1 == cOrR) //colRW
				{
					var j = 0;
					var total = 0;
					var tmp = 1;
					for(j = 0; j < colNum; j++)
					{
						tmp = tmp << 1;
						RWArray[j] = tmp;
						total = total + tmp;
					}
					return RWArray;
				} else {
					var j = 0;
					var total = 0;
					var tmp = 1;
					for(j = 0; j < rowNum; j++)
					{
						tmp = tmp << 1;
						RWArray[j] = tmp;
						total = total + tmp;
					}
					return RWArray;
				}

			}
		}

	];

	this.getRightWeightMethod = function (methodName) {
		var i = 0;
		for (i = 0; i < this.rightWeightMethods.length; i++) {
			var method = this.rightWeightMethods[i];
			if (methodName == method.name) {
				return method;
			}
		}
	}
	
	
	this.getRWMethodList = function()
	{
		var list = [];
		for (var i = 0; i < this.rightWeightMethods.length; i++)
		{
			var e = this.rightWeightMethods[i];
			list.push(e.name);
		}
		return list;
	}
}