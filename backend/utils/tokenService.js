const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const httpStatusCode = require("./httpStatusCode");

dotenv.config();

class TokenService {
  generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: "12h" });
  };

  authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(httpStatusCode.UNAUTHORIZED);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(httpStatusCode.INVALID_FORMAT);
      req.user = user;
      next();
    });
  };

  authAdminToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(httpStatusCode.UNAUTHORIZED);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(httpStatusCode.INVALID_FORMAT);
      if (!user.is_admin) return res.sendStatus(httpStatusCode.UNAUTHORIZED);
      req.user = user;
      next();
    });
  };
}

const tokenService = new TokenService();

module.exports = tokenService;
