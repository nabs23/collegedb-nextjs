import mongoose from 'mongoose';
// TODO: Program Course: What if the program and curriculum are merged?

// Year Levels
const yearLevels = ['First Year', 'Second Year', 'Third Year', 'Fourth Year', 'Fifth Year', 'Sixth Year'];

// Define schema for the program
const programSchema = new mongoose.Schema({
  name: String,
  shortName: String,
  description: String,
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  isCurrent: { type: Boolean, default: true },
  curriculum: String
});

// Define a unique index to enforce uniqueness of isCurrent: true
curriculumSchema.index({ isCurrent: 1 }, { unique: true, partialFilterExpression: { isCurrent: true } });

// yearLevels virtual property based on program duration (if duration is one, yearLevels is ['First Year'], if duration is two (2), yearLevels is ['First Year', 'Second Year'], etc.)
programSchema.virtual('yearLevels').get(function () {
  return yearLevels.slice(0, this.duration);
})

const ProgramModel = mongoose.models.Program || mongoose.model('Program', programSchema);

export default ProgramModel;
