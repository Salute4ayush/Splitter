import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setOpen(!open);

  return (
    <nav className="navbar">
      <div className="nav-logo">💸 Splitter</div>

      {/* Hamburger for mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/add-expense" ? "active" : ""}>
          <Link to="/add-expense">Add Expense</Link>
        </li>
        <li className={location.pathname === "/add-friends" ? "active" : ""}>
          <Link to="/add-friends">Friends</Link>
        </li>
        <li className={location.pathname === "/paid-amount" ? "active" : ""}>
          <Link to="/paid-amount">Paid Amount</Link>
        </li>
        {/* <li className={location.pathname === "/outstanding" ? "active" : ""}>
          <Link to="/outstanding">Outstanding</Link>
        </li> */}
        <li className={location.pathname === "/history" ? "active" : ""}>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
