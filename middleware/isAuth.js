const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  //check token
  if (!token)
    return res.status(401).json({
      error: "Authorization denied. You have to be logged fot that access."
    });

  try {
    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // add user payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({
      error:
        "Authorization denied. You have to be logged in for that access"
    });
  }
}

module.exports = auth;
