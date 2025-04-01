const axios = require("axios");

const generateWithAi = async (req, res) => {
  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) res.status(401).json({ message: "Api key not found" });

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const headers = {
    "Content-Type": "application/json",
    "x-goog-api-key": apiKey,
  };
  const data = {
    contents: [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ],
  };


  try {
    console.log("1st")
    const response = await axios.post(url, data, { headers });
    console.log(response)
    const generatedText = response.data.candidates[0].content.parts[0].text;
    res.status(200).json({ generatedText });
  }catch (error) {
    console.error("Axios Error:", error); // Log the full error
    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else if (error.request) {
      res.status(500).json({ error: "No response from Gemini API" });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

module.exports = { generateWithAi };
