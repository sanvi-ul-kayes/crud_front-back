const express = require("express");
const dbConnect = require("./config/dbConfig");
const cors = require("cors");
const dbModel = require("./todoSchema/dbModel");
const app = express();
app.use(express.json());
dbConnect();
app.use(cors());
app.post("/createTodo", async (req, res) => {
  let { task } = req.body;
  let createTodo = new dbModel({
    task: task,
  });
  await createTodo.save();
  res
    .status(201)
    .send({ Success: "Todo is created successfully", data: createTodo });
});

app.get("/readTodo", async (req, res) => {
  let readTodo = await dbModel.find({});
  res.status(201).send({ Msg: "Data patches successfully", data: readTodo });
});

app.delete("/deleteTodo/:id", async (req, res) => {
  let { id } = req.params;
  let deleteTodo = await dbModel.findOneAndDelete({ _id: id });
  res
    .status(201)
    .send({ Success: "Data deletes successfully", data: deleteTodo });
});
app.patch("/updateTodo/:id", async (req, res) => {
  let { id } = req.params;
  let { task } = req.body;
  let updateTodo = await dbModel.findOneAndUpdate(
    { _id: id },
    { task: task },
    { new: true }
  );
  res.status(201).send({ msg: "Todo updates successfully", updateTodo });
});
app.listen(3000, () => {
  console.log("Server is running");
});
