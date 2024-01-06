import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  nameExtension: String,
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  phoneNumber: String,
  birthdate: Date,
  sex: {
    type: String,
    enum: ["Male", "Female"],
  },
  address: String,
  city: String,
  province: String,
  transcripts: [
    {
      academicPeriod: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicPeriod",
      },
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      courseTitle: String,
      courseCode: String,
      courseDescription: String,
      grade: {
        type: Number,
        min: 0,
        max: 100,
      },
      credits: Number,
      college: String,
      program: String,
      schoolYear: String,
      period: String,
    },
  ],
  scholarships: [
    {
        scholarship: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Scholarship",
        },
        amount: Number,
        tuitionFeeDiscount: Number,
        otherFeesDiscount: Number,
        active: Boolean
    }
  ]
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

studentSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName} ${this.nameExtension ? this.nameExtension : ''}`;
})

const StudentModel = mongoose.models.Student || mongoose.model("Student", studentSchema);

export default StudentModel;