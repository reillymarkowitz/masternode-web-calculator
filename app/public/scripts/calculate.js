var data = [];

function calculate() {
    resetTable();
    data = []
    var today = new Date();
    var numMonths = document.getElementById("months").value;
    if (numMonths > 0) {
        var firstMonth = {
            "month": 1,
            "nodes": parseInt(document.getElementById("purchased-nodes").value),
            "current_price": parseFloat(document.getElementById("token-price").innerHTML)
        };
        firstMonth["reward_time"] = parseFloat(document.getElementById("reward-interval").value);
        firstMonth["total_coins"] = firstMonth["nodes"] * 1000;
        firstMonth["reward_coins"] = 720 / firstMonth["reward_time"] * reward(new Date()) * firstMonth["nodes"];
        firstMonth["new_nodes"] = Math.floor(firstMonth["reward_coins"] / 1000);
        firstMonth["remaining_coins"] = firstMonth["reward_coins"] - firstMonth["new_nodes"] * 1000;
        firstMonth["total_value"] = firstMonth["total_coins"] * firstMonth["current_price"];
        firstMonth["cashed_out"] = firstMonth["reward_coins"] * parseFloat(document.getElementById("monthly-rewards-cashed").value / 100);
        firstMonth["cashed_out_value"] = firstMonth["cashed_out"] * firstMonth["current_price"];
        data.push(firstMonth);
        
        var i;
        for (i = 1; i < numMonths; i++) {
            today.setMonth(today.getMonth() + 1);
            var nextMonth = {
                "month": i + 1,
                "nodes": data[i - 1]["nodes"] + data[i - 1]["new_nodes"],
                "current_price": data[i - 1]["current_price"] * (1 + parseFloat(document.getElementById("monthly-price-increase").value / 100))
            };
            nextMonth["reward_time"] = nextMonth["nodes"] / 24 + parseFloat(document.getElementById("reward-interval").value);
            nextMonth["reward_coins"] = 720 / nextMonth["reward_time"] * nextMonth["nodes"] * reward(today);
            nextMonth["cashed_out"] = nextMonth["reward_coins"] * parseFloat(document.getElementById("monthly-rewards-cashed").value / 100);
            nextMonth["cashed_out_value"] = nextMonth["cashed_out"] * nextMonth["current_price"];
            nextMonth["total_coins"] = data[i - 1]["total_coins"] + data[i - 1]["reward_coins"] - nextMonth["cashed_out"];
            nextMonth["new_nodes"] = Math.floor((nextMonth["reward_coins"] + data[i - 1]["remaining_coins"] - nextMonth["cashed_out"]) / 1000);
            nextMonth["remaining_coins"] = nextMonth["reward_coins"] + data[i - 1]["remaining_coins"] - nextMonth["new_nodes"] * 1000;
            nextMonth["total_value"] = nextMonth["total_coins"] * nextMonth["current_price"];
            data.push(nextMonth);
        }
        writeToTable();
    } else document.getElementById("output").style.visibility = "visible";
}

function writeToTable() {
    var tableRef = document.getElementById('output-table').getElementsByTagName('tbody')[0];
    var i;
    for (i = 0; i < data.length; i++) {
        var values = [
            data[i]["month"],
            data[i]["nodes"],
            formatNum(data[i]["reward_time"]),
            formatNum(data[i]["total_coins"]),
            formatNum(data[i]["reward_coins"]),
            data[i]["new_nodes"],
            formatNum(data[i]["remaining_coins"]),
            formatUSD(data[i]["total_value"]),
            formatUSD(data[i]["current_price"]),
            formatNum(data[i]["cashed_out"]),
            formatUSD(data[i]["cashed_out_value"])
        ];
        var newRow = tableRef.insertRow(tableRef.rows.length);
        var monthCell = newRow.insertCell(0);
        var monthText = document.createTextNode(values[0]);
        monthCell.appendChild(monthText);
        if(values[0] % 12 == 0)
            monthCell.style.fontWeight = 'bold';
        var j;
        for (j = 1; j < values.length; j++) {
            var newCell = newRow.insertCell(j);
            var newText = document.createTextNode(values[j]);
            newCell.appendChild(newText);
        }
    }
    document.getElementById("output").style.visibility = "visible";
}

function resetTable() {
    $("#output-table tbody tr").remove()
}

function formatNum(num) {
    return parseFloat(num).toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function formatUSD(num) {
    return '$' + formatNum(num.toFixed(2));
}

function reward(date) {
    epoch = new Date(2019, 0, 1)
    yearsSince = date.getFullYear() - epoch.getFullYear()
    return 8.6625 * Math.pow((1 - 0.0833), yearsSince)
}
