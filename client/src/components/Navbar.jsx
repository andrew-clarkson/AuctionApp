import React from "react";

const Navbar = () => {
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
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Admin
              </a>
            </li>
            {/* {% endif %} */}

            {/* {% if current_user.is_anonymous: %} */}
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Login
              </a>
            </li>
            {/* {% endif %} */}

            {/* {% if current_user.is_authenticated: %} */}
            <li className="nav-item">
              <a className="nav-link text-light" href="#">
                Log Out
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light fw-bold">Welcome name</a>
            </li>
            {/* {% endif %} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
