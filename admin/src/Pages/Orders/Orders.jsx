import React from "react";
import "./Orders.css";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../../../frontend/src/assets/assets";
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(url + "/api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
      console.log(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="orders add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-item" key={order._id}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items
                  .map((item) => `${item.name} X ${item.quantity}`)
                  .join(", ")}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+","+order.address.zipcode}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
