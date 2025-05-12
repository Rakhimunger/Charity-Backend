const PDFDocument = require("pdfkit");
const fs = require("fs");

function generateCertificate({
  name,
  amount,
  date = new Date().toLocaleDateString(),
}) {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  // Save to file (make sure Certificates folder exists)
  const fileName = `Certificates/${name}_Certificate.pdf`;
  const stream = fs.createWriteStream(fileName);
  doc.pipe(stream);

  // Title
  doc
    .fontSize(24)
    .fillColor("#003366")
    .text("CERTIFICATE OF APPRECIATION", { align: "center" })
    .moveDown();

  // Subtitle
  doc
    .fontSize(14)
    .fillColor("black")
    .text("This certificate is proudly presented to", { align: "center" })
    .moveDown(0.5);

  // Name
  doc
    .fontSize(20)
    .fillColor("#003366")
    .text(name.toUpperCase(), { align: "center", underline: true })
    .moveDown(1);

  // Amount
  doc
    .fontSize(14)
    .fillColor("black")
    .text(`For donating an amount of ₹${amount}`, { align: "center" })
    .moveDown(1);

  // Date
  doc.fontSize(12).text(`Date: ${date}`, { align: "right" });

  doc.end();

  console.log(" Certificate generated:", fileName);
}

module.exports = generateCertificate;
