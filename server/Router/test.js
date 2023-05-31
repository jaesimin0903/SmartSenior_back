const express = require('express');
const router = express.Router();

router.get("/d", (req,res) =>{
    res.send({test:"hi"});
});

module.exports = router;

