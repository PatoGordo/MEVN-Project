const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

const uri =
  "mongodb+srv://sla:GYJpemnKsBXFolzH@patogordo.4g2iz.mongodb.net/mevn?retryWrites=true&w=majority";

const client = new MongoClient(uri);

var db;
var usersColletion;

async function connectToMongo() {
  const mongoClient = await client.connect();
  db = mongoClient.db();
  usersColletion = await db.collection("users");
}

connectToMongo();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/get", async (req, res) => {
  const users = await usersColletion.find({}).toArray();

  res.json({
    message: "Hello World",
    users,
  });
});

app.post("/set", (req, res) => {
  const { name, age, email } = req.body;

  const user = {
    name,
    age,
    email,
  };

  usersColletion.insertOne(user).then((result) => {
    console.log(result);
  });

  res.json({
    message: "Posted",
    user,
  });
});

app.listen(3001, () => {
  console.log("Server started!");
});
