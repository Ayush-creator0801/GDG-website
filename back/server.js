const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  event: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

app.post("/register", async (req, res) => {
  try {
    const { name, email, event } = req.body;

    const newRegistration = new Registration({ name, email, event });
    await newRegistration.save();

    res.json({ message: "Registered Successfully 🎉" });
  } catch (error) {
    res.status(500).json({ message: "Registration failed ❌" });
  }
});

app.get("/count/:eventName", async (req, res) => {
  try {
    const count = await Registration.countDocuments({
      event: req.params.eventName,
    });

    res.json({ count });
  } catch (error) {
    res.status(500).json({ count: 0 });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));