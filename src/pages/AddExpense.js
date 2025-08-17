import React, { useState, useEffect } from "react";
import { getData, saveData } from "../utils/storage";
import '../css/AddExpense.css'

const AddExpense = () => {
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setFriends(getData("friends"));
    setTransactions(getData("transactions"));
  }, []);

  const toggleFriend = (friend) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter((f) => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleSubmit = () => {
    if (amount && selectedFriends.length > 0) {
      const splitAmount = (parseFloat(amount) / selectedFriends.length).toFixed(2);
      const newTransactions = selectedFriends.map((friend) => ({
        id: Date.now() + Math.random(),
        friend,
        amount: splitAmount,
        desc,
        type: "borrow", // mark as borrowed expense
        date: new Date().toLocaleString(),
      }));

      const updated = [...transactions, ...newTransactions];
      setTransactions(updated);
      saveData("transactions", updated);

      // Reset form
      setAmount("");
      setDesc("");
      setSelectedFriends([]);
      alert("Expense added successfully ✅");
    } else {
      alert("Please enter amount and select at least one friend.");
    }
  };

  return (
    <div className="page-container">
      <h2>Add Expense</h2>

      {/* Form Section */}
      <div className="form-section">
        <input
          type="number"
          placeholder="Enter amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          placeholder="Short description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <h3>Select Friends:</h3>
        <div className="friends-list">
          {friends.length === 0 && <p>No friends available. Please add from Friends page.</p>}
          {friends.map((f, i) => (
            <label key={i} className="friend-checkbox">
              <input
                type="checkbox"
                checked={selectedFriends.includes(f)}
                onChange={() => toggleFriend(f)}
              />
              {f}
            </label>
          ))}
        </div>

        <button onClick={handleSubmit}>Split & Save</button>
      </div>
    </div>
  );
};

export default AddExpense;
