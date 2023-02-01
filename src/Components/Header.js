import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg header-fixed">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              className="ms-1"
              width={window.innerWidth < 500 ? 60 : 80}
              src="assets/images/walletZilla_logo.png"
              alt=""
            />
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
            <span className="navbar-toggler-icon">
              <img src="assets/images/svg/menu.svg" alt="" />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item header-buttons">
                <Link
                  className="nav-link active text-white text-center"
                  aria-current="page"
                  to="/Dashboard"
                >
                  Signin
                </Link>
              </li>
              <li className="nav-item header-buttons">
                <a
                  className="nav-link text-white text-center"
                  href="..\..\../Walletzilla.pdf"
                  target="_blank"
                >
                  Download Plan
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
