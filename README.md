# Mongoose CRUD

- [Mongoose CRUD](#mongoose-crud)
  - [Create](#create)
  - [Read](#read)
      - [Querying documents](#querying-documents)
      - [Count](#count)
      - [Query - Regular Expression](#query---regular-expression)
      - [Query - Comparison Operators](#query---comparison-operators)
      - [Query - Pagination](#query---pagination)
  - [Update](#update)
      - [Updating a document (query first)](#updating-a-document-query-first)
      - [findByIdAndUpdate](#findbyidandupdate)
      - [auto increment](#auto-increment)
  - [Delete](#delete)
      - [Delete one document](#delete-one-document)
  - [References:](#references)


## Create
- Saving a document
- [create.js](create.js)

  
  ```js
  async function createCourse() {
  const course = new Course({
    name: 'TEST 101',
    author: 'Jim',
    tags: ['css', 'frontend'],
    isPublished: true
  });
  const result = await course.save();//<-- save new document
  console.log(result);
  }
  ```

## Read

#### Querying documents
- [read.js](read.js)

  
```js
async function getAllCourses() {
  const courses = await Course
        .find()
        .sort({name: 1})
        .select({name: 1, tags: 1})
  console.log(courses);
}
```

#### Count

- Counts number of documents that match filter in a database collection.
 
```js
async function getCount() {
  const courses = await Course.find().count()
  console.log(courses);
}
```

#### Query - Regular Expression
- [read_regularExression.js](read_regularExression.js)
  
```js
// exact same 'Mosh'
Course.find({author: 'Mosh', isPublish: true}) 

// Starts with Mosh
Course.find({author: /^Mosh/});

// Ends with `Hamadani` in case insensitive.
Course.find({author: /Hmadani$/i})

// Contains 'Mosh' in case insensitive.
Course.find({author: /.*Mosh.*/i})
```


#### Query - Comparison Operators

| Operators  |
|---|
| eq (equal) |
| ne (not equal) |
| gt (greater than) |
| gte (greater than or equal to ) |
| lt (less than|
| lte (less than or equal to) |
| in |
| nin (not in|

```js
Course.find({price: 10}) // price is $10.
Course.find({price: {$gt: 10}}) // price is more than $10.
Course.find({price: {$gte: 10, $lte: 20}}) // get the course btw $10 to $20.
Course.find({price: {$in: [10, 15, 20]}}) // get the course price either $10 or $15 or $20.
```


#### Query - Pagination
- skip() - skip all document in previous page.

**mongoose**
```js
const pageNumber = 2;
const pageSize = 10;

Course
  .find({author: 'Mosh', isPublish: true})
  .skip((pageNumber-1 * pageSize)
  .limit(pageSize)
```

**Express.js + mongoose**
- URL: `/api/courses?pageNumber=2`

```js
app.get('/', (req, res)=>{
  let pageSize = 100;
  let pageNumber = (Object.getOwnPropertyNames(req.query).length===0) ? 1 : req.query.page
  Employee
    .find()
    .sort({id: 1})
    .skip((pageNumber-1) * pageSize)
    .limit(pageSize)
    .exec((err, employees)=>{
      if(err) return res.send(err);
        res.json(employees);
      })
  }
);
```


## Update

#### Updating a document (query first)
```js
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
```

#### findByIdAndUpdate
- $inc - Increments the value of the field
- [MongoDB Update Operators](https://docs.mongodb.com/manual/reference/operator/update-field/)  
 
```js
// @params: ID
// @params: update object
// @params: options {new: true} - true to return the modified document rather than the original.
// @description
// Finds a matching document, updates it according to the update arg,
//  passing any options, and returns the found document 
async function updateCounter() {
    const counter = await Counter.findByIdAndUpdate(
      {_id:'entityId'},
      {$inc: {seq:1}},
      {new: true, upsert:true }, function(err, doc){ 
      console.log(doc.seq);
      console.log(doc);
    });
  } 
```

#### auto increment 
- [pre](https://mongoosejs.com/docs/middleware.html#pre)
- [findByIdAndUpdate](https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate)
- [$inc](https://docs.mongodb.com/manual/reference/operator/update-field/)
```js
const counterSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

const employeeSchema = mongoose.Schema({
  name: {type: String},
  eid: {type: String}
});
const Employee = mongoose.model('Employee', employeeSchema);

employeeSchema.pre('save', function(next) {
  var doc = this;
    const counter = Counter.findByIdAndUpdate(
      {_id:'entityId'},
      {$inc: {seq:1}},
      {new: true, upsert:true }, function(err, counter){ 
        if(err) return next(error);
        doc.eid = counter.seq;
        next();
      });
});
```


## Delete

#### Delete one document
```js
async function deleteCourse(id){
    const course = await Course.deleteOne({_id: id});
    if(!course) return;
    console.log(course);
  }
```

## References:

- [Document.prototype.save()](https://mongoosejs.com/docs/api.html#document_Document-save)
- [Mongoose Queries](https://mongoosejs.com/docs/queries.html)
- [Model.count()](https://mongoosejs.com/docs/api.html#model_Model.count)



.prettierrc.js

module.exports = {
  arrowParens: 'always',
  bracketSpacing: true,
  jsxSingleQuote: false,
  jsxBracketSameLine: false,
  printWidth: 120,
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
}
.prettierignore
package.json
node_modules
