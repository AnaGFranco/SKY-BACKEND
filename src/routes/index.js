const express = require("express")
const router = express.Router()

router.get("/", function(req, res) {
  res.status(200).send({
    title: "Test Backend Sky",
    version: "0.1.0"
  })
})

module.exports = router