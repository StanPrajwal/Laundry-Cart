import React from "react";
import Table from "react-bootstrap/Table";
import "./DisplayOrdersList.css";
import { BsEye } from "react-icons/bs";

export const DisplayOrdersList = (props) => {
  return (
    <>
      <Table className="table table-striped hover">
        <thead className="thead" style={{ verticalAlign: "middle" }}>
          <tr>
            <th>Order Id</th>
            <th>Order Date & Time</th>
            <th>Store Location</th>
            <th>City</th>
            <th>Store Phone</th>
            <th>Total Items</th>
            <th>Price</th>
            <th>Status</th>
            <th></th>
            <th>View</th>
          </tr>
        </thead>
        <tbody className="table-row-style" style={{ verticalAlign: "middle" }}>
          {props?.data?.map((order, index) => (
            <tr key={index}>
              <td>{order?.order_id}</td>
              <td>
                {order?.order_date?.split("T").join(", ").split("Z").join("")}
              </td>
              <td>{order?.storeLocation}</td>
              <td>{order?.storeCity}</td>
              <td>+91 {order?.storePhone}</td>
              <td>{order?.totalItems}</td>
              <td className="orderPrice">{order?.totalPrice} Rs</td>
              <td>{order?.order_status}</td>

              <td>
                {order?.order_status === "Ready to pickup" ? (
                  <button
                    className="cancelOrderBtn"
                    onClick={() =>
                      props.handleModal(order?._id, order?.order_id)
                    }
                  >
                    Cancel Order
                  </button>
                ) : (
                  ""
                )}
              </td>

              <td>
                <BsEye
                  style={{ backgroundColor: "white", cursor: "pointer" }}
                  onClick={() => props.handleView(order?._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};
