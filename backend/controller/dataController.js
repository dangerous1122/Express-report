import User from "../model/userModel.js";
import { readFileSync, writeFileSync } from "fs";
import { unlink,existsSync } from "fs";
import { dirname } from "path";
import fs from "fs/promises";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import File from "../model/fileModel.js";
import axios from "axios";
import sgMail from "@sendgrid/mail";
console.log(process.env.SG_KEY);
import OpenAI from "openai";
import { GoogleAuth } from "google-auth-library";
import { PDFDocument } from "pdf-lib";
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
export const fileUpload = async (req, res) => {
  try {
    console.log(projectId, location, processorId);
    console.log(req.file);
    const data = JSON.parse(req.body.data);

    console.log("dataaa: ", data);

    if (
      req.user.freeTrial ||
      (req.user.subscription.hass && req.user.subscription.gereratedReports > 0)
    ) {
      //google vision
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }
      fileCount++;
      files.push(req.file);

      const client = await auth.getClient();

      const url =
        `https://us-documentai.googleapis.com/v1/projects/681235566970/locations/us/processors/${process.env.PROCESSOR_ID}:process`;
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
          model: "gpt-3.5-turbo-0125",
          messages: [
            {
              role: "user",
              content:
                prompt +
                " give one 'title',one 'category of expense', only one 'date of expense' and 'total amount of expense' keep format as follows: Title: [title]  \n category of expense: [category] \n date of expense: January 1,2000 \n total amount of expense : [amount] \n ",
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
        console.log("count", fileCount);
        console.log(files);
        const doc = await PDFDocument.create();
        for (const file of files) {
          if (file.mimetype === "application/pdf") {
            console.log("hello");
            // Merge PDF
            const existingPdfBytes = readFileSync(file.path);

            const existingPdfDoc = await PDFDocument.load(existingPdfBytes);
            const copiedPage = await doc.copyPages(
              existingPdfDoc,
              existingPdfDoc.getPageIndices()
            );
            copiedPage.forEach((page) => doc.addPage(page));
          } else if (file.mimetype === "image/jpeg") {
            const page = doc.addPage();
            const imageBytes = readFileSync(file.path);
            const image = await doc.embedJpg(imageBytes); // Use embedJpg() for JPEG images
            page.drawImage(image, {
              x: page.getWidth() / 2 - 250,
              y: page.getHeight() / 2 - 200,
              width: 500,
              height: 400,
            });
          }else if(file.mimetype==="image/png"){
            const page = doc.addPage();
            const imageBytes = readFileSync(file.path);
            const image = await doc.embedPng(imageBytes); // Use embedJpg() for JPEG images
            page.drawImage(image, {
              x: page.getWidth() / 2 - 250,
              y: page.getHeight() / 2 - 200,
              width: 500,
              height: 400,
            });
          }
          unlink(file.path, (err) => {
            if (err) {
              console.error("Error deleting the file", err);
              return res.status(500).send("An error occurred");
            }
          });
        }


        const pdfBytes = await doc.save();
        writeFileSync("output.pdf", pdfBytes);
        console.log(`Generated PDF saved to `);
        fileCount = 0;
        files=[];
      }

     

      await req.user.save();
    } else {
      res.status(400).json({ message: "No current subscription" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
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
    console.log("id: ", id);
    let attachments = [];
    const file = await File.findById(id);
    if (!file) {
      throw new Error("File not found or no data.");
    }
    const base64PDF = file.PDFdata.toString("base64");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pdfPath = process.env.PDFPATH;
    const PdfData = readFileSync(pdfPath).toString("base64");


    sgMail.setApiKey(process.env.SG_KEY);
    const msg = {
      from: { email: "support@aiexpensereport.com",name:"Express Reports" },
      personalizations: [{ to:[ { email: req.user.email }] }],
      // subject: "PDF Files",
      // text: "Attached are your PDF files.",
      templateId: "d-8aa8f42e1e4247c489d21786ef26baf2",
      attachments: [
        {
          content: base64PDF,
          filename: "expense-report.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
        {
          content: PdfData,
          filename: "YourFiles.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    try {
      await sgMail.send(msg);
      res.send({ message: "Email sent with attachments" });
    } catch (error) {
      console.error("Failed to send email:", error);
      res.status(500).send("Failed to send email");
    }

  
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not send mail", err });
  }
};
