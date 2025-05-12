const PDFDocument = require("pdfkit");
const fs = require("fs");
function generateCertificate({
  name,
  amount,
  date = new Date().toLocaleDateString(),
}) {
  const doc = new PDFDocument({ size: "A4, margin: 50" });

  // Ensure output directory exists

  doc
    .fontSize(24)
    .fileColor("003366")
    .text("CERTIFICATE OF APPRECIATION", { align: "center" })
    .moveDown();

  doc
    .fontSize(14)
    .fillColor("black")
    .text("This certificate is proudly presented to", { align: "center" })
    .moveDown(0.5);

  doc
    .fontSize(20)
    .fillColor("#003366")
    .text(name.toUpperCase(), { align: "center", underline: true })
    .moveDown(0.5);

  doc.fontSize();
}
