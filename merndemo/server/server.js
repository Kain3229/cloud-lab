const express = require("express");
const cors = require("cors");

const Student = require("./models/Student");

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error(err));

const app = express();

app.use(cors());
app.use(express.json());

// API kiểm tra server
app.get("/api/hello", (req, res) => {
    res.send("Backend đang hoạt động");
});


// Câu 36: GET danh sách sinh viên
app.get("/api/Students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Câu 37: POST thêm sinh viên
app.post("/api/Students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Câu 38: PUT cập nhật sinh viên
app.put("/api/Students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Câu 39: DELETE xóa sinh viên
app.delete("/api/Students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});