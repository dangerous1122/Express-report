import File from "../model/fileModel.js";
import User from "../model/userModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { readFileSync } from "fs";
import pdf from "html-pdf";
import logger from "../helper/winston.js";
import puppeteer from  'puppeteer'


async function createPDF(htmlContent, options) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // Adding sandbox flags
});

  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const buffer = await page.pdf(options);
  await browser.close();
  return buffer;
}


export const getReceipts = async (req, res) => {
  try {
    const user = req.user;
    // Assuming the "files" field in the User model is an array of references to the File model
    const userWithFiles = await User.findById(user._id)
      .populate("files")
      .exec();

    if (!userWithFiles) {
      return res.status(404).send("User not found");
    }

    // Assuming the "files" field contains the populated File documents
    const filesArray = userWithFiles.files.map((file) => {
      console.log("Hello");
      return {
        fileId: file._id,
        fileName: file.fileName,
        fileData: file.PDFData,
      };
    });

    res.status(200).json(filesArray);
  } catch (error) {
    console.error(error); // It's helpful to log the error for debugging
    res.status(500).send("Error fetching receipts");
  }
};

export const getReceiptsById = async (req, res) => {
  try {
    const { id } = req.params;
    const fileDoc = await File.findById(id);

    if (!fileDoc) {
      return res.status(404).send("File not found.");
    }

    // Assuming fileDoc.PDFdata is the Buffer containing the PDF file
    const pdfBuffer = fileDoc.PDFdata;

    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${fileDoc.name}"`,
    });

    res.end(pdfBuffer);
  } catch (error) {
    console.error("Error sending file:", error);
    res.status(500).send("Error retrieving file.");
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    console.log(req.params);
    const file = await File.findByIdAndDelete(id);
    // No need to call `save()` after deletion
    await User.updateMany({ files: id }, { $pull: { files: id } });
    if (!file) {
      return res.status(404).send("File not found");
    }

    res.send("File deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting the file");
  }
};

export const makePdf = async(req, res) => {
  try {
    logger.info('Request Body: %o', req.body);
        logger.info('Request Params Data: %o', req.params.data);
    const data1 = JSON.parse(req.params.data);
    const data = req.body;
    const titles = [];
    const categories = [];
    const dates = [];
    const amounts = [];

    data.forEach((entry) => {
      const lines = entry.split("\n");

      // Process each line
      lines.forEach((line) => {
        const lowerCaseLine = line.toLowerCase(); // Convert line to lowercase to handle case sensitivity
        if (lowerCaseLine.startsWith("title:")) {
          titles.push(line.replace("Title: ", ""));
        } else if (lowerCaseLine.startsWith("category of expense:")) {
          categories.push(line.split(": ")[1]);
        } else if (lowerCaseLine.startsWith("date of expense:")) {
          dates.push(line.split(": ")[1]);
        } else if (lowerCaseLine.startsWith("total amount of expense:")) {
          // Extract amount and remove currency symbols if needed
          const amount = line
            .split(": ")[1]
            .replace(/[\$CAD ]/g, "")
            .trim();
          amounts.push(amount);
        }
      });
    });

    console.log(titles, categories, dates, amounts);
    const expenses = titles.map((title, index) => ({
      date: dates[index],
      title: title,
      category: categories[index],
      amount: `$${amounts[index]}`,
    }));

    const totalAmount = expenses.reduce((sum, item) => {
      return sum + parseFloat(item.amount.replace("$", ""));
    }, 0);
    expenses.sort((a, b) => new Date(a.date) - new Date(b.date));

    console.log(expenses);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const htmlFilePath = path.join(__dirname, "./template.html");
    const cssFilePath = path.join(__dirname, "./style.css");

    const datte = new Date().toJSON().slice(0, 10);

    const htmlContent = readFileSync(htmlFilePath, "utf8");
    const cssContent = readFileSync(cssFilePath, "utf8");

    const rows = expenses
      .map(
        (item, index) => `
      <tr>
        <td class="border-b py-3 pl-3">${index + 1}.</td>
        <td class="border-b py-3 pl-2 text-left">${item.date}</td>
        <td class="border-b py-3 text-center pl-2">${item.title}</td>
        <td class="border-b py-3 pl-2 text-center">${item.category}</td>
        <td class="border-b py-3 pl-2 text-right">${item.amount}</td>
      </tr>
    `
      )
      .join(""); // Join the rows to make a single string

    let fullHtmlContent = htmlContent
      .replace(/{{datte}}/g, datte)
      .replace(/{{senderName}}/g, data1.senderName)
      .replace(/{{senderEmail}}/g, data1.senderEmail)
      .replace(/{{senderPhone}}/g, data1.senderPhone)
      .replace(/{{senderCompany}}/g, data1.senderCompany)
      .replace(/{{recName}}/g, data1.recName)
      .replace(/{{recEmail}}/g, data1.recEmail)
      .replace(/{{recPhone}}/g, data1.recPhone)
      .replace(/{{recCompany}}/g, data1.recCompany)
      .replace(/{{rows}}/g, rows)
      //   .replace(/{{Category}}/g, category)
      .replace(/{{amount}}/g, totalAmount);
    //   .replace(/{{date}}/g, date);

    fullHtmlContent = `
      <style>${cssContent}</style>
      ${fullHtmlContent}
      `;
    // Options for html-pdf
    const options = {
      format: "A4",
      border: {
        top: "0.5in",
        right: "0.5in",
        bottom: "0.5in",
        left: "0.5in",
      },
    };

    const buffer = await createPDF(fullHtmlContent, options);

    const newFile = new File({
      name: "expenseReport.pdf",
      PDFdata: buffer,
    });
    
    const f = await newFile.save();
    req.user.files.push(newFile._id);
    await req.user.save();

    res.type("pdf");
    res.header("Access-Control-Expose-Headers", "X-File-ID");
    res.header("Content-Disposition", 'attachment; filename="download.pdf"');
    res.header("X-File-ID", newFile._id.toString());
    res.send(buffer);

    if (req.user.subscription && req.user.subscription.hass === true) {
      if (req.user.subscription.gereratedReports === 1) {
        req.user.subscription.hass = false;
      }
      req.user.subscription.gereratedReports -= 1;
    } else if (req.user.freeTrial) {
      req.user.freeTrial = false;
    }
    await req.user.save();

  } catch (err) {
    console.log('error',err)
    logger.error('Error : %o', err);
    res.status(500).send(err)
  }};
