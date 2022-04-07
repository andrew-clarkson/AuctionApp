import React from "react";

const LoginForm = (props) => {
  return (
    <div id="main-holder" className="container mt-5 ">
      <h1>Login</h1>
      <h4 onClick={props.closeHandler}>Close window</h4>
      <div className="row">
        <div className="col">
          <div className="card border-0">
            <div className="card-body">
              <form action="/login" method="POST">
                <div className="form-group">
                  {/* <label htmlFor="email">Email</label> */}
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  {/* <label htmlFor="password">Password</label> */}
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="">
            <div className="">
              <a
                className="btn btn-block btn-google"
                href="http://localhost:3001/auth/google"
                role="button"
              >
                <i className="fab fa-google"></i>
                Sign In with Google
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
