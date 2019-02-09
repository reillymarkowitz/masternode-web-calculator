function changeAsset() {
    if (dropdown.value) {
        var dict = {
            "GBX": 2200
        };
        var token_id = dict[dropdown.value];

        $.ajax({
            url: 'http://159.69.14.194/price',
            dataType: "json",
            type: "get",
            cache: false,
            success: function(output) {
                document.getElementById("token-price").innerHTML = output;
            }
        })
        
    } else document.getElementById("token-price").innerHTML = "";
}