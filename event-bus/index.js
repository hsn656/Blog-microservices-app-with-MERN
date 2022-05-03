const express = require("express");
const axios = require("axios").default;

const app = express();

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  axios.post("http://localhost:4002/events", event);
});

app.listen(4005, () => {
  console.log("event-bus is listening on 4005");
});
