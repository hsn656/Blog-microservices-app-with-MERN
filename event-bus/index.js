const express = require("express");
const axios = require("axios").default;
const cors = require("cors");

const app = express();
const events = [];

app.use(cors());
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post("http://localhost:4000/events", event).catch((e) => {
    console.log(e.message);
  }); //posts service
  axios.post("http://localhost:4001/events", event).catch((e) => {
    console.log(e.message);
  }); //comments service
  axios.post("http://localhost:4002/events", event).catch((e) => {
    console.log(e.message);
  }); //query service
  axios.post("http://localhost:4003/events", event).catch((e) => {
    console.log(e.message);
  }); //moderation service

  console.log("recieved event:", event.type);
  res.send(200);
});
app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("event-bus is listening on 4005");
});
