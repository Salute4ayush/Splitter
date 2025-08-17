import React, { useState, useEffect } from "react";
import { getData } from "../utils/storage";

const TransactionForm = ({ onAdd }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    setFriendsList(getData("friends"));
  }, []);

  const handleFriendSelect = (friend) => {
    if (selectedFriends.includes(friend)) {
      setSelectedFriends(selectedFriends.filter((f) => f !== friend));
    } else {
      setSelectedFriends([...selectedFriends, friend]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !description || !date || selectedFriends.length === 0) {
      alert("Please fill all fields and select at least one friend");
      return;
    }

    const splitAmount = parseFloat(amount) / selectedFriends.length;

    const transactions = selectedFriends.map((friend) => ({
      id: Date.now() + friend,
      friend,
      amount: splitAmount,
      description,
      date,
    }));

    onAdd(transactions);

    setAmount("");
    setDescription("");
    setDate("");
    setSelectedFriends([]);
  };

  return (
    <div className="form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        {/* Amount */}
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />

        {/* Description */}
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Pizza Party, Rent"
        />

        {/* Date */}
        <label>Date & Time</label>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Friends list */}
        <div className="friends-list">
          {friendsList.length === 0 && <p>No friends available. Add them first!</p>}
          {friendsList.map((friend, i) => (
            <label key={i} className="friend-item">
              <input
                type="checkbox"
                checked={selectedFriends.includes(friend)}
                onChange={() => handleFriendSelect(friend)}
              />
              {friend}
            </label>
          ))}
        </div>

        <button type="submit" className="btn-submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
