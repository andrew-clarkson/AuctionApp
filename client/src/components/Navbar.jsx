import React, { useState } from "react";

const Navbar = (props) => {
  let loginClickHandler = () => {
    props.handleLoginClick();
  };

  // console.log("user:", props.user);

  return (
    <nav className="navbar navbar-brand-center sticky-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-light" href="tel:+1-905-640-6411">
          ### ### ####
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* {% if current_user.admin == 1: %} */}
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Add Item
              </a>
            </li>

            {!props.user && (
              <li className="nav-item">
                <a className="nav-link text-light" href="#">
                  Register
                </a>
              </li>
            )}

            {!props.user && (
              <li onClick={loginClickHandler} className="nav-item">
                <a className="nav-link text-light" href="#">
                  Login
                </a>
              </li>
            )}

            {props.user && (
              <li className="nav-item">
                <a
                  className="nav-link text-light"
                  href="http://localhost:3001/logout"
                >
                  Log Out
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link text-light fw-bold">
                {props.user && `Welcome ${props.user.username}`}
              </a>
            </li>
            {/* {% endif %} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
