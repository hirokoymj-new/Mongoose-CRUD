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

  Course.find({price: 10}) // price is $10.
  Course.find({price: {$gt: 10}}) // price is more than $10.
  Course.find({price: {$gte: 10, $lte: 20}}) // get the course btw $10 to $20.
  Course.find({price: {$in: [10, 15, 20]}}) // get the course price either $10 or $15 or $20.  
}
getCount();

// $ node read_count.js 
// Connected to MongoDB
// 5