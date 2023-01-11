import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Summary.css";

export default function Summary(props) {
  const [show, setShow] = useState(false);
  const [storeAddress, setStoreAddress] = useState("__");
  const [phone, setPhone] = useState("__");
  let addClass = show ? "confirm-button" : "confirm-button disabled";
  let total = 0;
  props.orderData
    ? props.orderData?.order_details?.forEach((e) => {
        total += Number(e.price);
      })
    : props.data.forEach((e) => {
        total += e.price;
      });

  let address = [
    {
      location: "Jp Nagar",
      address: "Near Phone Booth, 10th road",
      phone: "9876543210",
    },
  ];

  const handleSelect = function (e) {
    if (e.target.value.trim() !== "" && e.target.value !== "Store Location") {
      address.forEach((ele) => {
        if (ele.location === e.target.value) {
          setStoreAddress(`${ele.address}`);
          setPhone(`${ele.phone}`);
          setShow(true);
        }
      });
    } else {
      setStoreAddress(`__`);
      setPhone(`__`);
      setShow(false);
    }
  };
  return (
    <div className="summary">
      <Offcanvas
        show={props.show}
        placement="end"
        onHide={props.handleClose}
        id="offCanvas"
        backdrop="static"
      >
        <Offcanvas.Header closeButton id="header">
          <Offcanvas.Title className="heading">Summary</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body id="body">
          <div className="summary-section">
            <div className="store-address">
              {props.orderData ? (
                <div className="address">
                  <p className="heading">Store Location</p>
                  <p className="text">{address[0].location}</p>
                </div>
              ) : (
                <select
                  defaultValue={"Default"}
                  className=" select-address form-select shadow-none"
                  onChange={handleSelect}
                >
                  <option className="default" default="Default">
                    Store Location
                  </option>
                  {address.map((e, index) => (
                    <option key={index}>{e.location}</option>
                  ))}
                </select>
              )}
              <div className="address">
                <p className="heading">Store Address</p>
                <p className="text">
                  {props.orderData
                    ? props.orderData.storeAddress
                    : storeAddress}
                </p>
              </div>
              <div className="phone">
                <p className="heading">Phone</p>
                <p className="text">
                  {props.orderData ? props.orderData.storePhone : phone}
                </p>
              </div>
            </div>
            {props?.orderData ? (
              <div className="trackOrder">
                <div className="status">Picked Up</div>
                <ProgressBar now={0} id="progressBar" />
                <div className="status">Washed</div>
                <ProgressBar now={0} id="progressBar" />
                <div className="status">Ironed</div>
                <ProgressBar now={0} id="progressBar" />
                <div className="status">Delivered</div>
              </div>
            ) : (
              ""
            )}
            <div className="order-details">
              <div className="heading">Order Details</div>
              <ul className="order-lists">
                {props?.orderData
                  ? props?.orderData?.order_details?.map((e, index) => (
                      <li key={index}>
                        <div className="order-items">
                          <p className="product-type">{e.productType}</p>
                          <p className="wash-type">{e.washNames}</p>
                          <p className="items">
                            {`${e.quantity} X ${
                              Number(e.washCount) * Number(e.washTypeCost)
                            } =`}
                          </p>
                          <p className="price">{e.price}</p>
                        </div>
                      </li>
                    ))
                  : props.data?.map((e, index) => (
                      <li key={index}>
                        <div className="order-items">
                          <p className="product-type">{e.productType}</p>
                          <p className="wash-type">{e.washNames}</p>
                          <p className="items">
                            {`${e.quantity} X ${
                              Number(e.washCount) * Number(e.washTypeCost)
                            } =`}
                          </p>
                          <p className="price">{e.price}</p>
                        </div>
                      </li>
                    ))}
              </ul>
              <div className="sub-total">
                <div className="total">
                  <p className="text">Sub Total:</p>
                  <p className="amount">{total}</p>
                </div>
                <div className="charges">
                  <p className="text">Pickup Charges:</p>
                  <p className="amount">90</p>
                </div>
              </div>
              <div className="footer">
                <div className="total-price">
                  <p className="text">Total:</p>
                  <p className="price">Rs {total + 90}</p>
                </div>
              </div>
            </div>
            <div className="user-address">
              <div className="heading">Address</div>
              <div className="address-section">
                <div className="address">
                  <div className="heading">Home</div>
                  <div className="area">
                    {`${props?.userData?.address?.area}, ${props?.userData?.address?.district}`}
                  </div>
                  <img src="/images/tick.png" alt="selected" />
                </div>
                {props.orderData ? (
                  ""
                ) : (
                  <div className="add-address">
                    <div className="text">Add New</div>
                  </div>
                )}
              </div>
            </div>
            <div className="btn-div">
              {props.orderData ? (
                props.orderData.order_status === "Ready to pickup" ? (
                  <Button
                    className="btn btn-danger"
                    onClick={() =>
                      props.handleModal(
                        props.orderData._id,
                        props.orderData.order_id
                      )
                    }
                  >
                    Cancel Order
                  </Button>
                ) : (
                  ""
                )
              ) : (
                <Button className={addClass} onClick={props.handleOrderSubmit}>
                  Confirm
                </Button>
              )}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
