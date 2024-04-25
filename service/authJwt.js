import jwt from "jsonwebtoken";
const secret = 'PAPASCRAP!@#'

function setTokenForUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, secret, { expiresIn: '5h' }) //Create JWT Token with payload given as follows
}

function validateToken(token) {
    if (!token)
        return null;
    try {
        return jwt.verify(token, secret) //Token Verification
    } catch (error) {
        return null
    }
}

export { setTokenForUser, validateToken }