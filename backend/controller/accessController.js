import User from "../model/userModel.js";
import File from "../model/fileModel.js";
import bcrypt from "bcrypt";
import { tokenGenerator } from "../helper/tokenGenerator.js";
import { OAuth2Client } from "google-auth-library";
import sgMail from "@sendgrid/mail";

export const register = async (req, res, next) => {
  try {
    sgMail.setApiKey(process.env.SG_KEY);
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      let user = await newUser.save();
      newUser.token = tokenGenerator(user._id);
      user = await newUser.save();
      console.log(user);
      const msg = {
        from: { email: "support@aiexpensereport.com", name: "Express Reports" },
        personalizations: [{ to: [{ email: newUser.email }] }],
        // subject: "PDF Files",
        // text: "Attached are your PDF files.",
        templateId: "d-95554d2060f049b7a0eb8a195da414c1",
      };

      const msg2 = {
        from: { email: "support@aiexpensereport.com", name: "Express Reports" },
        personalizations: [{ to: [{ email: "saaad.khaan.69@gmail.com" }] }],
        subject: "New User Registered",
        text: ` ${newUser.email} has been registered as a new user`,
      };
      try {
          const reps1=await sgMail.send(msg)
          console.log("response: ",reps1)
         const resp2= await sgMail.send("response: ",msg2)
          console.log(resp2)

    
        res
          .status(200)
          .json({ message: "Welcome Email sent ", token: newUser.token });
      } catch (error) {
        console.error("Failed to send email:", error);
        res.status(500).send("Failed to send email");
      }
    } else {
      res.send("Error registering new user");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

export const login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("This email does not exist.");
    }
    // Should log the hashed password from the database

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send("Password is incorrect.");
    }

    const token = tokenGenerator(user._id);
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
};

export const validate = (req, res, next) => {
  try {
    const user = req.user;
    res.status(200).json({ user });
  } catch (err) {
    res.status(401);
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

export const googleAuth = async (req, res) => {
  const token = req.body.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT,
    });

    const payload = ticket.getPayload();
    const userid = payload["sub"];

    let existingUser = await User.findOne({ googleId: userid });
    const old = await User.findOne({ googleId: userid });
    if (existingUser) {
      console.log("User already exists");
    } else {
      console.log("Creating new user");
      existingUser = new User({
        googleId: userid,
        email: payload["email"],
        name: payload["name"],
      });
    }
    let userr = await existingUser.save();
    userr.token = tokenGenerator(userr._id);
    const doc = await userr.save();
    if (!old) {
      // Should this be if (!oldUser)? You need to ensure logic is correct here.
      sgMail.setApiKey(process.env.SG_KEY);
      const msg = {
        from: { email: "support@aiexpensereport.com", name: "Express Reports" },
        personalizations: [{ to: [{ email: existingUser.email }] }],
        templateId: "d-95554d2060f049b7a0eb8a195da414c1",
      };
      const msg2 = {
        from: { email: "support@aiexpensereport.com", name: "Express Reports" },
        personalizations: [{ to: [{ email: "applepatient@gmail.com" }] }],
        subject: "New User Registered",
        text: ` ${userr.email} has been registered as a new user`,
      };
      try {
        
        await sgMail.send(msg);
        await sgMail.send(msg2)

      } catch (error) {
        console.error("Failed to send email:", error);
        return res.status(500).send("Failed to send email"); // Return here to prevent further execution
      }
    }
    console.log(doc);
    return res.status(201).json({
      // Ensure to return here
      message: "User created and authenticated",
      token: doc.token,
      data: doc,
    });
  } catch (error) {
    console.error("Authentication failed", error);
    return res.status(401).json({ message: "Invalid token" }); // Ensure to return here
  }
};

export const deleteAcc = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (user && user.files.length > 0) {
      await File.deleteMany({ _id: { $in: user.files } });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).send("User not found.");
    }

    res
      .status(200)
      .json({ message: "User account and associated files deleted." });
  } catch (error) {
    console.error("Error hard-deleting user:", error);
    res.status(500).send("Error deleting user account and files.");
  }
};
