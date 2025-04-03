const axios = require("axios");

const generateWithAi = async (req, res) => {
  const { textPrompt, resumeData  } = req.body;
  let prompt = textPrompt;
  if (!textPrompt && resumeData) {
    prompt = JSON.stringify(resumeData)
  }
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
            text: `Write a 2-3 sentence resume summary, in the first person, emphasizing my MERN stack skills and career goals: ${prompt}`,
          },
        ],
      },
    ],
  };


  try {
    const response = await axios.post(url, data, { headers });
    const generatedText = response.data.candidates[0].content.parts[0].text;
    res.status(200).json({ generatedText });
  }catch (error) {
    // console.error("Axios Error:", error); // Log the full error
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
