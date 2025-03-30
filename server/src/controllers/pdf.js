import React from "react";
const { renderToStream } = require("@react-pdf/renderer");
import DefaultTemplate from "../../../client/src/components/templates/defaultTemplate";

const pdfGenerator = async (req, res) => {
  try {
    const { resume, imageUrl } = req.body;
    console.log(req.body)

    const stream = await renderToStream(
      <DefaultTemplate resume={resume} imageUrl={imageUrl} />
    );

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");

    stream.pipe(res);
    console.log('chali ra xa')
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Error generating PDF");
  }
};

module.exports = { pdfGenerator };
