const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

function generateCertificate({
  name,
  amount,
  date = new Date().toLocaleDateString(),
}) {
  
  const dir = path.join(__dirname, "../Certificates");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const fileName = path.join(
    dir,
    `${name.replace(/ /g, "_")}_Certificate.pdf`
  );

  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
  });

  const stream = fs.createWriteStream(fileName);
  doc.pipe(stream);


  doc
    .fontSize(24)
    .fillColor("#003366")
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
    .moveDown(1);

  
  doc
    .fontSize(14)
    .fillColor("black")
    .text(`For donating an amount of ₹${amount}`, { align: "center" })
    .moveDown(1);
  doc.fontSize(12).text(`Date: ${date}`, { align: "right" });

  doc.end();

  console.log("✅ Certificate generated:", fileName);
}

module.exports = generateCertificate;
