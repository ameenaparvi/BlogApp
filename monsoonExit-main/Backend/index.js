const express = require("express");
const cors = require("cors");

const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());
//Write missing code here
require("./connection");
const BlogModel=require("./model");
//Write your POST API here
app.post("/add",async(req,res)=> {
  try {
    const newPost=new BlogModel(req.body);
    await newPost.save();
    res.status(201).send(newPost);
  } catch(error) {
    console.log(error);
  }
});
app.delete("/delete/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete post");
  }
});
app.put("/update/:id", async (req, res) => {
  try {
    console.log("Incoming UPDATE request for ID:", req.params.id);
    console.log("New data:", req.body);
    
    const updatedPost = await BlogModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!updatedPost) {
      return res.status(404).send("Post not found");
    }

    res.status(200).send(updatedPost);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Failed to update post");
  }
});

app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});
app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
