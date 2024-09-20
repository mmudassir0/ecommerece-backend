const USERSchema = require("../model/schema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body;
    if ((!name, !email, !password)) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const user = await USERSchema.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 12);

    const newUser = await USERSchema.create({
      name,
      email,
      password: hashPassword,
      isAdmin,
    });

    return res
      .status(201)
      .json({ message: "user created successfully", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password is required" });
    }

    const user = await USERSchema.findOne({
      email,
    });
    if (!user) {
      res.status(401).json({ message: "invalid credintials" });
    }
    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      res.status(401).json({ message: "invalid credintials" });
    }
    const userObj = user.toObject();
    delete userObj.password;

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1y",
    });

    return res
      .status(200)
      .json({ message: "login successfully", token, user: userObj });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, login };
