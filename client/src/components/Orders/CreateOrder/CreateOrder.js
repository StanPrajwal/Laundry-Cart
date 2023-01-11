import { orderList } from "./CreateOrderList";
import React, { useState } from "react";
import "./CreateOrder.css";
import Summary from "../../Summary/Summary";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SuccessModal from "../../Modals/OrderSuccess/SuccessModal";

export default function CreateOrder(props) {
  const [orders, setOrders] = useState(new Map());
  const [price, setPrice] = useState(new Map());
  const [washType, getWashType] = useState({
    quantity: "",
    machineWash: "",
    iron: "",
    dry: "",
    chemical: "",
    id: "",
    count: 0,
  });
  const [reset, setReset] = useState(false);
  const [show, setShowSummary] = useState(false);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleOrderSubmit = function (e) {
    setShowSummary(false);
    setShowModal(true);
  };

  let storeAddress = [
    {
      location: "Jp Nagar",
      address: "Near Phone Booth, 10th road",
      city: "Delhi",
      phone: "9876543210",
    },
  ];

  let totalItems = 0,
    totalPrice = 90;
  data.forEach((e) => {
    totalItems += Number(e.quantity);
    totalPrice += Number(e.price);
  });

  const handleRedirect = function (e) {
    setShowModal(false);
    axios
      .post(
        `/orders/${props.userData._id}`,
        {
          order_id: `OR${Math.floor(1000 + Math.random() * 9000)}`,
          storeLocation: storeAddress[0].location,
          storeCity: storeAddress[0].city,
          storeAddress: storeAddress[0].address,
          storePhone: storeAddress[0].phone,
          totalItems: totalItems,
          order_status: "Ready to pickup",
          totalPrice: totalPrice,
          order_details: data,
          user: props.userData._id,
        },
        {
          headers: {
            Auth: props.token,
          },
        }
      )
      .then(() => {
        window.location.reload();
        navigate(`/orders/${props.userData._id}`, {
          state: {
            token: props.token,
          },
        });
      })
      .catch((err) => console.log(err.message));
  };

  function getMachineWash(e, itemId) {
    e.target.src = e.target.src.includes("Active")
      ? `/images/washIcons/washing-machine.png`
      : `/images/washIcons/washing-machineActive.png`;

    const temp = washType;
    temp.machineWash = e.target.alt;
    temp.id = itemId;
    temp.clouth = e.target.id;
    temp.count = temp.count + 1;

    if (!orders.has(itemId)) {
      orders.set(itemId, temp);
    } else {
      if (orders.get(itemId).machineWash === "") {
        const temp1 = orders.get(itemId);
        temp1.machineWash = temp.machineWash;
        temp1.count = temp1.count + 1;
        orders.set(itemId, temp1);
      } else {
        const temp1 = orders.get(itemId);
        temp1.count = temp1.count - 1;
        temp1.machineWash = "";
        orders.set(itemId, temp1);
      }
    }
    getWashType({
      quantity: "",
      machineWash: "",
      iron: "",
      dry: "",
      chemical: "",
      id: "",
      count: 0,
    });
    setReset(true);
  }
  const getChemicalWash = (e, itemId) => {
    e.target.src = e.target.src.includes("Active")
      ? `/images/washIcons/bleach.png`
      : `/images/washIcons/bleachActive.png`;
    const temp = washType;
    temp.chemical = e.target.alt;
    temp.id = itemId;
    temp.clouth = e.target.id;
    temp.count = temp.count + 1;

    if (!orders.has(itemId)) {
      orders.set(itemId, temp);
    } else {
      if (orders.get(itemId).chemical === "") {
        const temp1 = orders.get(itemId);
        temp1.chemical = temp.chemical;
        temp1.clouth = e.target.id;
        temp1.count = temp1.count + 1;
        orders.set(itemId, temp1);
      } else {
        const temp1 = orders.get(itemId);
        temp1.chemical = "";
        temp1.count = temp1.count - 1;
        orders.set(itemId, temp1);
      }
    }
    getWashType({
      quantity: "",
      machineWash: "",
      iron: "",
      dry: "",
      chemical: "",
      id: "",
      count: 0,
    });
  };
  const getdry = (e, itemId) => {
    e.target.src = e.target.src.includes("Active")
      ? `/images/washIcons/towel.png`
      : `/images/washIcons/towelActive.png`;
    const temp = washType;
    temp.dry = e.target.alt;
    temp.id = itemId;
    temp.clouth = e.target.id;
    temp.count = temp.count + 1;

    if (!orders.has(itemId)) {
      orders.set(itemId, temp);
    } else {
      if (orders.get(itemId).dry === "") {
        const temp1 = orders.get(itemId);
        temp1.dry = temp.dry;
        temp1.clouth = e.target.id;
        temp1.count = temp1.count + 1;
        orders.set(itemId, temp1);
      } else {
        const temp1 = orders.get(itemId);
        temp1.dry = "";
        temp1.count = temp1.count - 1;

        orders.set(itemId, temp1);
      }
    }
    getWashType({
      quantity: "",
      machineWash: "",
      iron: "",
      dry: "",
      chemical: "",
      id: "",
      count: 0,
      clouth: "",
    });
  };
  const getIron = (e, itemId) => {
    e.target.src = e.target.src.includes("Active")
      ? `/images/washIcons/ironing.png`
      : `/images/washIcons/ironingActive.png`;
    const temp = washType;
    temp.iron = e.target.alt;
    temp.id = itemId;
    temp.clouth = e.target.id;
    temp.count = temp.count + 1;

    if (!orders.has(itemId)) {
      orders.set(itemId, temp);
    } else {
      if (orders.get(itemId).iron === "") {
        const temp1 = orders.get(itemId);
        temp1.iron = temp.iron;
        temp1.clouth = e.target.id;
        temp1.count = temp1.count + 1;
        orders.set(itemId, temp1);
      } else {
        const temp1 = orders.get(itemId);
        temp1.iron = "";
        temp1.count = temp1.count - 1;

        orders.set(itemId, temp1);
      }
    }
    getWashType({
      quantity: "",
      machineWash: "",
      iron: "",
      dry: "",
      chemical: "",
      id: "",
      count: 0,
    });
  };
  const resethandler = (key) => {
    if (orders.has(key)) {
      setReset(!reset);
      orders.delete(key);
    }
  };
  const inputHandler = (e) => {
    let { name, value } = e.target;
    price.set(name, value);
  };

  const handleClose = () => setShowSummary(false);

  const submitHandler = () => {
    setShowSummary(true);
    const orderArray = [];

    for (let [k, v] of orders) {
      const temp = {
        productType: "",
        washNames: "",
        quantity: "",
        washCount: "",
        price: "",
        washTypeCost: "",
      };

      let clouths = v.clouth.split("=");

      temp.productType = clouths[0];
      temp.washTypeCost = clouths[1];
      temp.price =
        parseInt(v.count) *
        parseInt(clouths[1]) *
        parseInt(price.get(clouths[0]));
      temp.quantity = price.get(clouths[0]);
      temp.washCount = v.count;

      if (v.machineWash) {
        temp.washNames += v.machineWash + ",";
      }
      if (v.iron) {
        temp.washNames += v.iron + ",";
      }
      if (v.dry) {
        temp.washNames += v.dry + ",";
      }
      if (v.chemical) {
        temp.washNames += v.chemical;
      }
      orderArray.push(temp);
    }
    setData(orderArray);
  };

  return (
    <div>
      <div className="order-header">
        <div>Product Types</div>
        <div>Quantity</div>
        <div>Wash Type</div>
        <div>Price</div>
      </div>

      <div className="createOrder-container">
        {orderList.map((items, index) => {
          return (
            <div className="orderType-container" key={index}>
              <div className="product-container">
                <div className="image-container">
                  <img src={items.clothImage} alt="" />
                </div>
                <div className="details">
                  <p className="heading">{items.clothType}</p>
                  <p className="subHeading">{items.description}</p>
                </div>
              </div>
              <div className="input-container">
                <input
                  type="number"
                  onChange={inputHandler}
                  name={items.clothType}
                  id={items.id}
                />
              </div>
              <div className="wash-types">
                <div>
                  <img
                    src={`/images/washIcons/washing-machine.png`}
                    alt="Washing"
                    id={`${items.clothType}=${items.cost}`}
                    onClick={(e) => getMachineWash(e, items.id)}
                  />
                </div>
                <div>
                  <img
                    src={`/images/washIcons/ironing.png`}
                    alt="Ironing"
                    id={`${items.clothType}=${items.cost}`}
                    onClick={(e) => getIron(e, items.id)}
                  />
                </div>
                <div>
                  <img
                    src={`/images/washIcons/towel.png`}
                    alt="Dry"
                    id={`${items.clothType}=${items.cost}`}
                    onClick={(e) => getdry(e, items.id)}
                  />
                </div>
                <div>
                  <img
                    src={`/images/washIcons/bleach.png`}
                    alt="Chemical Wash"
                    id={`${items.clothType}=${items.cost}`}
                    onClick={(e) => getChemicalWash(e, items.id)}
                  />
                </div>
              </div>
              <div className="priceAndReset">
                <div className="price">
                  {price.get(items.clothType) && orders.get(items.id) ? (
                    <div>
                      <span className="individualSum">{`${parseInt(
                        price.get(items.clothType)
                      )} X ${orders.get(items.id).count * items.cost} =`}</span>
                      <span className="totalAmount">{`${
                        parseInt(price.get(items.clothType)) *
                        (orders.get(items.id).count * items.cost)
                      }`}</span>
                    </div>
                  ) : (
                    "--"
                  )}
                </div>
                <div>
                  {orders.get(items.id) ? (
                    <button onClick={() => resethandler(items.id)}>
                      Reset
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className="btn-container">
          <button className="btn cancel-btn" onClick={props.cancelhandler}>
            Cancel
          </button>
          <Button
            className="btn proceed-btn"
            variant="primary"
            onClick={submitHandler}
          >
            Procced
          </Button>
        </div>
      </div>
      <Summary
        show={show}
        handleClose={handleClose}
        handleOrderSubmit={handleOrderSubmit}
        data={data}
        userData={props.userData}
      />
      <SuccessModal
        show={showModal}
        handleRedirect={handleRedirect}
        onHide={() => setShowModal(false)}
      />
    </div>
  );
}
