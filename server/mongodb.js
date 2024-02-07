const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "myDB";

const dbConnection = async () => {
  try {
    await client.connect();
    console.log("Sucessfully Connect to DB");
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error({ error: "Error in Connecting to DB" });
    throw new error();
  }
};

module.exports = { dbConnection };
