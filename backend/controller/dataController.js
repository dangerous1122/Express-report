import User from "../model/userModel.js";
import { readFileSync, writeFileSync, statSync, writeFile } from "fs";
import { unlink, existsSync, constants } from "fs";
import { dirname } from "path";
import fs,{access} from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import File from "../model/fileModel.js";
import axios from "axios";
import sgMail from "@sendgrid/mail";
console.log(process.env.SG_KEY);
import OpenAI from "openai";
import { GoogleAuth } from "google-auth-library";
import { PDFDocument, degrees } from "pdf-lib";
import { promisify } from "util";
import archiver from "archiver";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const addSenderData = async (req, res) => {
  console.log("b,", req.body);
  const userId = req.user._id;
  console.log("id: ", userId);
  const list = req.body.add;
  const { name, email, contact, address } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (list === "sender") {
      user.senderData.push({ name, email, contact, address });
    } else if (list === "receiver")
      user.receiverData.push({ name, email, contact, address });

    await user.save();

    res.status(201).json({ message: "Sender added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding sender data", error: error.message });
  }
};

export const updateSenderData = async (req, res) => {
  const { name, email, contact, address, add } = req.body;
  const senderId = req.params;
  console.log(senderId.id, name, email, contact, address);

  try {
    let subDoc = "";
    const user = req.user;
    if (add === "sender") {
      subDoc = user.senderData.id(senderId.id); // Find the subdocument by its _id

      if (!subDoc) {
        return res.status(404).json({ message: "Sender data not found" });
      }

      // Update the found subdocument
      Object.assign(subDoc, { name, email, contact, address });
    } else if (add === "receiver") {
      subDoc = user.receiverData.id(senderId.id); // Find the subdocument by its _id

      if (!subDoc) {
        return res.status(404).json({ message: "Receiver data not found" });
      }

      Object.assign(subDoc, { name, email, contact, address });
    }

    // Optional: Mark the array as modified if direct modification doesn't trigger a save
    // user.markModified("senderData");

    await user.save();
    res
      .status(200)
      .json({ message: "Sender data updated successfully", data: subDoc });
  } catch (error) {
    console.error("Error updating sender data:", error); // Logging the error can help in debugging
    res
      .status(500)
      .json({ message: "Error updating sender data", error: error.message });
  }
};

export const deleteSenderData = async (req, res) => {
  const id = req.params.id;
  try {
    const filteredSenderData = req.user.senderData.filter(
      (subdoc) => subdoc._id.toString() !== id
    );
    const filteredRecData = req.user.receiverData.filter(
      (subdoc) => subdoc._id.toString() !== id
    );
    req.user.senderData = filteredSenderData;
    req.user.receiverData = filteredRecData;
    await req.user.save();

    res.status(200).json({ message: "Sender data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting sender data", error: error.message });
  }
};

export const addReceiverData = async (req, res) => {
  const userId = req.user._id;
  console.log("id: ", userId);
  const { name, email, contact, address } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.senderData.push({ name, email, contact, address });

    await user.save();

    res.status(201).json({ message: "Sender added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding sender data", error: error.message });
  }
};

export const getSenderData = async (req, res) => {
  const add = req.params.add;
  console.log("ad", add);
  let data;
  try {
    if (add === "sender") {
      data = req.user.senderData;
      console.log("sending");
    } else if (add === "receiver") {
      data = req.user.receiverData;
    }
    res.status(200).json({ data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving sender data", error: error.message });
  }
};

export const updateReceiverData = async (req, res) => {
  const user = req.user;
  const { name, email, contact, address } = req.body;
  const { id } = req.params;

  try {
    Object.assign(req.user.receiverData[id], {
      name,
      email,
      contact,
      address,
    });
    user.markModified("receiverData");
    await user.save();

    res.status(200).json({ message: "Receiver data updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating receiver data", error: error.message });
  }
};

export const deleteReceiverData = async (req, res) => {
  const userId = req.user;

  try {
    req.user.receiverData.splice(index, 1);
    await req.user.save();
    res.status(200).json({ message: "Receiver data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting receiver data", error: error.message });
  }
};

export const getReceiverData = async (req, res) => {
  try {
    const receiverData = req.user.receiverData;
    res.status(200).json(receiverData);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving receiver data",
      error: error.message,
    });
  }
};

const projectId = process.env.PROJECT_ID;
const location = "us"; // e.g., 'us'
const processorId = process.env.PROCESSOR_ID;
const openaiApiKey = process.env.OPENAI_KEY;

const auth = new GoogleAuth({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: "https://www.googleapis.com/auth/cloud-platform",
});

let sender = "";
let fileCount = 0;
let files = [];
let isZip=false;
export const fileUpload = async (req, res) => {
  try {
    // console.log(projectId, location, processorId);
    console.log(req.file);
    const data = JSON.parse(req.body.data);

    console.log("dataaa: ", data.fileCount);
    console.log("file count: ", fileCount);

    if (
      req.user.freeTrial ||
      (req.user.subscription.hass && req.user.subscription.gereratedReports > 0)
    ) {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }
      fileCount++;
      files.push(req.file);
      const client = await auth.getClient();
      const url = `https://us-documentai.googleapis.com/v1/projects/681235566970/locations/us/processors/${process.env.PROCESSOR_ID}:process`;
      const fileBuffer = await fs.readFile(req.file.path);
      const encodedImage = fileBuffer.toString("base64");

      const respons = await client.request({
        url,
        method: "POST",
        data: {
          rawDocument: {
            content: encodedImage,
            mimeType: req.file.mimetype,
          },
        },
      });

      //gpt implementation
      const prompt = respons.data.document.text;
      // console.log("prompt..", prompt);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4-turbo",
          messages: [
            {
              role: "user",
              content:
                prompt +
                " give one 'title',one 'category of expense', only one 'date of expense' and 'total amount of expense' keep format as follows: Title: [title]  \n category of expense: [category] \n date of expense: January 1,2000 \n total amount of expense : [amount] \n also you should ALWAYS get the total amount ignore other amounts",
            },
          ],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${openaiApiKey}`, // Access the API key from environment variables
            "Content-Type": "application/json",
          },
        }
      );
      sender = data.senderEmail;
      console.log("gpt response, :", response.data.choices[0].message.content);

      res.status(200).json(response.data.choices[0].message.content);

      if (fileCount === data.fileCount) {
        console.log("All files received, processing...");
        const doc = await PDFDocument.create();

        for (const file of files) {
          if (file.mimetype === "application/pdf") {
            // console.log("in image")

            const existingPdfBytes = readFileSync(file.path);
            const existingPdfDoc = await PDFDocument.load(existingPdfBytes);
            const copiedPages = await doc.copyPages(
              existingPdfDoc,
              existingPdfDoc.getPageIndices()
            );
            copiedPages.forEach((page) => doc.addPage(page));
          }
          // JPEGs:
          else if (file.mimetype === "image/jpeg") {
            // console.log("in image")
            const page = doc.addPage();
            const imageBytes = readFileSync(file.path);
            const image = await doc.embedJpg(imageBytes);
            page.drawImage(image, {
              x: page.getWidth() / 2 - 250,
              y: page.getHeight() / 2 - 200,
              width: 500,
              height: 400,
            });
          }
          // PNGs:
          else if (file.mimetype === "image/png") {
            // console.log("in image")

            const page = doc.addPage();
            const imageBytes = readFileSync(file.path);
            const image = await doc.embedPng(imageBytes);
            page.drawImage(image, {
              x: page.getWidth() / 2 - 250,
              y: page.getHeight() / 2 - 200,
              width: 500,
              height: 400,
            });
          }

          // Clean up the file immediately after processing
          // unlink(file.path, err => {
          //     if (err) console.error("Error deleting the file", err);
          // });
        }

        fileCount = 0;
        files = [];

        // Save the document to a file
        const pdfBytes = await doc.save();
        const outputPath = "./output.pdf";
        writeFileSync(process.env.PDF_PATH, pdfBytes);
        console.log(`Generated PDF saved to ${outputPath}`);

        const stats = statSync(process.env.PDF_PATH);
        const fileSizeInMegabytes = stats.size / 1024 / 1024;
        console.log(`File size is ${fileSizeInMegabytes} MB`);
        if (fileSizeInMegabytes > 25) {
          isZip=true
          console.log("File is larger than 25 MB, compressing...");

          try {
            await compressFile(outputPath, "./output.zip");
            // res.sendFile('./output.zip');
          } catch (error) {
            console.error("Failed to compress file:", error);
            res.status(500).json({ message: "Failed to compress file", error });
          }
        } else {
          // res.sendFile(process.env.PDF_PATH);
        }
      }

      await req.user.save();
    } else {
      res.status(400).json({ message: "No current subscription" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).send({
      message: "An error occurred while uploading the file.",
      error: err,
    });
  }
};

export const profileData = async (req, res) => {
  try {
    const user = req.user.toObject();
    delete user["googleId"];
    delete user["file"];
    delete user["_id"];
    delete user["senderData"];
    delete user["receiverData"];

    console.log("user: ", user);
    res.status(200).json({ user });
  } catch (err) {
    console.log(err);
  }
};

export const sendMail = async (req, res) => {
  try {
    const id = req.body.id;
    console.log(id);
    const file = await File.findById(id);
    if (!file) {
      throw new Error("File not found or no data.");
    }
    const base64PDF = file.PDFdata.toString("base64");
    const pdfPath = process.env.PDF_PATH; // Ensure this is the correct path to the file you want to clear
    const zipPath = process.env.ZIP_PATH;

    if(isZip){
      try {
        await access(zipPath, constants.F_OK);
      } catch {
        res.status(404).send({error:"ZIP not created"})
      }

    }
   

    const attachmentPath = isZip ? zipPath : pdfPath;
    const attachmentFilename = isZip ? "YourFiles.zip" : "YourFiles.pdf";
    const attachmentType = isZip ? "application/zip" : "application/pdf";
    const fileData = readFileSync(attachmentPath).toString("base64");

    sgMail.setApiKey(process.env.SG_KEY);
    const msg = {
      from: { email: "support@aiexpensereport.com", name: "Express Reports" },
      personalizations: [{ to: [{ email: req.user.email }] }],
      templateId: "d-8aa8f42e1e4247c489d21786ef26baf2",
      attachments: [
        {
          content: base64PDF,
          filename: "Expense-Report.pdf",
          type: "application/pdf" ,
          disposition: "attachment",
        },
        {
          content: fileData,
          filename: attachmentFilename,
          type: attachmentType,
          disposition: "attachment",
        },
      ],
    };

    try {
      await sgMail.send(msg);
      console.log("Email sent with attachments");
      isZip=false

      // Clear the content of the PDF file by creating a new empty PDF document
      const newPdfDoc = await PDFDocument.create();
      const pdfBytes = await newPdfDoc.save();

      writeFile(pdfPath, pdfBytes, (err) => {
        if (err) {
          console.error("Failed to clear the PDF file:", err);
          res.status(500).send("Email sent, but failed to clear the PDF file");
          return;
        }

        console.log("PDF file cleared successfully");
        res.send({ message: "Email sent with attachments, PDF cleared" });
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.status(500).send("Failed to send email");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not send mail", err });
  }
};


async function compressFile(source, output) {
  return new Promise((resolve, reject) => {
    const outputZip = createWriteStream(output);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Maximum compression
    });

    outputZip.on("close", function () {
      console.log(
        `Compressed file created with size ${archive.pointer()} bytes`
      );
      resolve();
    });

    archive.on("error", function (err) {
      reject(err);
    });

    archive.pipe(outputZip);
    archive.append(readFileSync(source), { name: "output.pdf" });
    archive.finalize();
  });
}
