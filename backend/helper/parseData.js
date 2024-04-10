// import PDFDocument from "pdfkit";
// import fs from "fs";
// import User from "../model/userModel.js";

// const extractedData = [
//   { itemName: "Laptop", amount: "$1,000", date: "2021-07-01" },
//   { itemName: "Phone", amount: "$500", date: "2021-07-02" },
//   { itemName: "Tablet", amount: "$600", date: "2021-07-03" },
// ];

// function parseToCSV(data) {
//   const csvRows = [];
//   // Header row
//   csvRows.push("Item Name,Amount,Date");

//   data.forEach((item) => {
//     csvRows.push(`${item.itemName},${item.amount},${item.date}`);
//   });

//   return csvRows.join("\n");
// }

// const csvData = parseToCSV(extractedData);
// console.log(csvData);

// function parseToMarkdown(data) {
//   let markdown = "| Item Name | Amount | Date |\n";
//   markdown += "|-----------|--------|------|\n";

//   data.forEach((item) => {
//     markdown += `| ${item.itemName} | ${item.amount} | ${item.date} |\n`;
//   });

//   return markdown;
// }

// const markdownData = parseToMarkdown(extractedData);
// console.log(markdownData);


// export function pdfConvertor(text) {
//   const doc = new PDFDocument();
//   console.log('Hello',text)
//   res.setHeader("Content-disposition", 'attachment; filename="your-data.pdf"');
//   res.setHeader("Content-type", "application/pdf");
//   doc.pipe(res)
//   doc.fontSize(25).text(text, 100, 80);

//   doc.end();


//   // let buffers = [];
//   // doc.on("data", buffers.push.bind(buffers));
//   // doc.on("end", () => {
//   //   let pdfData = Buffer.concat(buffers);
//   //   // user.file.name="sample PDF"
//   //   // user.file.PDFdata=pdfData

//   //   newPdf
//   //     .save()
//   //     .then(() => console.log("PDF saved to database"))
//   //     .catch((err) => console.error("Error saving PDF to database:", err));
//   // });
//   // const filePath = "Output.pdf";
//   // doc.pipe(fs.createWriteStream(filePath));

//   // doc.fontSize(25).text("Hello, this is text data converted to PDF!", 100, 100);
//   // doc.end();
// }
