const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if(!token) return res.status(401).json({msg: "You dont has login"});

  try {
    const secret = process.env.SECRET
    jwt.verify(token, secret);
    next();
  }catch(e) {
    res.status(400).json({error: "Token invalid"})
  }
}
module.exports = checkToken();