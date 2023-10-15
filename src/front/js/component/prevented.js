import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Prevented = (event) => {
  const { store, action } = useContext(Context);
  const navigate = useNavigate();
  if (!store.token)
    return (
      <div>
        <h2>please log in back</h2>
        <Link to="/" relative="path">
          Click here to go back to log in page
        </Link>
      </div>
    );
  return (
    <div className="profile">
      <div className="text">
        <h1>Hello User</h1>
      </div>
      <nav className="navbar navbar-light bg-light">
        <button
          className="navbar-brand"
          onClick={() => {
            store.navigate = undefined;
            sessionStorage.removeItem("token");
            navigate("/");
            console.log("token removed");
          }}
        >
          LogOut
        </button>
      </nav>
    </div>
  );
};
