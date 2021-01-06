# MongoDB Atlas and mongo shell


### Connect to Cluster using mongo shell

1. Login MongoDB Atlas [here](https://account.mongodb.com/account/login)
2. Clasters -> click on "..." and select Command Line Tools
3. Connect Instructions
4. Select "Connect with the mongo shell"
5. Check if mongo shell installed.
   ```js
	 mongo --version
	 ```
6. Connect mongoDB using connection string
	```js
	mongo "mongodb+srv://cluster0.xcz6m.mongodb.net/<dbname>" --username root
	```

### Rename Collection 

1. Open terminal
2. Run connection string
	```js
	mongo "mongodb+srv://cluster0.xcz6m.mongodb.net/<dbname>" --username root
	```
3. Execute db.collection.renameCollection() method
	 ```js
	 db.rrecord.renameCollection("record")
	 ```