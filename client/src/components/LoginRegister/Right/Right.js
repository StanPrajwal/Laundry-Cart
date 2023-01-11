import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validator from "validator"
import "./Right.css";

export default function Right(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [error,setError] = useState(false)
  let headingText = props.isLogin ? "Sign In" : "Register";

  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();

    if(validator.isEmail(email) ||  validator.isMobilePhone(phone)){
      
      axios
        .post("/login", {
        userEmailOrPhone: email,
        password: password,
        }).then((res) => {
          navigate(`/orders/${res.data.user._id}`,{state: {token: res.data.toke}})
        }).catch((error) =>{
          alert("Invalid Email/Password");
          setError(true)
          });
    }else{
        setError(true)
    }
   
  };

  function onRegister(e) {
    e.preventDefault()
  

    if(validator.isEmail(email) && validator.isMobilePhone(phone)){
      
      setError(false)
      axios
      .post("/register", {
        name,
        email,
        password,
        phone,
        address: {
          state: props.state,
          district,
          area,
          pincode: pinCode,
        },
      })
      .then((res) => {
        navigate(`/orders/${res.data.user._id}`, {
          state: {
            token: res.data.token,
          },
        });
      })
      .catch((err) => alert("Invalid Credentials"));
    }else{
      setError(true)
    }
    
  }

  let signIn = (
    <form action="#" className="form" onSubmit={onLogin}>
      <h1 className="heading">{headingText}</h1>
      {error?<p id="error">Invalid Username or Password</p>:""}
      <div className="form-floating mb-3">
      
        <input
          value={email}
          className="form-control shadow-none"
          placeholder="Mobile / Email"
          autoComplete="off"
          name="userEmailorPhone"
          onChange={(e) => {
            setEmail(e.target.value);
            setError(false)
          }}
          required
        />
        <label>Mobile / Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control shadow-none"
          placeholder="Password"
          required
          autoComplete="off"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false)
          }}
        />
        <div className="image"></div>
        <label>Password</label>
        <Link className="text">Forget Password?</Link>
      </div>
      <div className="mb-3 text-center">
        <button className="btn">Sign In</button>
      </div>
    </form>
  );

  let registerPage = (
    <div>
      <h1 className="heading">{headingText}</h1>
      {error?<p id="error">Invalid Username or Password</p>:""}
      <form className="formDiv" onSubmit={onRegister}>
        <div className="register-container">
        <div className="form-floating">
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Name"
            required
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
          />
          <label>Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control shadow-none"
            placeholder="Email"
            required
            autoComplete="off"
            onChange={(e) =>{ setEmail(e.target.value) 
              setError(false)
            }}
          />
          <label>Email</label>
        </div>
        <div className="form-floating">
          <input
            type="tel"
            className="form-control shadow-none"
            placeholder="Phone"
            required
            autoComplete="off"
            maxLength="10"
            minLength="10"
            onChange={(e) =>{ setPhone(e.target.value)
              setError(false)
            }}
          />
          <label>Phone</label>
        </div>
        <div className="form-floating">
          <select
            defaultValue={"default"}
            className="form-select shadow-none"
            placeholder="State"
            onChange={props.handleStateChange}
            required
          >
            <option value="default">Select State</option>
            {props.stateData.map((e, index) => (
              <option key={index}>{e.state_name}</option>
            ))}
          </select>
          <label>State</label>
        </div>
        <div className="form-floating">
          <select
            defaultValue={"Default"}
            className="form-select shadow-none"
            placeholder="District"
            required
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="Default">Select District</option>
            {props.districtData.map((e, index) => (
              <option key={index}>{e.city_name}</option>
            ))}
          </select>
          <label>District</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Address"
            required
            autoComplete="off"
            onChange={(e) => setArea(e.target.value)}
          />
          <label>Address</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control shadow-none"
            placeholder="Pincode"
            required
            autoComplete="off"
            minLength="6"
            maxLength="6"
            onChange={(e) => setPinCode(e.target.value)}
          />
          <label>Pincode</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control shadow-none"
            placeholder="Password"
            required
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
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
  return <div className="right">{props.isLogin ? signIn : registerPage}</div>;
}
