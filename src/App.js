import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import History from "./pages/History";
import PaidAmount from "./pages/PaidAmount";
import Outstanding from "./pages/Outstanding";
import AddFriends from "./pages/AddFriends";
import AddExpense from "./pages/AddExpense";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/history" element={<History />} />
        <Route path="/paid-amount" element={<PaidAmount />} />
        <Route path="/outstanding" element={<Outstanding />} />
        <Route path="/add-friends" element={<AddFriends />} />
      </Routes>
    </Router>
  );
}

export default App;
