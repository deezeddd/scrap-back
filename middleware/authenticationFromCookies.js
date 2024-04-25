import { validateToken } from "../service/authJwt.js";

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName];
        if(!tokenCookieValue){
            return next();
        }
        try{
            const userPayload = validateToken(tokenCookieValue)
            req.user = userPayload
        } catch(err){}

        return next()
    }
}

function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user) return res.end("User Not Logged-in");
        if(!roles.inclues(req.user.role))
        {
            return res.end("Unauthorized: Not Admin")
        }
        return next()
    }
}

export { checkForAuthenticationCookie, restrictTo }