import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import { FaCheck } from "react-icons/fa";
import "./Modal.css";

export default function SuccessModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      id="order-modal"
      backdrop="static"
    >
      <Modal.Body id="body">
        <div className="modal-body">
          <div className="logo">
            <FaCheck className="check"></FaCheck>
          </div>
          <div className="order-status">Your order is placed successfully.</div>
          <div className="order-description">
            You can track the delivery in the "Orders" section.
          </div>
          <Button className="modal-btn" onClick={props.handleRedirect}>
            Go to orders
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
