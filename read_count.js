const mongoose = require('mongoose');
// Connect MongoDB
mongoose.connect('mongodb://localhost/playground')
  .then(()=>console.log("Connected to MongoDB"))
  .catch(err =>console.log('Could not connect MongoDB', err));


// Create Schema - Schema is the shape of document.
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean,
  cid: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCount() {
  const courses = await Course.find().count()
  console.log(courses);
}
getCount();

// $ node read_count.js 
// Connected to MongoDB
// 5