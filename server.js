const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const taskRoutes = require('./routes/tasks');
const studentRoutes = require("./routes/students");

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.use("/api/students", studentRoutes);

mongoose
    .connect("mongodb+srv://talishnazir539:talishnazir539123@cluster0.smy4b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB...");
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch((err) => console.error("Could not connect to MongoDB...", err));
