const express = require('express')
const app = express()
const PORT = 3000
const apiTraffic = require('..')
const axios = require('axios');

  
app.use(apiTraffic({interceptOutbound:true}))

app.get('/base', (req, res) => {
    res.send({ message: 'Hello!' });  
});

app.get('/users/:userId', (req, res) => {
  res.send({ message: 'Hello!' });  
});


app.get('/',  async (req, res) => {
    
    // Use Axios to make a general outbound API call to a third party service...
    try{
      
        // Await the response of the fetch call
      const response = await axios.get('https://www.boredapi.com/api/activity/')
      
      // once the call is complete, build the response...
      res.send({ message: 'Hello with an outbound intercepted call!' });  

    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for further handling if necessary
    }  

});

app.listen(PORT, () => {
  console.log(`Example APITraffic Express App listening on port ${PORT}`)
})