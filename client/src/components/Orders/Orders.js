import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SideNav from "../SideNav/SideNav";
import { DisplayOrders } from "./DisplayOrders'/DisplayOrders/DisplayOrders";
import axios from "axios";
import "./Orders.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function Orders() {
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    axios
      .get(`/orders/${params.id}`, {
        headers: {
          Auth: location.state.token,
        },
      })
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => navigate("/"));

    axios.get(`/${params.id}`).then((res) => {
      setUserData(res.data);
    });
  }, []);

  return (
    <div className="orders">
      <Header isLogin={true} name={userData?.result?.name || ""} />
      <div className="main-section">
        <SideNav />
        <DisplayOrders
          data={data}
          id={params.id}
          userData={userData.result}
          token={userData.token}
        />
      </div>
      <Footer isLogin={true} />
    </div>
  );
}
