import React, { useState } from "react";

const RegisterForm = (props) => {
  const [loginData, setLoginData] = useState("");
  const [registerData, setRegisterData] = useState("");

  // const [passcheck, setPasscheck] = useState(false);

  const registerChangeHandler = (event) => {
    let { name, value } = event.target;
    setRegisterData((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
  };

  const loginChangeHandler = (event) => {
    let { name, value } = event.target;
    setLoginData((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
    // console.log(loginData);
  };

  const registerHandler = (event) => {
    if (registerData.username && registerData.password) {
      if (registerData.password === registerData.passwordcheck) {
        console.log("passwords match");
        if (validateEmail) {
          console.log("email valid");
          let newUser = {
            username: registerData.username,
            password: registerData.password,
          };

          fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.log("Error:", error);
            });
        } else {
          alert("That is not a valid email, try again.");
          event.preventDefault();
        }
      } else {
        alert("Passwords do not match, please re-enter");
        event.preventDefault();
      }
    } else {
      alert("Please fill in both username and password(x2) to register");
      event.preventDefault();
    }
  };

  const loginHandler = (event) => {
    if (loginData.username && loginData.password) {
      fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else {
      alert("Please fill in both username and password to login");
      event.preventDefault();
    }
  };

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <div
      className="modal fade"
      id="registerModal"
      tabIndex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title fw-bold" id="registerModalLabel">
              Welcome to the Auction
            </h6>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <h6 className="text-center">Sign In</h6>

            <form onSubmit={loginHandler}>
              <div className="form-group">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder=""
                  onChange={loginChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder=""
                  onChange={loginChangeHandler}
                />
              </div>
              <div className="d-grid gap-2 mt-4 ">
                <button type="submit" className="btn btn-outline-dark ">
                  Sign In
                </button>
              </div>
            </form>
            <hr />

            <h6 className="text-center">Register</h6>

            <form onSubmit={registerHandler}>
              <div className="form-group ">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder=""
                  onChange={registerChangeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder=""
                  onChange={registerChangeHandler}
                />
                <label htmlFor="passwordcheck">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="passwordcheck"
                  placeholder=""
                  onChange={registerChangeHandler}
                />
              </div>
              <div className="d-grid gap-2 mt-4 mb-4">
                <button type="submit" className="btn btn-outline-dark ">
                  Create Account
                </button>
              </div>
            </form>

            <h6 className="line">
              <span>or</span>
            </h6>
            <div className="d-grid gap-2">
              <a
                className="btn btn-outline-dark btn-google my-2"
                href="/auth/google"
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
  );
};

export default RegisterForm;
