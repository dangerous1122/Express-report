import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password:{ type: String},
  googleId: { type: String, required: false, unique: true, sparse: true },

  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  senderData: [
    {
      name: String,
      email: String,
      contact: Number,
      address: String,
    },
  ],
  receiverData: [
    {
      name: String,
      email: String,
      contact: Number,
      address: String,
    },
  ],

  files: [
    {
      type: Schema.Types.ObjectId,
      ref: "File",
    },
  ],

  isDeleted: Boolean,
  freeTrial: { type: Boolean, default: true },
  subscription: {
    hass: { type: Boolean, default: false },
    gereratedReports: { type: Number, default: 10 },
  },
});

const User = mongoose.model("Users", userSchema);

export default User;
