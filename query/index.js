const express = require("express");
const cors = require("cors");

const posts = {};
const app = express();
app.use(express.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId } = data;
    posts[postId].comments.push({ id, content });
  }
  res.send();
});

app.listen(4002, () => {
  console.log("query service is listening on 4002");
});
