import React from "react";
import AddItem from "./AddItem";
import RegisterForm from "./RegisterForm";

const Navbar = (props) => {
  return (
    <div>
      <nav className="navbar navbar-brand-center sticky-top navbar-expand-lg navbar-dark ">
        <div className="container">
          <a className="navbar-brand fs-2 text-light" href="/">
            AUCTIONAPP <i className="fa-solid fa-gavel"></i>
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
            <span className="">
              <i className="text-light fa-solid fa-circle-chevron-down fa-lg"></i>
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {props.user && (
                <li
                  className="nav-item"
                  data-bs-toggle="modal"
                  data-bs-target="#addModal"
                >
                  <a className="btn nav-link text-light">Add Item</a>
                </li>
              )}

              {!props.user && (
                <li
                  className="nav-item"
                  data-bs-toggle="modal"
                  data-bs-target="#registerModal"
                >
                  <a className="btn nav-link text-light">Register/Sign In</a>
                </li>
              )}

              {props.user && (
                <li className="nav-item">
                  <a className="btn nav-link text-light" href="/logout">
                    Log Out
                  </a>
                </li>
              )}
              {props.user && (
                <li className="nav-item">
                  <a className="btn nav-link text-light fw-bold">
                    Welcome {props.user.username}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* MODALS */}
      <RegisterForm />
      <AddItem loggedIn={props.user} />
    </div>
  );
};

export default Navbar;
