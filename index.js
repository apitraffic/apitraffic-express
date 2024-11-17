
const utilities = require('@apitraffic/utilities');
const package = require('./package.json');


module.exports.getContext = function(){
    return utilities.context.getStore();
  }
  
module.exports.getRequestManager = function(){
    return utilities.context.getStore().RequestManager;
}

module.exports.tag = function(key, value){
    utilities.context.getStore().RequestManager.tag(key, value);
  }
  
module.exports.trace = function(content){
    utilities.context.getStore().RequestManager.trace(content);
}


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
    utilities.setup(options, utilities.context);
       
    return (req, res, next) => {
        
        // make sure the request context is setup with the RequestManager so it can be uses anywhere in the request...
        utilities.context.enterWith({ 
            RequestManager: new utilities.RequestManager({package : {name: package.name, version : package.version}})
        });

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
                    version: utilities.context.getStore().RequestManager.package.version,
                    sdk: utilities.context.getStore().RequestManager.package.name                   
                };
                
                let body = null;

                if(req.method.toUpperCase() !== 'GET' && req.method.toUpperCase() !== 'OPTIONS'){
                    body = JSON.stringify(req.body);
                }


                // TODO: Account for other body types other than JSON...
                const apiTrafficPayload = {
                    contextSid : utilities.context.getStore().RequestManager.contextSid,
                    direction : "in",
                    request: {
                        received: utilities.context.getStore().RequestManager.requestReceivedAt,
                        ip : req.ip,
                        url : `${req.protocol}://${req.headers['host']}${req.originalUrl}`,
                        method: req.method.toUpperCase(),
                        headers : req.headers,
                        body : body
                    },
                    response : {
                        headers : res.getHeaders(), 
                        status : res.statusCode,
                        responseTime : utilities.getDuration(utilities.context.getStore().RequestManager.requestStartTime),
                        body : res.apiTrafficBody
                    },
                    tags : utilities.context.getStore().RequestManager.getTagArray(),
                    traces : utilities.context.getStore().RequestManager.getTraces()
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
module.exports.middleware = apiTraffic;
