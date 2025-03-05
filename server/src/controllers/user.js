const User = require("../models/user");

const getUsers = async (req, res) => {
  const data = await User.find()
  return res.json(data)
}

const registerNewUsers = async (req, res) => {
  try {
    const data = await User.create(req.body)
    console.log(data)
    return res.send("Created user")
  } catch (err) {
    console.log("Error")
  }

}

module.exports = {getUsers, registerNewUsers}