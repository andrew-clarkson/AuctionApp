import React, { useState } from "react";

const loginForm = (props) => {
  const [data, setData] = useState();
  const changeHandler = (event) => {
    let { name, value } = event.target;
    setData((prevItem) => {
      return {
        ...prevItem,
        [name]: value,
      };
    });
    // console.log(data);
  };

  const loginHandler = () => {
    let data = {
      email: data.username,
      password: data.password,
    };

    // fetch("/login", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   });
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title fw-bold" id="loginModalLabel">
              Welcome to the Auction
            </h6>
            {/* <h1>login</h1> */}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            {/* <h3>Sign in or Login to Bid</h3> */}
            <h6>
              New Here?
              <a
                data-bs-dismiss="modal"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
                className="close"
                href="#"
              >
                Create an account here.
              </a>
            </h6>

            <form onSubmit={loginHandler} method="POST">
              <div className="form-group mt-4">
                <label htmlFor="email">Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="username"
                  placeholder=""
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder=""
                  onChange={changeHandler}
                />
              </div>
              <div className="d-grid gap-2 mt-4 mb-4">
                <button type="submit" className="btn btn-outline-dark ">
                  Sign In
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

export default LoginForm;
