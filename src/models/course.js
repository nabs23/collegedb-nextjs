import mongoose from 'mongoose';

// Define schema for course credits
const creditSchema = new mongoose.Schema({
  name: String,
  code: String,
  rate: Number
})

// Define schema for subjects or courses of the program
const courseSchema = new mongoose.Schema({
  title: String,
  code: String,
  description: String,
  credits: [{
    credit: creditSchema,
    credits: Number
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }]
});

// Define virtual property for the total number of credits
courseSchema.virtual('totalCredits').get(function () {
  return this.credits.reduce((total, credit) => total + credit.credits, 0);
});

const CourseModel = mongoose.models.Course || mongoose.model('Course', courseSchema);

export default CourseModel;