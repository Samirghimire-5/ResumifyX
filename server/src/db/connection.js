const mongoose = require('mongoose') 

const dbConnect = async () => {
  try {
    const response = await mongoose.connect("mongodb://127.0.0.1:27017/ResumifyX")
    if (response) console.log("Connection Successful")
  } catch (err) {
    console.log("Error", err)
  }
}

module.exports = dbConnect;