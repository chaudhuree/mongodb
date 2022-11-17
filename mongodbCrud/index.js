const chalk = require('chalk');
const client = require('./dbConnection')
const data = [
  { name: "shahriar", age: 26, address: { street: 'balighata bazar', city: 'panchbibi' } },
  { name: "kabir", age: 27, address: { street: 'puratun bazar', city: 'parbatipur' } },
  { name: "sohan", age: 28, address: { street: 'dakkhinkhan', city: 'dhaka' } }
]
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
  try {
    const database = client.db(db).collection(collection);
    const doc = {
      name: "sohan chaudhuree",
      age: 27
    }
    const result = await database.insertOne(doc);
    console.log(chalk.greenBright.bold(`A document was inserted with the _id: ${result.insertedId} in the database: ${client.db(db).s.namespace.db}`));
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
  try {
    const database = client.db(db).collection(collection);
    const docs = document;

    const result = await database.insertMany(docs);
    console.log(chalk.greenBright.bold(`${result.insertedCount} documents were inserted in the database ${client.db(db).s.namespace.db}`));
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










// deleteDatabase() //insert database name as string
// deleteDatabase("person")

// insertSingle() //insert database name and collection name in string seperated with comma
// insertSingle("sdb","scl")


// insertMultiple()
// insertMultiple("mdb","mcl",[{name:'sohan'},{age:27}])

// find single data
// findSingleData()
// findSingleData('multiple','data',{name:"kabir"})