const express = require("express");
const { addtransaction, getalltransaction, edittransaction, deletetransaction } = require("../controllers/transactionController");

//router object
const router = express.Router();

router.post("/add-transaction", addtransaction);

router.post("/edit-transaction", edittransaction);

router.post("/delete-transaction", deletetransaction);

router.post("/get-transaction", getalltransaction);  
module.exports = router;