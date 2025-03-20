const jsonwebtoken = require('jsonwebtoken');

function auth(req,res,next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({message:'Access Denied'});
    }
    try {
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).send({message:'Invalid Token'});
    }
}

module.exports=auth;