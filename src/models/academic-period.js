import mongoose from "mongoose";

const currentYear = new Date().getFullYear();

const academicPeriodSchema = new mongoose.Schema({
  startYear: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        // Validate that the start year is a valid number
        if (!Number.isInteger(value) || value < 2010 || value > currentYear) {
          return false;
        }
        return true;
      },
      message: "Start year must be a valid positive integer.",
    },
  },
  period: {
    type: String,
    required: true,
    enum: [
      "First Semester",
      "Second Semester",
      "Summer",
      "First Trimester",
      "Second Trimester",
      "Third Trimester",
      "Trimester Summer",
    ],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  // Relations
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Transaction",
  }],
  classes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  }],
  enrollments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create a virtual property for the end year
academicPeriodSchema.virtual("endYear").get(function () {
  return this.startYear + 1;
});

const AcademicPeriodModel = mongoose.models.AcademicPeriod || mongoose.model( "AcademicPeriod", academicPeriodSchema );

export default AcademicPeriodModel;
