/**
 * 
 * Guard - Middlewares to protect routes agains unauthorized use
 * 
 */


const jwt = require('jsonwebtoken');
/**
 * 
 * logged: routes for logged users only
 * 
*/
async function loggedOnly(request, response, nextMiddleware) {
    //get the request header token
    const token = request.headers.api_user_key;
    if(!token) return response.status(401).json({error: true, message: "unauthorized route"});

    try{
        const tokenValidation = await jwt.verify(token, process.env.API_PUBLIC_KEY);
    } catch(error) {
        return response.status(403).send({error: true, message: error.message})
    }


    nextMiddleware();
}



/**
 * 
 * celebribrityOnly: Routes for celebrities only
 * 
*/
async function celebrityOnly(request, response, nextMiddleware) {

    nextMiddleware();
}


/**
 * 
 * adminOnly: Routes for celebrities only 
 * 
 */
async function adminOnly(request, response, nextMiddleware) {

    nextMiddleware();
}
module.exports.celebrityOnly = celebrityOnly;
module.exports.loggedOnly = loggedOnly;