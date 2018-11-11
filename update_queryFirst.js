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
});

const Course = mongoose.model('Course', courseSchema);


// Update 
async function updateCourses(id){
  const course = await Course.findById(id);
  if(!course) return;
  course.set({
    name: "ES6 Hiroko Course",
    author: "Daisuke",
    isPublished: false
  });
  const result = await course.save();
  console.log(result);
}

updateCourses("5bc3d36e657ec97176eb7aab");

