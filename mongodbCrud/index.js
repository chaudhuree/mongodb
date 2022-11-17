const chalk = require('chalk');
const client = require('./dbConnection')
const data = [
  { name: "shahriar", age: 26, address: { street: 'balighata bazar', city: 'panchbibi' } },
  { name: "kabir", age: 27, address: { street: 'puratun bazar', city: 'parbatipur' } },
  { name: "sohan", age: 28, address: { street: 'dakkhinkhan', city: 'dhaka' } }
]

const updateWith = {
  $set: {
    note: `it is randomly generated as no update value have been passed`
  },
};

const defaultReplacement = {
  note: `the filtered data is being modified by this random data`,
};
// 🔼🔼constants required for this file

//------------------------
// show all database data
// -----------------------
const showAll = async (db, collection) => {
  const dbName = client.db(db).s.namespace.db
  try {
    const database = client.db(db).collection(collection);
    console.log(chalk.greenBright.bold(`data: from the database ${dbName}`));
    await database.find({}).forEach(element => {

      console.log(element)
    });
  } catch (error) {
    console.log(error)
  }
  finally {
    await client.close();
  }
}

//------------------
// delete a database
//------------------
const deleteDatabase = async (db = "sohan") => {
  try {
    const database = client.db(db)
    await database.dropDatabase()
    console.log(chalk.greenBright.bold(`database named as: ${db} has been deleted successfully`))
  } catch (error) {
    console.error(error)
  } finally {
    await client.close();
  }
}
//-----------------------------------
// to insert single data in database
//-----------------------------------
const insertSingle = async (db = 'default', collection = 'test', dataValue = {
  name: "sohan chaudhuree",
  age: 27
}) => {
  const dbName = client.db(db).s.namespace.db
  try {
    const database = client.db(db).collection(collection);

    const result = await database.insertOne(dataValue);
    console.log(chalk.greenBright.bold(`A document was inserted with the _id: ${result.insertedId} in the database: ${dbName}`));
  } catch (error) {
    console.log(error)
  }
  finally {
    await client.close();
  }
}
//---------------------
// insert multiple data
//---------------------

const insertMultiple = async (db = "multiple", collection = "data", document = data) => {
  const dbName = client.db(db).s.namespace.db
  try {
    const database = client.db(db).collection(collection);
    const docs = document;

    const result = await database.insertMany(docs);
    console.log(chalk.greenBright.bold(`${result.insertedCount} documents were inserted in the database ${dbName}`));
  } catch (error) {
    console.log(error)
  }
  finally {
    await client.close();
  }
}

//-----------------
// find single data
//-----------------
const findSingleData = async (db, collection, queryData = {}) => {
  try {
    const database = client.db(db).collection(collection);

    const data = await database.findOne(queryData);

    console.log(chalk.blue.bold(`the searched data is: ${data}`));
  } catch (error) {
    console.log(chalk.red.bold(`${error}`));

  } finally {
    await client.close();
  }
}
//-------------------
// find multiple data
//-------------------
async function findMultipleData(db, collection, query) {
  const dbName = client.db(db).s.namespace.db
  try {
    const database = client.db(db).collection(collection);

    const data = database.find(query);

    if ((await data.countDocuments) === 0) {
      console.log("No documents found!");
    }
    console.log(chalk.greenBright.bold(`data: from the database ${dbName}`));
    await data.forEach(element => console.log(element));
  } finally {
    await client.close();
  }
}
//-----------------------
// Delete single Document
//-----------------------

const deleteSingleData = async (db, collection, queryData) => {
  const dbName = client.db(db).s.namespace.db
  try {
    const database = client.db(db).collection(collection);

    const result = await database.deleteOne(queryData);
    if (result.deletedCount === 1) {
      console.log(chalk.greenBright.bold(`one data has been deleted form the database ${dbName}`));
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } catch (error) {
    console.log(chalk.red.bold(error))
  } finally {
    await client.close();
  }
}
//---------------------------
// Delete multiple Documents
//---------------------------

const deleteMultipleData = async (db, collection, query) => {
  const dbName = client.db(db).s.namespace.db
  try {
    const database = client.db(db).collection(collection);
    const result = await database.deleteMany(query);
    console.log(chalk.bold.greenBright(`Deleted ${result.deletedCount} documents from the database ${dbName}`));
  } finally {
    await client.close();
  }
}

//-----------------
// Replace Document
//-----------------

async function replaceDoc(db,collection,query,replacedData=defaultReplacement) {
  try {
    const database = client.db(db);
    const movies = database.collection(collection);


    const result = await movies.replaceOne(query, replacedData);
    console.log(`Modified ${result.modifiedCount} document(s)`);
  } finally {
    await client.close();
  }
}

//-----------------------
// Update Single Document
//-----------------------


async function updateSingleDoc(db, collection, query, updateValue = updateWith) {
  try {
    const database = client.db(db).collection(collection);
    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: true };
    const result = await database.updateOne(query, updateValue, options);

    if (result.matchedCount === 1) {
      console.log(chalk.greenBright.bold(
        `${result.matchedCount} document(s) matched the query, updated ${result.modifiedCount} document(s)`,)
      );
    } else {
      console.log(chalk.greenBright.bold(
        `new data is added as no data match with the query`,)
      );
    }
  } finally {
    await client.close();
  }
}

//-------------------------
// Update Multiple Document
//-------------------------


async function updateMultipleDocs(db, collection, query, updateValue = updateWith) {
  try {
    const database = client.db(db).collection(collection);

    const result = await database.updateMany(query, updateValue);

      console.log(chalk.greenBright.bold(
        `${result.matchedCount} data is modified`,)
      );
    
  } finally {
    await client.close();
  }
}
updateMultipleDocs("multiple","data",{age:{$exists:false}},{$set:{note:"age is removed"}})



// show data
// showAll()
// showAll('multiple',"data")

// deleteDatabase() //insert database name as string
// deleteDatabase("person")

// insertSingle() //insert database name and collection name in string seperated with comma and also data as object
// insertSingle("sdb","scl",{name:"chaudhuree"})


// insertMultiple() //have to insert db, collection and data as an array
// insertMultiple("mdb","mcl",[{name:'sohan'},{age:27}])

// find single data
// findSingleData() //have to insert db, collection and query
// findSingleData('multiple','data',{name:"kabir"})

// find multiple data
// findMultipleData() //have to insert db,collection and query
// findMultipleData('multiple','data',{name:"sohan"})

// delete single data
// deleteSingleData() //have to insert db,collection and query
// deleteSingleData('multiple','data',{age:29})

// delete multiple
// deleteMultipleData() //have to insert db,collection and query
// deleteMultipleData('multiple','data',{name:"test"})

// update single document
// updateSingleDoc() //have to insert db,collection,query and updateData
// updateSingleDoc('multiple','data',{age:27},{$set:{name:"kabir"}})




module.exports = { showAll, deleteDatabase, insertSingle, insertMultiple, findSingleData, findMultipleData, deleteSingleData, deleteMultipleData,updateSingleDoc,updateMultipleDocs,replaceDoc }