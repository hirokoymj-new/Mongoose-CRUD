const mongoose = require('mongoose');
// Connect MongoDB
mongoose.connect('mongodb://localhost/playground')
  .then(()=>console.log("Connected to MongoDB"))
  .catch(err =>console.log('Could not connect MongoDB', err));


// mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true });
// mongoose.connection.once('open', () => {
//   console.log('connected to database');
// });


// Create Schema - Schema is the shape of document.
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  isPublished: Boolean,
  cid: Number
});
// Type of Schema
//String
//Number
//Date
//Buffer
//Boolean
//ObjectID
//Array

//Classes, objects
// Human, John
// Once creating a schema, we need to compile it into a model. A model is like a class. It's a blueprint for creating objects:
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'CSS Course',
    author: 'Hiroko',
    tags: ['css', 'frontend'],
    isPublished: true
  });
  const result = await course.save();
  console.log(result);
}
//createCourse();

// async function getCourses() {
//   // ===== select * from courses
//   //const courses = await Course.find();
//   // ===== select * from courses where author = 'Mosh and isPublish = true
//   //const courses = await Course.find({author: 'Mosh', isPublished: true})
//   // ===== select name, author from courses orderby author
//   // const courses = await Course
//   //   .find()
//   //   .sort({author: 1})
//   //   .select({name: 1, tags: 1})

//   // Starts with Mosh
//   //const courses = await Course.find({author: /^Mosh/})
//   // Ends with Mosh
//   //const courses = await Course.find({author: /Mosh$/})
//   // Contains Mosh
//   //const courses = await Course.find({author: /.*Mosh.*/})
//   //Count
//   const courses = await Course.find({author: /.*Mosh.*/}).count();

//   console.log(courses);
// }
// getCourses();


// Update 
async function updateCourses(id){
  const course = await Course.findById(id);
  if(!course) return;
  course.cid = 17;

  // course.set({
  //   author: "Teset",
  //   isPublished: false
  // });
  const result = await course.save();
  console.log(result);
}

updateCourses("5bc3d38b87f5f3717a2213b8");

// Delete
// async function deleteCourse(id){
//     const course = await Course.deleteOne({_id: id});
//     if(!course) return;
//     console.log(course);
//   }
  
//   deleteCourse("5bc3d3545a2c1071725c43de");