const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  const data = await User.find();
  return res.json(data);
};

const dashboard = async (req, res) => {
  try {
    const user = await User.findOne({_id: req.user.id}).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({message: 'welcome to dashboard', user})
  }catch (error) {
    res.status(500).json({error: "server error"})
  }
}

const registerNewUsers = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    // check if email already exists
    const user = await User.findOne({ email: req.body.email });
    // if exists return error
    if (user) return res.status(409).json({ message: "Email already exists" });

    // hashing confirmPassword
    const saltRounds = 10;
    const hashedConfirmPassword = await bcrypt.hash(
      confirmPassword,
      saltRounds
    );

    // checking if the hashed confirmPassword matches the plainText password
    if (await bcrypt.compare(password, hashedConfirmPassword)) {
      // now the passwords matches and we are hashing the actual password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const data = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      console.log(data);
      return res.status(201).json({ message: "User registered successfully" });
    } else {
      return res.status(400).json({ message: "Password do not match" });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if email exists in db or not
    const user = await User.findOne({ email: email }); // finding the user in db using email. In {email: email} first email is to check if a email property holds any value that matches the second email 
    // if email doesnot exists return error
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    // comparing password with hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Json Web Token(JWT) auth here
      const token = jwt.sign({id: user._id}, process.env.SECRET_KEY, {expiresIn: '1h'})

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict", 
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({ message: "login successfull" });
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    console.log("Login failed", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const logout =  (req, res) => {
  // const body = await req.body
  // console.log(body)
  res.clearCookie("token");
   res.status(200).json({message: "logout successfully"})
}

module.exports = { getUsers, registerNewUsers, loginUser, dashboard, logout };