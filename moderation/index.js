const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const { content } = data;
    const status = content.includes("orange") ? "rejected" : "approved";
    const event = {
      type: "CommentModerated",
      data: { ...data, status },
    };
    await axios.post("http://localhost:4005/events", event);
  }
  res.send();
});

app.listen(4003, () => {
  console.log("moderation service is listening on 4003");
});
