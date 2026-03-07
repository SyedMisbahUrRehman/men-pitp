const Student = require('../models/Student');
const { success, error } = require('../utils/response');

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    return success(res, 200, 'Students retrieved successfully', students);
  } catch (err) {
    return error(res, 500, 'Failed to retrieve students', err.message);
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return error(res, 404, 'Student not found');
    }
    return success(res, 200, 'Student retrieved successfully', student);
  } catch (err) {
    if (err.name === 'CastError') {
      return error(res, 400, 'Invalid student ID');
    }
    return error(res, 500, 'Failed to retrieve student', err.message);
  }
};

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return success(res, 201, 'Student created successfully', student);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return error(res, 400, 'Validation failed', errors);
    }
    if (err.code === 11000) {
      return error(res, 409, 'Student with this email already exists');
    }
    return error(res, 500, 'Failed to create student', err.message);
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!student) {
      return error(res, 404, 'Student not found');
    }
    return success(res, 200, 'Student updated successfully', student);
  } catch (err) {
    if (err.name === 'CastError') {
      return error(res, 400, 'Invalid student ID');
    }
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return error(res, 400, 'Validation failed', errors);
    }
    if (err.code === 11000) {
      return error(res, 409, 'Student with this email already exists');
    }
    return error(res, 500, 'Failed to update student', err.message);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return error(res, 404, 'Student not found');
    }
    return success(res, 200, 'Student deleted successfully', { id: student._id });
  } catch (err) {
    if (err.name === 'CastError') {
      return error(res, 400, 'Invalid student ID');
    }
    return error(res, 500, 'Failed to delete student', err.message);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
