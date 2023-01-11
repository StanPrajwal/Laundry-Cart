import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import "./DeleteModal.css";
import Button from "react-bootstrap/esm/Button";

export default function DeleteModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      centered
      keyboard={false}
      id="delete"
    >
      <Modal.Header closeButton id="delete-header">
        <Modal.Title className="alert">Alert</Modal.Title>
      </Modal.Header>
      <Modal.Body id="delete-body">
        <div className="deleteModal-body">
          <div className="delete-logo">
            <FaExclamationTriangle className="exclamation"></FaExclamationTriangle>
          </div>
          <div className="delete-description">
            <div className="text">
              Are you sure want to cancel the order
              <span className="orderNo"> No: {`${props.id}`}</span>
            </div>
            <Button className="delete-btn" onClick={props.handleDelete}>
              Proceed
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
