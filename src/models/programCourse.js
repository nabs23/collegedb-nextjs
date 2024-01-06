import mongoose from "mongoose";
// Program Course nested in the Program. Each course is associated with a program and year level.
// When adding a course to a program, the courses should be queried as suggestions regardless of what program it belongs to.
// Then a new course is created for a given program
// How to make sure a program and a course are unique?
const programCourseSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Reference to the course
    program: { type: mongoose.Schema.Types.ObjectId, ref: "Program" }, // Reference to the program
    yearLevel: { type: String, enum: ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year", "Sixth Year"] }, // Year level of the course
    period: { type: String, enum: ["First Semester", "Second Semester", "First Trimester", "Second Trimester", "Third Trimester", "Summer"] }, // Period of the course
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }], // Array of classes
})

const ProgramCourseModel = mongoose.models.ProgramCourse || mongoose.model('ProgramCourse', programCourseSchema);

export default ProgramCourseModel;