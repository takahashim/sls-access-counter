# Serverless Access Counter

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)

In the good old days, we had our Homepage with access counters.  Now it's back with new technology.

Note: Access counter in the 21st century is JSON object, not a concatinated image file.

## How to Deploy

This counter uses [Serverless Framework](https://github.com/serverless/serverless).  It supports AWS only now.

### using serverless framework (for user)

```
$ npm install -g serverless
$ serverless install -u https://github.com/takahashim/sls-access-coutner
$ cd sls-access-coutner
$ serverless deploy
```

### using git (for developer)

```
$ git clone https://github.com/takahashim/sls-access-coutner.git
$ cd sls-access-counter
$ npm install
$ npm run deploy
```

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
