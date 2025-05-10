// const puppeteer = require("puppeteer");
// const download = async (req, res) => {
//   const { fileName } = req.body;

//   const previewUrl = `http://localhost:3000/allTemp`;

//   try {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();

//     await page.goto(previewUrl, { waitUntil: "networkidle0" });

//     const pdfBuffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//     });

//     await browser.close();

//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": 'attachment; filename="resume.pdf"',
//     });

//     res.send(pdfBuffer);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to generate PDF", details: err });
//   }
// };




const puppeteer = require("puppeteer");
const download = async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Use the actual URL of your resume preview page
    await page.goto('http://localhost:3000/allTemp', {
      waitUntil: 'networkidle2',
      // timeout: 60000
    });

    // Add delay to ensure all content is loaded
await page.waitForFunction('window.resumeLoaded === true');

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: '20px',
        bottom: '20px',
        left: '20px',
        right: '20px'
      }
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="resume.pdf"',
      "Content-Length": pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ 
      error: "Failed to generate PDF", 
      details: err.message 
    });
  }
};


module.exports = {
  download,
};
