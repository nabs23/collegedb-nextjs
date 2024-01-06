import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    // classes which refers to program.curricula.yearLevels.period.courses,
    enrolledClasses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
    }],
    enrollmentFees: [{
        fee: {type: mongoose.Schema.Types.ObjectId, ref: "Fee",},
        amount: Number
    }],
    appliedScholarships: [{
        scholarship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Scholarship",
        },
        amount: Number,
        tuitionFeeDiscount: Number,
        otherFeesDiscount: Number,
    }],
    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Program",
    },
    academicPeriod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicPeriod",
    },
})

const EnrollmentModel = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);

export default EnrollmentModel;