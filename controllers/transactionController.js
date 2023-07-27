const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getalltransaction = async (req, res) => {  //we are using post request because we are sending data to backend and data we are sending is in body
    try {
        const { frequency, selectedDate, type } = req.body; //selectedDate is the date we are getting from frontend 
        const transactions = await transactionModel.find({
            ...(frequency !== "custom" ? {
                    date: {
                        $gt: moment().subtract(Number(frequency), "d").toDate(),  //moment().subtract(7, "d").toDate() means 7 days ago
                    },
                }
                : {
                    date: {
                        $gte: selectedDate[0],  //0 index is start date and 1 index is end date
                        $lte: selectedDate[1],
                    },
                }),
            userid: req.body.userid,
            ...(type !== "all" && { type }),
        });
        res.status(200).json(transactions);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const deletetransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndDelete({ _id: req.body.transacationId });  //req.body.transacationId means the data we are getting from frontend
        res.status(200).send("Transaction Deleted!");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const edittransaction = async (req, res) => {
    try {
        await transactionModel.findOneAndUpdate({ _id: req.body.transacationId },
            req.body.payload //
        );
        res.status(200).send("Edit Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

const addtransaction = async (req, res) => {
    try {
        const newtransaction = new transactionModel(req.body);
        await newtransaction.save();
        res.status(201).send("Transaction Created");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = {
    getalltransaction,
    addtransaction,
    edittransaction,
    deletetransaction,
};