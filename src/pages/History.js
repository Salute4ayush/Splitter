import React, { useEffect, useState } from "react";
import { getData } from "../utils/storage";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(getData("transactions"));
  }, []);

  return (
    <div className="page-container">
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="history-list">
          {transactions
            .slice()
            .reverse()
            .map((t, i) => (
              <li
                key={i}
                className={`history-item ${
                  t.amount < 0 ? "paid" : "borrow"
                }`}
              >
                <div>
                  <strong>{t.friend}</strong>{" "}
                  {t.amount < 0
                    ? `paid ₹${Math.abs(t.amount)}`
                    : `borrowed ₹${t.amount}`}
                  <br />
                  <small>{t.description}</small>
                </div>
                <span className="date">{t.date}</span>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionHistory;
