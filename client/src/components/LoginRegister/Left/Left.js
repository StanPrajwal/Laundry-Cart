import React from "react";
import { Link } from "react-router-dom";
import "./Left.css";

export default function Left(props) {
  let loginText = props.isLogin
    ? `Don’t Have An Account?`
    : `Already Have Account`;
  let btnText = props.isLogin ? "Register" : "Sign In";
  let linkRoute = props.isLogin ? "/register" : "/";
  return (
    <div className="left">
      <h1 className="heading">Laundry Service</h1>
      <p className="subHeading">Doorstep Wash & Dryclean Service</p>
      <p className="text">{loginText}</p>
      <Link to={linkRoute} className="btn">
        {btnText}
      </Link>
    </div>
  );
}
