
const utilities = require('@apitraffic/utilities');
const package = require('./package.json');

/**
 * ApiTraffic Express middleware function.
 * @param {{interceptOutbound?:boolean}} options - Configuration options.
 * @returns {Function} - apitraffic-express middleware.
 */
function apiTraffic(options = {
    interceptOutbound : true,
    host : "",
    token : "",
    bucket : "",
    debug : false
}){

    // Set things up...
    utilities.setup(options);
       
    return (req, res, next) => {
        
        const requestReceivedAt = new Date().toISOString();

        // Set the request start time so we can figure out the total request duration...
        const requestStartTime = process.hrtime();

        const originalSend = res.send
        res.send = function sendOverWrite(body) {
          this.apiTrafficBody = body
          originalSend.call(this, body)
        }

        res.on('finish', function onceFinish() {
            
            // this is what we will do if the host is to be skipped...
            //return next();

            try{
                const apiTrafficOptions = {
                    version: package.version,
                    sdk: package.name                    
                };
                
                let body = null;

                if(req.method.toUpperCase() !== 'GET' && req.method.toUpperCase() !== 'OPTIONS'){
                    body = JSON.stringify(req.body);
                }


                // TODO: Account for other body types other than JSON...
                const apiTrafficPayload = {
                    request: {
                        received: requestReceivedAt,
                        ip : req.ip,
                        url : `${req.protocol}://${req.headers['host']}${req.originalUrl}`,
                        method: req.method,
                        headers : req.headers,
                        body : body
                    },
                    response : {
                        headers : res.getHeaders(), 
                        status : res.statusCode,
                        responseTime : utilities.getDuration(requestStartTime),
                        size: res.get('content-length'),
                        body : res.apiTrafficBody
                    }
                };

                // call the function to log all now...
                // we will not await the response b/c we want to fire and forget...
                utilities.sendToApiTraffic(apiTrafficOptions, apiTrafficPayload);
            }catch(e){
                console.log(e);
            }
        });
        next();
  };

}
module.exports = apiTraffic;