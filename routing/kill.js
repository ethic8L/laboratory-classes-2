const express = require('express'); 
const { getProcessLog } = require("../utils/logger");
const path = require('path');

const router = express.Router();    

router.get('/', (req, res) => {
    getProcessLog("Logout has been initiated, and the application will be closed.");
    res.status(200).send("Shutting down the application...");
    process.exit();
});

module.exports = router;