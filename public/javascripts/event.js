
$(document).ready(function(){
var data = [
    ["", "Maserati", "Mazda", "Mercedes", "Mini", "Mitsubishi"],
    ["2009", 0, 2941, 4303, 354, 5814],
    ["2010", 5, 2905, 2867, 412, 5284],
    ["2011", 4, 2517, 4822, 552, 6127],
    ["2012", 2, 2422, 5399, 776, 4151]
    ];

    var config = {
        data: data,
        minRows: 5,
        minCols: 6,
        minSpareRows: 1,
        autoWrapRow: true,
        colHeaders: true,
        contextMenu: true
    };

    var $hooksList = $('#hooksList');
    var hooks = Handsontable.hooks.getRegistered();
    hooks.forEach(function(hook) {
        var checked = '';
        /*
        if (hook !== 'modifyRowHeight' && hook !== 'modifyRow' && hook !== 'modifyCol' && hook !== 'afterRenderer' && hook !== 'beforeGetCellMeta' && hook !== 'afterGetCellMeta') {
            checked = 'checked';
        }
        */

        if (hook == 'afterOnCellMouseDown') {
            checked = 'checked';
        }
        $hooksList.append('<li><label><input type="checkbox" ' + checked + ' id="check_' + hook + '"> ' + hook + '</label></li>');
        config[hook] = function() {
            log_events(hook, arguments);
        }
    });

    var start = (new Date()).getTime();
    var i = 0;

    var timer;
    var example1_events = document.getElementById("example1_events");
    function log_events(event, data) {
        if (document.getElementById('check_' + event).checked) {
            var now = (new Date()).getTime();
            var diff = now - start;

            var vals = [
                i,
                "@" + numeral(diff / 1000).format('0.000'),
                "[" + event + "]"
                ];

                var str;
                for (var d = 0; d < data.length; d++) {
                    try {
                    str = JSON.stringify(data[d]);
                }
                catch (e) {
                    str = data[d].toString(); //JSON.stringify breaks on circular reference to a HTML node
                }

                if (str === void 0) {
                    continue;
                }

                if (str.length > 20) {
                str = Object.prototype.toString.call(data[d]);
            }
            if (d < data.length - 1) {
                str += ',';
            }
            vals.push(str);
        }

        if (window.console) {
            console.log(i,
            "@" + numeral(diff / 1000).format('0.000'),
            "[" + event + "]",
            data);
        }

        var div = document.createElement("DIV");
        var text = document.createTextNode(vals.join(" "));
        div.appendChild(text);
        example1_events.appendChild(div);
        clearTimeout(timer);
        timer = setTimeout(function() {
            example1_events.scrollTop = example1_events.scrollHeight;
        }, 10);

        i++;
    }
}

var example1 = document.getElementById('example1');
var hot = new Handsontable(example1,config);

$('#check_select_all').click(function () {
    var state = this.checked;
    $('input[type=checkbox]').each(function () {
        if (state === true) {
            if (this.id === 'check_modifyRow') {
                return; //too much noise in the log
            }
        }
        this.checked = state;
    });
});

$('input[type=checkbox]').click(function () {
    if (!this.checked) {
        document.getElementById('check_select_all').checked = false;
    }
});

});
