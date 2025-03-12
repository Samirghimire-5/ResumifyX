const dotenv = require('dotenv');
const mongoose = require('mongoose') 

const dbConnect = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGO_URI)
    if (response) console.log("Connection Successful")
  } catch (err) {
    console.log("Error", err)
  }
}

module.exports = dbConnect;