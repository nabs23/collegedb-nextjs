import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    programCourse: { type: mongoose.Schema.Types.ObjectId, ref: 'ProgramCourse' }, // Reference to the program course
    section: String, // Section of the course
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' }, // Reference to the instructor
    schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }], // Array of schedules
    enrollments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }], // Array of enrollments
    academicPeriod: { type: mongoose.Schema.Types.ObjectId, ref: 'AcademicPeriod' }, // Reference to the academic period     
})

const ClassModel = mongoose.models.Class || mongoose.model('Class', classSchema);

export default ClassModel;