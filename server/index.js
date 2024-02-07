const express = require("express");
const app = express();
const portNum = 3001;
const { dbConnection } = require("./mongodb");
const router = require("./routes/routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(portNum, () => {
  console.log(`Server is running on port ${portNum}`);
});
