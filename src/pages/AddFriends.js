import React, { useEffect, useState } from "react";
import { getData, saveData } from "../utils/storage";
import "../css/AddFriends.css"; // 👈 Import separate CSS file

const AddFriends = () => {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setFriends(getData("friends"));
    setTransactions(getData("transactions"));
  }, []);

  const handleAdd = () => {
    const trimmed = newFriend.trim();

    // Validation
    if (!trimmed) {
      setError("Friend name cannot be empty.");
      return;
    }
    if (!/^[a-zA-Z\s]+$/.test(trimmed)) {
      setError("Invalid input! Only letters and spaces allowed.");
      return;
    }
    if (friends.includes(trimmed)) {
      setError("This friend already exists.");
      return;
    }

    // ✅ Add friend
    const updated = [...friends, trimmed];
    setFriends(updated);
    saveData("friends", updated);
    setNewFriend("");
    setError(""); // clear error
  };

  const handleDelete = (friend) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove ${friend}? This will also remove their transactions.`
    );
    if (!confirmDelete) return;

    const updatedFriends = friends.filter((f) => f !== friend);
    setFriends(updatedFriends);
    saveData("friends", updatedFriends);

    // remove friend transactions also
    const updatedTransactions = transactions.filter((t) => t.friend !== friend);
    setTransactions(updatedTransactions);
    saveData("transactions", updatedTransactions);
  };

  // Outstanding = (borrowed - paid)
  const calculateOutstanding = (friend) => {
    let total = 0;
    transactions.forEach((t) => {
      if (t.friend === friend) {
        total += parseFloat(t.amount);
      }
    });
    return total.toFixed(2);
  };

  return (
    <div className="add-friends-page">
      <h2>Manage Friends</h2>

      {/* Add friend form */}
      <div className="add-friend-card">
        <h3>Add a New Friend</h3>
        <div className="form-row">
          <input
            type="text"
            value={newFriend}
            onChange={(e) => {
              setNewFriend(e.target.value);
              if (error) setError(""); // clear error while typing
            }}
            placeholder="Enter friend's name"
            className="friend-input"
          />
          <button className="btn-add" onClick={handleAdd}>
            + Add
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        <p className="form-hint">
          Tip: Add your flatmates, college friends, or trip buddies here!
        </p>
      </div>

      {/* Friends list */}
      <div className="friends-grid">
        {friends.length === 0 && <p>No friends added yet.</p>}
        {friends.map((f, i) => {
          const outstanding = calculateOutstanding(f);
          const isPositive = outstanding > 0;
          const isZero = outstanding === 0;

          return (
            <div key={i} className="friend-card">
              <div className="avatar">{f.charAt(0).toUpperCase()}</div>
              <div className="friend-info">
                <h3>{f}</h3>
                <p
                  className={`amount ${
                    isZero ? "settled" : isPositive ? "borrow" : "paid"
                  }`}
                >
                  {isZero
                    ? "All Settled 🎉"
                    : isPositive
                    ? `Owes ₹${outstanding}`
                    : `Advance ₹${Math.abs(outstanding)}`}
                </p>
              </div>
              <button className="btn-delete" onClick={() => handleDelete(f)}>
                Remove
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddFriends;
