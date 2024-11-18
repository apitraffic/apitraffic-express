<div align="center">
  <img src="https://app.apitraffic.io/assets/images/apitraffic-logo.svg" height="75"/>
</div>
<hr />
<div align="center">
    <a href="https://apitraffic.io" target="_blank" style="color: #59BB7A;">Website</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://docs.apitraffic.io" target="_blank" style="color: #59BB7A;">Docs</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
    <a href="https://github.com/apitraffic/apitraffic-express/tree/master/examples/basic" target="_blank" style="color: #59BB7A;">Sample Application</a>
    <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>    
    <a href="https://twitter.com/apitraffic" target="_blank" style="color: #59BB7A;">Twitter</a>
</div>
<hr />

ApiTraffic helps engineering teams save development time so they can ship features faster. 

## Features

* <a href="https://www.apitraffic.io/observability-and-logging" target="_blank" style="color: #59BB7A;">API Monitoring & Observablity</a>
* <a href="https://www.apitraffic.io/workflow-engine" target="_blank" style="color: #59BB7A;">API Integrations (Workflow Engine)</a>
* <a href="https://www.apitraffic.io/integrations" target="_blank" style="color: #59BB7A;">Supported Integrations</a>

## How ApiTraffic Works

Once you’ve integrated the ApiTraffic SDK into your application, each request/response will be sent to the ApiTraffic, processed, and will then appear within your desired bucket. 

From within your ApiTraffic account you will see real-time requests to your API, API analytics, the load size of the response, etc.

> Visit <a href="https://docs.apitraffic.io" target="_blank" style="color: #59BB7A;">our knowledgebase</a> for the complete documentation.

## Security

### Redacting Data
Data can be redacted either before it leaves your server or once it arrives to ApiTraffic for processing. Data redaction settings do not require any code changes as all configuration is done within your ApiTraffic account and pushed down to each connected server.

<a href="https://docs.apitraffic.io/en/articles/10146595-redactions" target="_blank" style="color: #59BB7A;">Learn more</a> about redacting data. 

### Request Exclusions
Exclusions can be configured in cases where certain endpoints should not be logged. Like data redactions (above), no integration specific changes are required to exclude request that match a certain criteria. 

<a href="https://docs.apitraffic.io/en/articles/10146597-exclusions" target="_blank" style="color: #59BB7A;">Learn more</a> about excluding requests. 


## Get Started

1. Sign in to <a href="https://app.apitraffic.io" target="_blank" style="color: #59BB7A;">ApiTraffic</a>.
2. <a href="#install-the-SDK" target="_blank" style="color: #59BB7A;">Setup the SDK</a> for your application.

### Install the SDK

```sh
npm i @apitraffic/express --save
```

> **IMPORTANT**: Node 18+ required.

### Add Code To Application
```js
const express = require('express');
const apiTraffic = require('@apitraffic/express');
const app = express();

app.use(apiTraffic.middleware());
```

### Configuration

There are a two different methods for configuring the ApiTraffic SDK:
1. Parameters passed into the `apiTraffic.middleware()` function
2. Setting values as environment variables

These methods are not mutually exclusive, if for whatever reason you need to sent some as parameters and some as environment variables, it is ok they can be mixed.

> If the same variable is set in both places, the parameters that are passed in will always supercede the environment variables. 

#### Options

| Function Param  | Environment Variable | Required | Type | Details |
|---|---|:---:|---|---|
| token  | API_TRAFFIC_TOKEN  | Yes  |  String  |  Ingest token provided from your ApiTraffic account.  |
| bucket  | API_TRAFFIC_BUCKET  | Yes  | String   | The bucket the data should be sent to when ingested.  |
| interceptOutbound  | API_TRAFFIC_INTERCEPT_OUTBOUND  | No  |  Boolean  |  If outbound requests should be intercepted. (Default: true)  |
| debug  | API_TRAFFIC_DEBUG  | No  |  String  |  Flag that toggles if the debug output should be added to the console. (Default: true)  |

## Tagging & Tracing
Additional context can be added to requests via the `tag()` and `trace()` functions provided by the ApiTraffic SDK.

<img src="https://cdn.prod.website-files.com/67308d108b18f8780bb38832/6732606f1b4f9d6c39888769_Tagging%20and%20Tracing.png" width="500"/>

### Tagging
Tagging allows requests to be searchable by any number of tags that have been added to requests. For example, requests can be tagged by account or user ids which would then allow your team to view all API reqeusts for a specific account/person. There is no limit to the number of tags that can be added.

```
// include this in any file that needs tagging capabilities.
const apiTraffic = require('@apitraffic/express');

// use the tag function.
apiTraffic.tag("key", "value");
```

### Traces 
It's console.log for production! Traces can easily be added to identify a specific code path or if data needs to be surfaced to help troubleshooting efforts.

```
// include this in any file that needs tracing capabilities.
const apiTraffic = require('@apitraffic/express');

// use the trace function.
apiTraffic.trace("Whatever value that needs to be traced.");
```

## Sample Application

A working sample has been provided in this repository. [View the README](https://github.com/apitraffic/apitraffic-express/tree/master/examples/basic) for the sample application for details on how to run it.
