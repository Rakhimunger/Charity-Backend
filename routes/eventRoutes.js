const express = require("express");
const router = express.Router();

const { createEvent, getAllEvents } = require("../controllers/EventController");


router.post("/", createEvent);

router.get("/", getAllEvents);

module.exports = router;