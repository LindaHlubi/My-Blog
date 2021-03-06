import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../scss/globals.scss";

const SideBar = () => {
  const history = useHistory();
  //context
  const { logout, state } = useContext(AuthContext);
  const { user } = state;
  const handleLogout = e => {
    e.preventDefault();
    logout();
    history.push("/");
  };
  return (
    <div className="sideBar">
      <h2 className="name">Hi, {user.name || "Admin"}</h2>
      <hr />
      <ul className="links">
        <li>
          <Link to="/admin/dashboard/main">My Dashboard</Link>{" "}
        </li>
        <li>
          <Link to="/admin/dashboard/blogs">Blogs</Link>{" "}
        </li>
        <li>
          <Link to="/admin/dashboard/addBlog">Add a Blog Post</Link>{" "}
        </li>
        <li>
          <Link to="/admin/dashboard/forms">Received Contact Forms</Link>
        </li>
        <li>
          <a href="/" target="_blank">
            Home page
          </a>
        </li>
        <li>
          <a href="/" onClick={handleLogout}>
            Sign OUT
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
