import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";


import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import {useForm} from "react-hook-form"
import "./Right.css";
import SingIn from "./SingIn";

export default function Right(props) {
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const registrSchema = yup.object().shape({
    name:yup.string().required(),
    email:yup.string().required().email(),
    password:yup.string().required().min(6).max(12),
    phone:yup.string().matches(phoneRegExp, 'Phone number is not valid').min(10).max(10),
    state: yup.string().required(),
    district:yup.string().required(),
    area:yup.string().required(),
    pincode:yup.string().required().min(6).max(6),
  })
  const {register,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(registrSchema)})
 
  let headingText = props.isLogin ? "Sign In" : "Register";

  const navigate = useNavigate();

  const onSubmit =(data)=>{
    console.log(data)
    axios.post("http://localhost:4000/register", {data})
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.error)
        console.log(err.response.data)});
  }

  

  let registerPage = (
    <div>
      <h1 className="heading">{headingText}</h1>
      
      <form className="formDiv" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-container">
        <div className="form-floating">
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Name"
            autoComplete="off"
            {...register("name")}
          />
          <label>Name</label>
          <p className="error">{errors.name?.message}</p>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control shadow-none"
            placeholder="Email"
            autoComplete="off"
            {...register("email")}
          />
          <label>Email</label>
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-floating">
          <input
            type="tel"
            className="form-control shadow-none"
            placeholder="Phone"
            autoComplete="off"
            {...register("phone")}
          />
          <label>Phone</label>
          <p className="error">{errors.phone?.message}</p>
        </div>
        <div className="form-floating">
          <select
           
            className="form-select shadow-none"
            placeholder="State"
            onChange={(e)=>props.handleStateChange(e)}
            {...register("state")}
          >
            {/* <option value="default">Select State</option> */}
            {props.stateData.map((e, index) => (
              <option key={index}>{e.state_name}</option>
            ))}
          </select>
          <label>State</label>
          <p className="error">{errors.state?.message}</p>
        </div>
        <div className="form-floating">
          <select
            defaultValue={"Default"}
            className="form-select shadow-none"
            placeholder="District"
            {...register("district")}
            
          >
            <option value="Default">Select District</option>
            {props.districtData.map((e, index) => (
              <option key={index}>{e.city_name}</option>
            ))}
          </select>
          <label>District</label>
          <p className="error">{errors.district?.message}</p>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Address"
            autoComplete="off"
            {...register("area")}
          />
          <label>Address</label>
          <p className="error">{errors.area?.message}</p>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Pincode"
            autoComplete="off"
            {...register("pincode")}
          />
          <label>Pincode</label>
          <p className="error">{errors.pincode?.message}</p>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control shadow-none"
            placeholder="Password"
          
            autoComplete="off"
            {...register("password")}
          />
          <label>Password</label>
          <p className="error">{errors.password?.message}</p>
        </div>
        <div className="mb-3 terms text-center">
          <input type="checkbox" className="form-check-input" required />
          <span className="terms-text">
            I agree to Terms & Condition receiving marketing and promotional
            materials
          </span>
          <div className="mb-3 text-center btnDiv">
            <button className="btn">Register</button>
          </div>
        </div>
        </div>
       
      </form>
    </div>
  );
  return <div className="right">{props.isLogin ? <SingIn headingText={headingText}/> : registerPage}</div>;
}
