const chalk = require('chalk');
const { MongoClient } = require("mongodb");
require('dotenv').config()
const client = new MongoClient(process.env.DATABASE_URL);
console.log(chalk.white.bgGreen.bold("database connected ⭐⭐ "))
module.exports=client;

