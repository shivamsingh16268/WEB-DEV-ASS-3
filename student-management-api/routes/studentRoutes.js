const express = require("express");
const router = express.Router();
let students = require("../data/students");


router.get("/", (req, res) => {
  res.status(200).json(students);
});


router.get("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({ message: "Student not found" });
  }

  res.status(200).json(student);
});


router.post("/", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    course
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});


router.put("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const { name, course } = req.body;

  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  if (!name || !course) {
    return res.status(400).json({ message: "Name and course are required" });
  }

  students[studentIndex] = { id: studentId, name, course };
  res.status(200).json(students[studentIndex]);
});


router.delete("/:id", (req, res) => {
  const studentId = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  const deletedStudent = students.splice(studentIndex, 1);
  res.status(200).json({
    message: "Student deleted successfully",
    student: deletedStudent[0]
  });
});

module.exports = router;