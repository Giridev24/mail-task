// models/List.js
const mongoose = require("mongoose");

// Define the schema for a mail object (now called 'List')
const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  domain: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures email is unique
    trim: true,
    lowercase: true,
  },
  contact: {
    type: String,
    required: true,
    trim: true,
  },
}, { timestamps: true }); // Automatically adds `createdAt` and `updatedAt` fields

// Create the model for the 'list' collection within 'mailtask' database
const List = mongoose.model("List", listSchema, "list");

module.exports = List;
