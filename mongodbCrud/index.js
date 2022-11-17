const client = require('./dbConnection')

// delete a database
const deleteDatabase = async (db="sohan") => {
  try {
    const database = client.db(db)
    await database.dropDatabase()
    console.log(`database named as: ${db} has been deleted successfully`)
  } catch (error) {
    console.error(error)
  } finally {
    await client.close();
  }
}

// to insert single data in database
const insertSingle = async (db = 'default', collection = 'test') => {
  try {
    const database = client.db(db).collection(collection);
    // const users = database.collection(collection);
    const doc = {
      name: "sohan chaudhuree",
      age: 27
    }
    const result = await database.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.log(error)
  }
  finally {
    await client.close();
  }
}
// insertSingle() //insert database name and collection name in string seperated with comma
// deleteDatabase() //insert database name as string
