import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Prevented = () => {
  const { store, action } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (store.token != undefined) navigate("/");
  }, []);
  if (!store.token) navigate("/");
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
