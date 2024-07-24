<div align="center">
  <img src="https://app.apitraffic.io/assets/images/apitraffic-logo.svg" height="75"/>
</div>
<br/>

# Sample Application (Express)

## Run Application

### Set Environment Variables

Set the following environment variables prior to running the sample application. 

Grab your token from within your account. This will need to be an ingest token.

`export API_TRAFFIC_TOKEN=....`

Grab the bucket id from your account. This will be the bucket where there the request data should be sent.

`export API_TRAFFIC_BUCKET=....`

### Install the SDK

```sh
npm install
```

### Start Application
```js
npm start
```

## Run Sample API Requests
After the application is running you can make a few sample API requests by navigating to the following URLs in your browser.

### Sample Request without outbound call
[http://localhost:3000](http://localhost:3000)
### Sample request with outbound call
[http://localhost:3000/outbound](http://localhost:3000/outbound)

## Review Request Data
After making these requests, return to your All Traffic Stream in the target bucket and you will see requests starting to appear. 