import React from "react";
import "./Header.css";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  function handleRedirect() {
    navigate("/");
    window.location.reload();
  }
  return (
    <div className="nav">
      <span className="navbar-brand">Laundry</span>
      <ul>
        {props.isLogin ? (
          ""
        ) : (
          <li className="nav-item">
            <span className="nav-link">Home</span>
          </li>
        )}
        <li className="nav-item">
          <span className="nav-link">Pricing</span>
        </li>
        <li className="nav-item">
          <span className="nav-link">Career</span>
        </li>
        {props.isLogin ? (
          <li className="nav-item">
            <Dropdown className="dropdown nav-link active">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="userImage"
                className="dropdownImage"
              />
              <Dropdown.Toggle className="nav-link active">
                {props.name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdownMenu">
                <Link className="dropdownItem" onClick={handleRedirect}>
                  Logout
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        ) : (
          <li className="nav-item">
            <span className="nav-link active">Sign In</span>
          </li>
        )}
      </ul>
    </div>
  );
}
