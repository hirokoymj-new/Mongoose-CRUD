## Mongoose Schema

- Relational database: `tables and rows`
- MongoDB - `collections and documents`
- **Schemas** is the shape of documents.


| Type  |
|---|
| String |
| Number |
| Date |
| Buffer |
| Boolean |
| ObjectID |
| Array |



```js
const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [String],
	date: {type: Date, default: Date.now},
	isPublished: Boolean
})
```  

## Mongoose: Model
- We need to compile **schema** into **model**.
- A model is like a class.
- It's a blueprint for creating objects.
- Example: **Human** class -> **John** object
- Example: **Course** class -> **English course** object
  
```js
const Course = mongoose.model('Course', courseSchema);
const nodeCourse = new Course({
	name: 'Node.js Course',
	author: 'Mosh',
	tags: ['node', 'backend'],
	isPublished: true
});
```