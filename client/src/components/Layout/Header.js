import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { message } from "antd";
import { UserOutlined } from "@ant-design/icons";
const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {  //this useEffect is used to get the user data from localstorage and set it to the state and then we can use it in the header
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);  //here we are setting the user data to the state
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light"> 
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" to="/">
              Expense Management
            </a>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <UserOutlined />
              <li className="nav-item">
                {" "}
                <p className="nav-link">{loginUser && loginUser.name}</p>{" "}  {/*here we are using the state to show the user name*/} 
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
