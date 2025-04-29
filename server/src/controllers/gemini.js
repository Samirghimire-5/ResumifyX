const axios = require("axios");

const generateWithAi = async (req, res) => {
  const { textPrompt, resumeData } = req.body;
  let prompt = textPrompt;
  if (!textPrompt && resumeData) {
    prompt = JSON.stringify(resumeData);
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
            text: `Write a 2-3 sentence resume summary, in the first person, emphasizing my skills and career goals: ${prompt}`,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers });
    const generatedText = response.data.candidates[0].content.parts[0].text;
    res.status(200).json({ generatedText });
  } catch (error) {
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

const geminiForEditor = (req, res) => {
  const { content, inputText } = req.body;
  const apiKey = process.env.GEMINI_API_KEY_FOR_EDITOR;

  if (!apiKey) res.status(401).json({ message: "Api key not found" });

  const prompt = `You are an expert resume editor. The following is the current HTML content of a resume:
    ${content}
    The user wants you to make the following changes to this resume: ${inputText}
    Please carefully review the current resume content and apply the user's requested changes. Ensure that the output is still valid HTML and maintains a professional resume format. Return only the modified HTML content`;

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

  axios
    .post(url, data, { headers })
    .then((response) => {
      const generatedResume = response.data.candidates[0].content.parts[0].text;
      res.status(200).json({ generatedResume });
    })
    .catch((error) => {
      // console.error("Axios Error:", error); // Log the full error
      if (error.response) {
        res.status(error.response.status).json({ error: error.response.data });
      } else if (error.request) {
        res.status(500).json({ error: "No response from Gemini API" });
      } else {
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    });
};

module.exports = { generateWithAi, geminiForEditor };
