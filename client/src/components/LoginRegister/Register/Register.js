import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import Left from "../Left/Left";
import Right from "../Right/Right";
import "./Register.css";

export default function Register(props) {
  const [stateData, setStateData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [state, setState] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${props.token}`,
      Accept: "application/json",
    },
  };

  function handleStateChange(e) {
    setState(e.target.value);
    axios
      .get(
        `https://www.universal-tutorial.com/api/cities/${e.target.value}`,
        config
      )
      .then((res) => setDistrictData(res.data));
  }

  useEffect(() => {
    axios
      .get("https://www.universal-tutorial.com/api/states/india", config)
      .then((res) => setStateData(res.data))
      .catch((err) => err.message);
  }, [props.token]);

  return (
    <div>
      <Header />
      <div className="register">
        <Left isLogin={false} />
        <Right
          isLogin={false}
          state={state}
          stateData={stateData}
          districtData={districtData}
          handleStateChange={handleStateChange}
        />
      </div>
      <Footer />
    </div>
  );
}
