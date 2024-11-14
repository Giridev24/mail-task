const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const List = require('./models/List');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.post("/form", async (req, res) => {
  const { name, domain, role, email, contact } = req.body;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Form Submission Confirmation",
    text: `Hi ${name},\n\nThank you for your submission! We have received your details.\n\nBest,\nYour Company`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(500).send("Error sending email");
    }

    try {
      const newMail = new List({ name, domain, role, email, contact });
      await newMail.save();
      res.status(200).send("Email sent successfully and data saved!");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error saving data to database");
    }
  });
});

app.get("/api/get-mails", async (req, res) => {
  try {
    const mails = await List.find();
    res.status(200).json(mails);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data from database");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
