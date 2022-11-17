const chalk = require('chalk');
const client = require('./dbConnection')
const data = [
  { name: "shahriar", age: 26, address: { street: 'balighata bazar', city: 'panchbibi' } },
  { name: "kabir", age: 27, address: { street: 'puratun bazar', city: 'parbatipur' } },
  { name: "sohan", age: 28, address: { street: 'dakkhinkhan', city: 'dhaka' } }
]

// 🔼🔼constants required for this file

// show all database data
// ======================
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


// delete a database
// =================
// =================
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

// to insert single data in database
// =================================
// =================================
const insertSingle = async (db = 'default', collection = 'test') => {
  const dbName = client.db(db).s.namespace.db
  try {
    const database = client.db(db).collection(collection);
    const doc = {
      name: "sohan chaudhuree",
      age: 27
    }
    const result = await database.insertOne(doc);
    console.log(chalk.greenBright.bold(`A document was inserted with the _id: ${result.insertedId} in the database: ${dbName}`));
  } catch (error) {
    console.log(error)
  }
  finally {
    await client.close();
  }
}

// insert multiple data
// ====================
// ====================

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


// find single data
// ================
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

// find multiple data
// ==================
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





// show data
// showAll()
// showAll('multiple',"data")

// deleteDatabase() //insert database name as string
// deleteDatabase("person")

// insertSingle() //insert database name and collection name in string seperated with comma
// insertSingle("sdb","scl")


// insertMultiple() //have to insert db, collection and data as an array
// insertMultiple("mdb","mcl",[{name:'sohan'},{age:27}])

// find single data
// findSingleData() //have to insert db, collection and query
// findSingleData('multiple','data',{name:"kabir"})

// find multiple data
// findMultipleData() //have to insert db,collection and query
// findMultipleData('multiple','data',{name:"sohan"})





module.exports = { showAll,deleteDatabase, insertSingle, insertMultiple, findSingleData,findMultipleData }