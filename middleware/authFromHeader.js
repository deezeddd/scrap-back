import {validateToken} from '../service/authJwt.js'

async function restrictToLoggedInUserOnly(req,res,next) {
    const authorizationHeaderValue = req.headers["authorization"]
    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer"))
        return next()
    const token = authorizationHeaderValue.split("Bearer ")[1];
    const user = validateToken(token);
    req.user = user 
    return next()
}

function restrictTo(roles =[]){
    return function(req,res,next){
        if(!req.user) return res.end("User Not Logged-in");
        if(!roles.includes(req.user.role))
        {
            return res.status(401).end("Unauthorized")
        }
        return next()
    }
}

export {restrictToLoggedInUserOnly, restrictTo}