const jwt = require("jsonwebtoken");
const USERSchema = require("./app/model/schema");

const protectedRoute = async (req, res, next) => {
  let token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided, not authorized" });
  }
  token = token.split(" ")[1];
  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

    req.user = await USERSchema.findById(verifyToken.userId).select(
      "-password"
    );

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "invalid token", error: error.message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "Access denied: Admin Only" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { protectedRoute, isAdmin };
