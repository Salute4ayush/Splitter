import React, { useEffect, useState } from "react";
import { getData } from "../utils/storage";
import { Link } from "react-router-dom";

const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    setTransactions(getData("transactions"));
    setFriends(getData("friends"));
  }, []);

  // Calculate total outstanding
  const totalOutstanding = () => {
    let total = 0;
    transactions.forEach((t) => {
      total += parseFloat(t.amount);
    });
    return total.toFixed(2);
  };

  return (
    <div className="home-container">
      {/* Background Banner */}
      <div className="home-banner">
        <h1>💸 Splitter</h1>
        <p>Smart way to split money between friends</p>
      </div>

      {/* Total Bakaya Info */}
      <div className="summary-card">
        <h2>Total Bakaya</h2>
        <p className="summary-amount">₹{totalOutstanding()}</p>
        <span className="summary-sub">
          Across {friends.length} friend{friends.length !== 1 && "s"}
        </span>
      </div>

      {/* Feature Cards with Links */}
      <div className="features-grid">
        <Link to="/add-expense" className="feature-card">
          <h3>➕ Add Expense</h3>
          <p>Record shared expenses with friends</p>
        </Link>

        <Link to="/paid-amount" className="feature-card">
          <h3>💰 Paid Amount</h3>
          <p>Update repayments and track cleared dues</p>
        </Link>

        <Link to="/friends" className="feature-card">
          <h3>👥 Friends</h3>
          <p>Manage friends and their outstanding balances</p>
        </Link>

        <Link to="/history" className="feature-card">
          <h3>📜 History</h3>
          <p>See complete borrow & paid transactions</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
