import React, { useEffect, useState } from "react";
import { getData } from "../utils/storage";

const Outstanding = () => {
  const [outstanding, setOutstanding] = useState({});

  useEffect(() => {
    const txs = getData("transactions") || [];
    const sum = {};

    txs.forEach((t) => {
      const amount = Number(t.amount) || 0; // ✅ ensure it's a number
      sum[t.friend] = (sum[t.friend] || 0) + amount;
    });

    setOutstanding(sum);
  }, []);

  return (
    <div className="page-container">
      <h2>Outstanding Balance</h2>
      {Object.entries(outstanding).map(([friend, amt]) => (
        <div key={friend} className="transaction-card">
          <span>{friend}</span>
          <span className={amt >= 0 ? "red" : "green"}>
            ₹{Number(amt).toFixed(2)}  {/* ✅ safely formatted */}
          </span>
        </div>
      ))}

      {Object.keys(outstanding).length === 0 && (
        <p>No outstanding balances yet.</p>
      )}
    </div>
  );
};

export default Outstanding;
