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
    console.log("this is the guard");
    //get the request header token
    const token = request.headers.api_user_token;
    if(!token) return response.status(401).json({error: true, message: "unauthorized route"});

    const tokenValidation = await jwt.verify(token, process.env.API_PUBLIC_KEY);

    if(tokenValidation.error) return response.status(403).send({error: true, message: "token mismatch"})

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