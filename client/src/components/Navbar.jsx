import React, { useState } from "react";
import LoginForm from "./LoginForm";

const Navbar = (props) => {
  // let loginClickHandler = () => {
  //   props.handleLoginClick();
  // };

  const [isShowLogin, setIsShowLogin] = useState(false);
  const handleLoginClick = () => {
    setIsShowLogin(!isShowLogin);
    console.log(isShowLogin);
  };

  // console.log("user:", props.user);

  return (
    <div>
      <nav className="navbar navbar-brand-center sticky-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand text-light" href="tel:+1-647-527-6411">
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
              {/* 
            {!props.user && (
              <li className="nav-item">
                <a className="nav-link text-light" href="#">
                  Register
                </a>
              </li>
            )} */}
              {/* <li
                className="nav-item"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                <a className="nav-link text-light" href="#">
                  modal
                </a>
              </li> */}
              {!props.user && (
                <li
                  className="nav-item"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  <a className="nav-link text-light" href="#">
                    Login/Register
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
              {props.user && (
                <li className="nav-item">
                  <a className="nav-link text-light fw-bold">
                    Welcome {props.user.username}
                  </a>
                </li>
              )}
              {/* {% endif %} */}
            </ul>
          </div>
        </div>
      </nav>
      {isShowLogin ? (
        <LoginForm isShowLogin={isShowLogin} closeHandler={handleLoginClick} />
      ) : null}
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#loginModal"
      >
        Launch demo modal
      </button> */}

      {/* modal login */}
      <div
        className="modal fade"
        id="loginModal"
        tabindex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title fw-bold" id="loginModalLabel">
                Log in or Sign Up to Bid
              </h6>
              {/* <h1>Login</h1> */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <h3>Welcome to the Auction</h3>

              <form action="/login" method="POST">
                <div className="form-group mt-4">
                  <label htmlFor="email">Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    placeholder=""
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder=""
                  />
                </div>
                <div className="d-grid gap-2 mt-4 mb-4">
                  <button type="submit" className="btn btn-outline-dark ">
                    Login
                  </button>
                </div>
              </form>

              {/* <hr /> */}

              <h6 className="line">
                <span>or</span>
              </h6>
              <div className="d-grid gap-2">
                <a
                  className="btn btn-outline-dark btn-google my-2"
                  href="http://localhost:3001/auth/google"
                  role="button"
                >
                  <i className="fab fa-google me-2"></i>
                  Continue with Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
