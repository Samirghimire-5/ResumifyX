"use client";
import dynamic from "next/dynamic";

const PreviewDefaultTemplates = dynamic(
  () => import("./PreviewTemplates/defaultTemplate")
);
const PdfDefaultTemplate = dynamic(
  () => import("./pdfTemplates/defaultTemplate"),
  { ssr: false }
);

export const previewTemplates = {
  default: PreviewDefaultTemplates,
};

export const pdfTemplates = {
  default: PdfDefaultTemplate,
};

// Default export for backward compatibility
export default {
  ...previewTemplates,
  ...pdfTemplates,
};
