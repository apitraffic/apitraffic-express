# apitraffic-express

```
npm install @apitraffic/express
```

```
const apiTraffic = require('@apitraffic/express');

// register plugin...
app.use(apiTraffic({
    interceptOutbound : true,
    host : "",
    token : "",
    bucket : ""
}));
```