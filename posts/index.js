const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios").default;

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  const event = { type: "PostCreated", data: posts[id] };
  await axios.post("http://localhost:4005/events", event);
  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  const event = req.body;

  console.log("recieved event:", event.type);
  res.send(200);
});

app.listen(4000, () => {
  console.log("posts server is listening on 4000");
});
