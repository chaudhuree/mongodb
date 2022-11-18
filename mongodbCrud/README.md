  

#  Documentations


>**First clone or download the file and do the following work:**



 - create a **.env** file in the root directory
  - create a variable named,DATABASE_URL
	 >Example:
	```
		const DATABASE_URL
	```
- set it's value : mongodb://localhost:27017 (for local computer)
	>Example:
	```
	const DATABASE_URL="mongodb://localhost:27017"
	```
- for atlas set the variable name to : DATABASE_CLOUD
and set its value which is collected from the atlas connect
	>Example:
	```
	const DATABASE_CLOUD="mongodb+srv://<username>:<password>@<clusetr name>.grxys5y.mongodb.net/?retryWrites=true&w=majority"
	```
- go to dbConnection.js file
	
	- edit this file  with below system
	>code

	```
	---> for local computer
	const  client  =  new  MongoClient(process.env.DATABASE_URL);
	--->for atlas
	const  client  =  new  MongoClient(process.env.DATABASE_CLOUD);
	```
**You are all set now**
now run this **command in terminal**
>code

```
npm i
```
then,
```
npm run startDev
```
## Finally we have finished our initial tasks.now,

***all function details are described below:
 just call them with appropriate value in the index.js file and press ctrl+s ,
you will show the feedback result in the console and your database will be updated according to the function***

## Show Data
**insert db name and collection name  (in string form)**

	 showAll() 

>Example:
	
	showAll(<db name>,<collection name>)
	
	showAll('db', 'cl')

  ## Delete Database
**insert database name in string**
>Example:

	deleteDatabase(<database name>) 

	deleteDatabase("database")

  ## Insert Single Data
  
 **insert database name and collection name in string**
 &
**data as object**
>Example: 

    insertSingle(<database name>, <collection name>, <data={}>)
    
    insertSingle("sdb","scl",{name:"chaudhuree",age:27})

  
  ## Insert Multiple Data:
  **insert database name, collection name and data as an array**
>Example:

     insertMultiple(<database name>, <collection name>, <data=[{},{}]>) 

     insertMultiple("mdb","mcl",[{name:'sohan',age:27}, {name:"mamun",age:27}])

  ## Find Single Data
**insert database name, collection name and query data**
>Example:

    findSingleData(<database name>, <collection name>, <query data>) 

    findSingleData('mdb','mcl',{name:"mamun"})

  

## Find Multiple Data
**insert database name,collection name and query data**
>Example:

    findMultipleData(<database name>, <collection name>, <query data>) 

    findMultipleData('mdb','mcl',{name:"sohan"})

  

## Delete Single Data
**insert database name,collection name and query data**
>Example:

    deleteSingleData(<database name>, <collection name>, <query data>) 

    deleteSingleData('mdb','mcl',{age:27})

  

## Delete Multiple
**insert database name,collection name and query data**
>Example:

    deleteMultipleData(<database name>, <collection name>, <query data>) 

    deleteMultipleData('mdb','mcl',{name:"sohan"})

  
## Update Single Document
**insert database name,collection name ,query data and update data**
>Example:

    updateSingleDoc(<database name>, <collectiion name>, <query data>, <update data>) 

    updateSingleDoc('multiple','data',{age:27},{$set:{name:"kabir"}})

  

## Update Multiple Docs
**insert database name,collection name ,query data and update data**
>Example:

    updateMultipleDocs(<database name>, <collectiion name>, <query data>, <update data>) 

    updateMultipleDocs("multiple","data",{age:{$exists:false}},{$set:{note:"age is removed"}})

  
## Replace Document
**insert database name,collection name ,query data and replace data**
>Example:

    replaceDoc(<database name>, <collectiion name>, <query data>, <replace data>) 
    
    replaceDoc("db","cl",{age:{$exists:false}},{$set:{note:"remove all data nad replace with given value"}})
