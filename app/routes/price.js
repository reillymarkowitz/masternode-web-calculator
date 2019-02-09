var express = require('express');
var router = express.Router();
var request = require('request')

/* GET users listing. */
router.get('/', function(req, res, next) {

    const options = {
        url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=2200',
        headers: {
          'User-Agent': 'request',
          'X-CMC_PRO_API_KEY' : '2b1194db-b4a5-48d9-996b-c86e13c46b03'
        }
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const info = JSON.parse(body)
            data = info['data']
            num = data['2200']
            quote = num['quote']
            usd = quote['usd']
            price = usd['price']
            res.send(price)
          }
    });

});

module.exports = router;