<div align="center">
  <img src="https://app.apitraffic.io/assets/images/apitraffic-logo.svg" height="75"/>
</div>
<hr />
<div align="center">
    <a href="https://docs.treblle.com/en/integrations" target="_blank" style="color: #59BB7A;">Integrations</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://apitraffic.io" target="_blank" style="color: #59BB7A;">Website</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="http://docs.apitraffic.io/support/kb/categories" target="_blank" style="color: #59BB7A;">Docs</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="#how-apitraffic-works" target="_blank" style="color: #59BB7A;">Sample Application</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>    
    <a href="https://twitter.com/apitraffic" target="_blank" style="color: #59BB7A;">Twitter</a>
</div>
<hr />

ApiTraffic helps engineering teams optimize their API implemenations. 

## How ApiTraffic Works

Once you’ve integrated the ApiTraffic SDK into your application, each request/response will be sent to the ApiTraffic, processed, and will then appear within your desired bucket. 

From within your ApiTraffic account you will see real-time requests to your API, API analytics, the load size of the response, etc.

> Visit <a href="http://docs.apitraffic.io/support/kb/categories" target="_blank" style="color: #59BB7A;">our knowledgebase</a> for the complete documentation.

## Get Started

1. Sign in to [ApiTraffic](https://app.apitraffic.io).
2. [Setup the SDK](#install-the-SDK) for your application.

### Install the SDK

```sh
npm i @apitraffic/express --save
```

### Add Code To Application
```js
const express = require('express');
const apiTraffic = require('@apitraffic/express')
const app = express();

app.use(apiTraffic());
```

### Configuration

There are a two different methods for configuring the ApiTraffic SDK:
1. Parameters passed into the `apiTraffic()` function
2. Setting values as environment variables

These methods are not mutually exclusive, if for whatever reason you need to sent some as parameters and some as environment variables, it is ok they can be mixed.

> If the same variable is set in both places, the parameters that are passed in will always supercede the environment variables. 

#### Options

| Function Param  | Environment Variable | Required | Type | Details |
|---|---|:---:|---|---|
| token  | API_TRAFFIC_TOKEN  | Yes  |  String  |  Ingest token provided from your ApiTraffic account.  |
| bucket  | API_TRAFFIC_BUCKET  | Yes  | String   | The bucket the data should be sent to when ingested.  |
| interceptOutbound  | API_TRAFFIC_INTERCEPT_OUTBOUND  |   |  Boolean  |  If outbound requests should be intercepted. This requires node 14 or above. (Default: true)  |

## Sample Application

A working sample has been provided in this repository. [View the README](tree/master/examples/basic) for the sample application for details on how to run it.
