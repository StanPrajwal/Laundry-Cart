import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import DeleteModal from "../../../Modals/orderDelete/DeleteModal";
import Summary from "../../../Summary/Summary";
import CreateOrder from "../../CreateOrder/CreateOrder";
import { DisplayOrdersList } from "../DisplayOrdersList/DisplayOrdersList";
import "./DisplayOrders.css";

export const DisplayOrders = (props) => {
  const { data, id } = props;
  const [createOrder, setCreateOrder] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [_id, setId] = useState("");
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();
  let userData = data.filter((e) => e.user === id);

  const createButton = (
    <button className="btn ordersBtn" onClick={() => setCreateOrder(true)}>
      Create
    </button>
  );

  const cancelhandler = function () {
    setCreateOrder(false);
  };

  const handleModal = function (_id, id) {
    setShowSummary(false);
    setOrderId(id);
    setId(_id);
    setModalShow(true);
  };

  const handleView = function (e) {
    data.forEach((element) => {
      if (element._id === e) {
        setOrderData(element);
      }
    });
    setShowSummary(true);
  };

  const handleDelete = function () {
    axios
      .patch(
        `/orders/${id}`,
        {
          order_status: "Cancelled",
          id: _id,
        },
        {
          headers: {
            Auth: props.token,
          },
        }
      )
      .then(() => {
        window.location.reload();
        navigate(`/orders/${id}`, {
          state: {
            token: props.token,
          },
        });
      })
      .catch((err) => console.log(err.message));
  };

  const handleClose = () => setShowSummary(false);

  return (
    <div className="displayOrders">
      <div className="header">
        <div className="heading">
          {createOrder ? "Create Order" : `Orders | ${userData.length}`}
        </div>
        <div>
          <div className="searchSection">
            {userData.length ? createButton : ""}
            <div className="search">
              <img
                src={"/images/search.svg"}
                alt="search"
                className="searchLogo"
                style={{ color: "#1D377E" }}
              />
              <input type="search" className="form-control shadow-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="orders-section">
        {createOrder ? (
          <CreateOrder
            cancelhandler={cancelhandler}
            userData={props.userData}
            token={props.token}
          />
        ) : userData.length ? (
          <DisplayOrdersList
            data={userData}
            handleModal={handleModal}
            handleView={handleView}
          />
        ) : (
          <div className="noOrders">
            <p className="text">No Orders available</p>
            {createButton}
          </div>
        )}
        <DeleteModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          id={orderId}
          handleDelete={handleDelete}
        />
        <Summary
          show={showSummary}
          data={data}
          handleClose={handleClose}
          handleModal={handleModal}
          orderData={orderData}
          userData={props.userData}
        />
      </div>
    </div>
  );
};

