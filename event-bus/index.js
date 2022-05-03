const express = require("express");
const axios = require("axios").default;
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
  // axios.post("http://localhost:4002/events", event);

  console.log("recieved event:", event.type);
  res.send(200);
});

app.listen(4005, () => {
  console.log("event-bus is listening on 4005");
});
