import React, { useEffect, useState } from "react";
import { getData, saveData } from "../utils/storage";
import '../css/PaidAmount.css'


const PaidAmount = () => {
  const [friends, setFriends] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setFriends(getData("friends"));
    setTransactions(getData("transactions"));
  }, []);

  const handleDeposit = () => {
    if (!selectedFriend || !amount) return;

    const newTransaction = {
      friend: selectedFriend,
      amount: -Math.abs(parseFloat(amount)), // negative reduces bakaya
      description: description || `${selectedFriend} paid`,
      date: new Date().toLocaleString(),
    };

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveData("transactions", updatedTransactions);

    setSelectedFriend("");
    setAmount("");
    setDescription("");
  };

  return (
    <div className="page-container">
      <h2>Deposit / Paid Amount</h2>
      <div className="deposit-form">
        <select
          value={selectedFriend}
          onChange={(e) => setSelectedFriend(e.target.value)}
        >
          <option value="">Select Friend</option>
          {friends.map((f, i) => (
            <option key={i} value={f}>
              {f}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Short Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleDeposit}>Submit</button>
      </div>

      <h3>Recent Payments</h3>
      <ul className="history-list">
        {transactions
          .filter((t) => t.amount < 0)
          .slice(-5)
          .reverse()
          .map((t, i) => (
            <li key={i} className="history-item">
              <div>
                <strong>{t.friend}</strong> paid ₹{Math.abs(t.amount)} <br />
                <small>{t.description}</small>
              </div>
              <span className="date">{t.date}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PaidAmount;
