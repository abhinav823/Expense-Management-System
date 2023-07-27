import React from "react";
import { Progress } from "antd";
const Analytics = ({ allTransaction }) => {  //allTransaction prop we are accessing from HomePage.js
    // category
    const categories = ["salary", "tip", "project", "food", "movie", "bills", "medical", "fee", "tax"];

    // total transaction
    const totalTransaction = allTransaction.length;

    const totalIncomeTransactions = allTransaction.filter(
        (transaction) => transaction.type === "income"
    );

    const totalExpenseTransactions = allTransaction.filter(
        (transaction) => transaction.type === "expense"
    );

    const totalIncomePercent = (totalIncomeTransactions.length / totalTransaction) * 100;

    const totalExpensePercent = (totalExpenseTransactions.length / totalTransaction) * 100;

    //total turnover
    const totalTurnover = allTransaction.reduce(
        (acc, transaction) => acc + transaction.amount,
        0 //acc is used to store the value of previous iteration
    );
    const totalIncomeTurnover = allTransaction.filter((transaction) => transaction.type === "income")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenseTurnover = allTransaction
        .filter((transaction) => transaction.type === "expense")
        .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;

    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;
    return (
        <>
            <div className="row m-3">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header"
                        >
                            <b>Total Transactions</b> : <b>{totalTransaction}</b>
                        </div>
                        <div className="card-body"
                        >
                            <h4 className="text-success">
                                Income : {totalIncomeTransactions.length}
                            </h4>
                            <h4 className="text-danger">
                                Expense : {totalExpenseTransactions.length}
                            </h4>
                            <div>
                                <Progress
                                    type="circle"
                                    strokeColor={"#87d068"}
                                    className="mx-4 mt-3"
                                    percent={totalIncomePercent.toFixed(0)}
                                />

                                <div>
                                    <Progress
                                        type="circle"
                                        strokeColor={"red"}
                                        className="mx-4 mt-3"
                                        percent={totalExpensePercent.toFixed(0)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-header"><b>Total Turnover : {totalTurnover}</b></div>
                        <div className="card-body">
                            <h4 className="text-success">Income : {totalIncomeTurnover}</h4>
                            <h4 className="text-danger">Expense : {totalExpenseTurnover}</h4>
                            <div>
                                <Progress
                                    type="circle"
                                    strokeColor={"#87d068"}
                                    className="mx-5 mt-3"
                                    percent={totalIncomeTurnoverPercent.toFixed(0)}
                                />
                                <div>
                                    <Progress
                                        type="circle"
                                        strokeColor={"red"}
                                        className="mx-5 mt-3"
                                        percent={totalExpenseTurnoverPercent.toFixed(0)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <h5 className="bg-dark p-2 text-light">Categorywise Income</h5>
                    {categories.map((category) => {
                        const amount = allTransaction.filter((transaction) =>
                            transaction.type === "income" &&
                            transaction.category === category
                        )
                            .reduce((acc, transaction) => acc + transaction.amount, 0);
                        return (
                            amount > 0 && (
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress
                                            percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                                        />
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
                <div className="col-md-3">
                    <h5 className="bg-warning p-2 text-light">Categorywise Expense</h5>
                    {categories.map((category) => {
                        const amount = allTransaction.filter((transaction) =>
                                transaction.type === "expense" &&
                                transaction.category === category
                            )
                            .reduce((acc, transaction) => acc + transaction.amount, 0);
                        return (
                            amount > 0 && (
                                <div className="card">
                                    <div className="card-body">
                                        <h5>{category}</h5>
                                        <Progress percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                                        />
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </div>

        </>
    );
};

export default Analytics;

