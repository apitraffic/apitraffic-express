/*
  ***** IMPORTANT *****
  Prior to running this demo, ensure you have added your token and bucket either to the parameters below 
  or set as environment variables per the documenation at https://github.com/apitraffic/apitraffic-express.
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const apiTraffic = require('@apitraffic/express');
const axios = require('axios');
  
app.use(bodyParser.json())

app.use(apiTraffic.middleware());

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!' });  
});

app.get('/outbound',  async (req, res) => {
    // Use Axios to make a general outbound API call to a third party service...
    try{
      
      // Await the response of the fetch call
      await axios.get('https://thetestrequest.com/authors');
      
       // tag the request. You can add as many tags to a request as required.
       apiTraffic.getRequestManager().tag("Account Id", "12345");

       // add some tracing information to the request. You can add as many traces as required, think of it like console log.
       apiTraffic.getRequestManager().trace("This is a sample trace from the sample ApiTraffic app.");


      // once the call is complete, build the response...
      res.send({ message: 'Hello World, with an outbound intercepted call!' });  

    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching data:', error.message);
        res.send({ message: error.message });  
        
    }  

});

app.listen(PORT, () => {
  console.log(`Example APITraffic Express App listening on port ${PORT}`)
})