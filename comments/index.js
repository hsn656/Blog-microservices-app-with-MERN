const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios").default;

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", async (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const id = req.params.id;
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;

  const event = {
    type: "CommentCreated",
    data: { id: commentId, content, postId: id },
  };
  await axios.post("http://localhost:4005/events", event);

  res.status(201).json(comments);
});

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("recieved event:", event.type);
  res.send(200);
});

app.listen(4001, () => {
  console.log("comments server is listening on 4001");
});
