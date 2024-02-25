const dirtySelects = [];

getData().then((data) => {

    var aSelect = document.getElementById('aSelect');
    var bSelect = document.getElementById('bSelect');
    var cSelect = document.getElementById('cSelect');
    var result = document.getElementById('result');

    result.innerHTML = data;
    var splitedData = data.split('\r\n');

    initSelect(splitedData, aSelect, SelectOption.a);
    initSelect(splitedData, bSelect, SelectOption.b);
    initSelect(splitedData, cSelect, SelectOption.c);

    aSelect.addEventListener('change', event => {
        if (event.target.value == SelectOption.all.value) {
            result.innerHTML = data;
            bSelect.value = SelectOption.all.value;
            cSelect.value = SelectOption.all.value;
        }
        else {
            dirtySelects.forEach(select => clearSelectAddedRangeValues(select));

            var range = splitedData.filter(w => w.includes(event.target.value));
            var separator = '\n';
            var res = range.join(separator);

            updateSelect(range, bSelect, SelectOption.b);
            updateSelect(range, cSelect, SelectOption.c);
            result.innerHTML = res;
        }
    });

    bSelect.addEventListener('change', event => {
        if (event.target.value == SelectOption.all.value) {
            result.innerHTML = data;
            aSelect.value = SelectOption.all.value;
            cSelect.value = SelectOption.all.value;
        }
        else {
            dirtySelects.forEach(select => clearSelectAddedRangeValues(select));

            var range = splitedData.filter(w => w.includes(event.target.value));
            var separator = '\n';
            var res = range.join(separator);

            updateSelect(range, aSelect, SelectOption.a);
            updateSelect(range, cSelect, SelectOption.c);
            result.innerHTML = res;

        }
    });

    cSelect.addEventListener('change', event => {
        if (event.target.value == SelectOption.all.value) {
            result.innerHTML = data;
            aSelect.value = SelectOption.all.value;
            bSelect.value = SelectOption.all.value;
        }
        else {
            dirtySelects.forEach(select => clearSelectAddedRangeValues(select));

            var range = splitedData.filter(w => w.includes(event.target.value));
            var separator = '\n';
            var res = range.join(separator);

            updateSelect(range, aSelect, SelectOption.a);
            updateSelect(range, bSelect, SelectOption.b);
            result.innerHTML = res;
        }
    });
});

async function getData() {
    var response = await fetch('testData.txt');
    return response.text();
};

function initSelect(data, selectTag, selectOption) {
    var arr = data.filter(w => w.includes(selectOption.key))
        .map(value => value.split(',')[selectOption.value]);

    var uniqueArr = [...new Set(arr)];

    var opt = document.createElement("option");
    opt.value = SelectOption.all.value;
    opt.innerHTML = SelectOption.all.key;
    selectTag.append(opt);

    uniqueArr.map(value => {
        var opt = document.createElement("option");
        opt.value = value;
        opt.innerHTML = value;
        selectTag.appendChild(opt);
    });
};

function updateSelect(data, selectTag, selectOption) {
    var arr = data.filter(w => w.includes(selectOption.key))
        .map(value => value.split(',')[selectOption.value]);

    var uniqueArr = [...new Set(arr)];

    var rangeValue;

    if (uniqueArr.length > 1) {
        var first = uniqueArr[0];
        var last = uniqueArr[uniqueArr.length - 1];
        rangeValue = first + ' - ' + last;

        var opt = document.createElement("option");
        opt.value = rangeValue;
        opt.innerHTML = rangeValue;

        selectTag.appendChild(opt);
        selectTag.value = rangeValue;
        dirtySelects.push(selectTag);
    }
    else {
        rangeValue = uniqueArr[0];
        selectTag.value = rangeValue;
    }
};

function clearSelectAddedRangeValues(selectTag) {
    var opt = selectTag.options;
    for (var i = 0; i < opt.length; i++) {
        if (opt[i].value.includes('-')) {
            selectTag.removeChild(opt[i]);
        }
    }
}

const SelectOption = {
    all: { key: 'Toate', value: -1 },
    a: { key: 'A', value: 0 },
    b: { key: 'B', value: 1 },
    c: { key: 'C', value: 2 },
}
