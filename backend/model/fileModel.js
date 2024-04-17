import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  PDFdata: {
    type: Buffer,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model("File", fileSchema);
export default File;
