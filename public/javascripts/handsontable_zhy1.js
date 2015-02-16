
$(document).ready(function(){
function getData() 
{
  return [
    ["", "Kia", "Nissan", "Toyota", "Honda"],
    ["2008", 10, 11, 12, 13],
    ["2009", 20, 11, 14, 13],
    ["2010", 30, 15, 12, 13]
  ];
}


  var container = document.getElementById('hot');
  var hot3 = new Handsontable(container,
    {
        /*
      data: getData(), 
      minSpareRows: 1,
      colHeaders: true,
      rowHeaders: true,
      contextMenu: true,
      manualColumnMove: true,
      manualRowMove: true,
      */
	    data: getData(),
        startRows: 5,
        startCols: 5,
        rowHeaders: true,
        colHeaders: true,
        minSpareRows: 1,
      manualColumnMove: true,
      manualRowMove: true,
  
    });

/*
var example3 = document.getElementById('example3');
var settings3 = 
{
    data: getData(),
    startRows: 5,
    startCols: 5,
    rowHeaders: true,
    colHeaders: true,
    minSpareRows: 1
};

var hot3 = new Handsontable(example3,settings3);
*/
hot3.updateSettings(
    {
        contextMenu: 
        {
            callback: function (key, options) 
            {
                if (key === 'about') 
                {
                    setTimeout(function () 
                    {
                        //timeout is used to make sure the menu collapsed before alert is shown
                        alert("This is a context menu with default and custom options mixed");
                    }, 100);
                }

            },

            items: 
            {
                "row_above": 
                {
                    disabled: function () 
                    {
                        //if first row, disable this option
                        return (hot3.getSelected()[0]===0)
                    }
                },
                "row_below": {},
                "hsep1": "---------",
                "remove_row": 
                {
                    name: 'Remove this row, ok?',
                    disabled: function () 
                    {
                        //if first row, disable this option
                        return  (hot3.getSelected()[0] === 0)
                    }
                },
                "hsep2": "---------",
                "about": {name: 'About this menu'}
            }
        }
    })

});
