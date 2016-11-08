# Serverless Access Counter

In the good old days, we had our Homepage with access counters.  It's back now with new technology.

Note: Access counters in 21th century is JSON object, not a concatinated image file.

## How to Deploy

This counter uses [Serverless Framework](https://github.com/serverless/serverless).  It supports AWS only now.

### from source code

```
$ git clone https://github.com/takahashim/sls-access-coutner.git
$ cd sls-access-counter
$ npm install
$ npm run deploy
```

### using sls

(TBD)


## How to Use

When you access API Gateway's URL, you can get current count like below:

```json
{"count": 42}
```

You can embed the number in your homepage.  Sample HTML is below:

```html
<html>
  <head>
    <title>counter sample</title>
  </head>
  <body>
    <h1>counter sample</h1>
    <p>counter: <span id="sls-counter"></span></p>
  </body>
  <script>
    var counter_url = "https://your-api-gateway-url";
    var request = new XMLHttpRequest();
    request.open('GET', counter_url, true);
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        document.getElementById('sls-counter').innerHTML = data.count;
      }
    };
    request.send();
  </script>
</html>
```

## TODO

* notify kiri-ban
