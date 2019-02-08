function changeAsset() {
    if (dropdown.value) {
        var dict = {
            "GBX": 2200
        };
        var token_id = dict[dropdown.value];
        var CORS = 'https://crossorigin.me/'

        $.ajax({
            url: 'http://159.69.14.194/price',
            dataType: "json",
            type: "get",
            cache: false,
            success: function(output) {
                var price = output // .data.quotes.USD.price;
                document.getElementById("token-price").innerHTML = price;
            },
            error: function (request, status, error) {
                alert(error);
            }
        })
        
        /*
        $.ajax({
            headers: {
                'X-CMC_PRO_API_KEY' : '2b1194db-b4a5-48d9-996b-c86e13c46b03'
            },
            url: CORS + 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=' + token_id,
            dataType: "json",
            type: "get",
            cache: false,
            success: function(output) {
                var price = output.data.quotes.USD.price;
                document.getElementById("token-price").innerHTML = price;
            },
            error: function (request, status, error) {
                alert(error);
            }
        })

        // makeCorsRequest() */
    } else document.getElementById("token-price").innerHTML = "";
}
/*
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
  
      // Check if the XMLHttpRequest object has a "withCredentials" property.
      // "withCredentials" only exists on XMLHTTPRequest2 objects.
      xhr.open(method, url, true);
  
    } else if (typeof XDomainRequest != "undefined") {
  
      // Otherwise, check if XDomainRequest.
      // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
      xhr = new XDomainRequest();
      xhr.open(method, url);
  
    } else {
  
      // Otherwise, CORS is not supported by the browser.
      xhr = null;
  
    }
    return xhr;
  }

  function makeCorsRequest() {
    var url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=2200';
  
    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
      alert('CORS not supported');
      return;
    }
  
    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        var price = JSON.parse(text).data.quotes.USD.price;
        document.getElementById("token-price").innerHTML = price;
    };
  
    xhr.onerror = function() {
      console.log("Hey!")
      console.log(xhr)
    };

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(
        'X-CMC_PRO_API_KEY', '2b1194db-b4a5-48d9-996b-c86e13c46b03')

    xhr.send();
  }
  */