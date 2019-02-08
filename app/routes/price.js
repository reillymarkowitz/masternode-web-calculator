var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

    token_id = 2200
    
    $.ajax({
        headers: {
            'X-CMC_PRO_API_KEY' : '2b1194db-b4a5-48d9-996b-c86e13c46b03'
        },
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=' + token_id,
        dataType: "json",
        type: "get",
        cache: false,
        success: function(output) {
            var price = output.data.quotes.USD.price;
            document.getElementById("token-price").innerHTML = price;
            res.send(price)
        }
    })

});

module.exports = router;