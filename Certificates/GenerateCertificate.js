 
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");

function generateCertificate({ name, amount, date = new Date().toLocaleDateString() }) {
  return new Promise((resolve, reject) => {
  console.log("generateCertificate inputs:", { name, amount, date }); 

  const dir = path.join(__dirname, "../Certificates");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const safeName = typeof name === "string" && name.trim() !== "" ? name.trim() : "Anonymous";
  const safeAmount = typeof amount === "number" && amount > 0 ? amount.toFixed(2) : "N/A";

  const fileName = path.join(dir, `${safeName.replace(/ /g, "_")}_Certificate.pdf`);
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  const stream = fs.createWriteStream(fileName);
  doc.pipe(stream);

  
  const logoPath = path.join(__dirname, "../assets/logo.png");
  if (fs.existsSync(logoPath)) {
    const pageWidth = doc.page.width;
    const logoWidth = 120;
    const x = (pageWidth - logoWidth) / 2;
    doc.image(logoPath, x, 40, { width: logoWidth });
  }

  doc.moveDown(6);

  
  const borderMargin = 20;
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  doc
    .lineWidth(2)
    .strokeColor("#1a237e")
    .rect(borderMargin, 120, pageWidth - borderMargin * 2, pageHeight - 200)
    .stroke();

  doc
    .font("Helvetica-Bold")
    .fontSize(32)
    .fillColor("#1a237e")
    .text("CERTIFICATE OF APPRECIATION", { align: "center" })
    .moveDown(2);

  doc
    .font("Helvetica")
    .fontSize(18)
    .fillColor("#000")
    .text("This certificate is proudly presented to", { align: "center" })
    .moveDown(1);

  doc
    .font("Helvetica-BoldOblique")
    .fontSize(28)
    .fillColor("#0d47a1")
    .text(safeName.toUpperCase(), { align: "center", underline: true })
    .moveDown(2);

  doc
    .font("Helvetica")
    .fontSize(18)
    .fillColor("#000")
    .text(`For generously donating ₹${safeAmount}`, { align: "center" })
    .moveDown(2);

  doc
    .font("Helvetica-Oblique")
    .fontSize(14)
    .fillColor("#444")
    .text(`Date: ${date}`, { align: "right" })
    .moveDown(4);

  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor("#1a237e")
    .text("Thank you for supporting Maa Siddheshwari Charity Trust!", { align: "center" });

  doc.end();

  stream.on("finish", () =>  {
console.log("✅ Certificate generated:", fileName);
      resolve(fileName);
  });

  stream.on("error", (err)   => {
    console.error("❌ Error writing certificate:", err);
      reject(err);
  });

});

}
module.exports = generateCertificate;
