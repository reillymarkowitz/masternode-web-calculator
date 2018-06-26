function changeAsset() {
    if (dropdown.value) {
        var dict = {
            "GBX": 2200
        };
        var token_id = dict[dropdown.value];
        $.ajax({
            url: "https://api.coinmarketcap.com/v2/ticker/" + token_id + "/",
            dataType: "json",
            type: "get",
            cache: false,
            success: function(output) {
                var price = output.data.quotes.USD.price;
                document.getElementById("token-price").innerHTML = price;
            }
        })
    } else document.getElementById("token-price").innerHTML = "";
}