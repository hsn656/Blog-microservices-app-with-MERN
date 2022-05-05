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
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[id] = comments;

  const event = {
    type: "CommentCreated",
    data: { id: commentId, content, postId: id, status: "pending" },
  };
  await axios.post("http://localhost:4005/events", event);

  res.status(201).json(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  console.log("recieved event:", type);

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((c) => c.id === id);
    comment.status = status;
    const event = {
      type: "CommentUpdated",
      data,
    };
    await axios.post("http://localhost:4005/events", event);
  }
  res.send(200);
});

app.listen(4001, () => {
  console.log("comments server is listening on 4001");
});
