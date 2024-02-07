const cons = require("cons");
const { dbConnection } = require("../mongodb");
const { json } = require("express");
const { Long, ObjectId } = require("mongodb");

const getData = async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("userData");
    const userData = await collection.find().toArray();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching data form DB" });
  }
};

const postData = async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("userData");
    const result = await collection.insertOne(req.body);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error in addding Data to DB" });
  }
};

const putData = async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("userData");
    const id = req.params.id;
    const updatedData = req.body;
    const objectId = new ObjectId(id);

    const result = await collection.updateOne(
      { _id: objectId },
      { $set: updatedData }
    );
    console.log("Updated data Sucessfully");
    res.json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ error: "Error in Updating Data to DB" });
  }
};

const deleteData = async (req, res) => {
  try {
    const db = await dbConnection();
    const collection = db.collection("userData");
    const id = req.params.id;
    const objectId = new ObjectId(id);

    console.log(req.params.id);
    console.log(objectId);

    const result = await collection.deleteOne({ _id: objectId });
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Error in deleting data from DB" });
  }
};

module.exports = {
  getData,
  postData,
  putData,
  deleteData,
};
