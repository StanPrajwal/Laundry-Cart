import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/LoginRegister/Login/Login";
import Register from "./components/LoginRegister/Register/Register";
import Orders from "./components/Orders/Orders";
// import { useEffect, useState } from "react";
// import axios from "axios";

function App() {
  // const [token, setToken] = useState("");

  // const configData = {
  //   headers: {
  //     Accept: "application/json",
  //     "api-token": `${process.env.REACT_APP_API}`,
  //     "user-email": "prajwal1927@gmail.com",
  //   },
  // };

  // useEffect(() => {
  //   axios
  //     .get("https://www.universal-tutorial.com/api/getaccesstoken", configData)
  //     .then((res) => {
  //       setToken(res.data.auth_token);
  //     })
  //     .catch((err) => err.message);
  // }, []);

  return (
    <div className="container-fluid App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders/:id" element={<Orders />} />
      </Routes>
    </div>
  );
}

export default App;
