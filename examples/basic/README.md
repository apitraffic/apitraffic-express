<div align="center">
  <img src="https://app.apitraffic.io/assets/images/apitraffic-logo.svg" height="75"/>
</div>
<br/>

# Sample Application (Express)

Ensure you sign up for an ApiTraffic account prior to running this application. You will need a valid token and bucket ID in order to run the sample application. If you do not already have an account, [create a new account](https://www.apitraffic.io/pricing) to start a free trial. 

## Run Application

### Set Environment Variables

Set the following environment variables prior to running the sample application. 

Grab your token from within your account. This will need to be an ingest token.

`export API_TRAFFIC_TOKEN=....`

Grab the bucket id from your account. This will be the bucket where there the request data should be sent.

`export API_TRAFFIC_BUCKET=....`

### Install & Start Application

```sh
npm install
npm start
```

## Run Sample API Requests
After the application is running you can make a few sample API requests by navigating to the following URLs in your browser.

### Sample Request without outbound call
[http://localhost:4000](http://localhost:4000)
### Sample request with outbound call
[http://localhost:4000/outbound](http://localhost:4000/outbound)

## Review Request Data
After making these requests, return to your All Traffic Stream in the target bucket and you will see requests starting to appear. 


app.use(apiTraffic.middleware({
  token: "",
  bucket: ""
}));