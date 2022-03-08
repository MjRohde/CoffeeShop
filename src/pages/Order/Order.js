import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import useLocalStorage from "../../components/useLocalStorage/useLocalStorage";
import DeleteIcon from "@mui/icons-material/Delete";

function Order() {
  const [cartItem, setCartItem] = useLocalStorage("cart", []);
  const [local, setLocal] = useState([]);

  /* Sends the localStorage cart items to the express server. This is not the secure way to do it, since the price
    is stored in the client and sent to the server, but it works for this little project*/
  const sendLocal = async () => {
    setLocal(JSON.parse(localStorage.getItem("cart")));
    await axios
      .post("http://localhost:3001/send-item-details", {
        local,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    sendLocal();
  }, []);

  return (
    <div className="orderContainer">
      <Helmet>
        <script
          src="http://localhost:3000/script.js"
          type="text/javascript"
        ></script>
      </Helmet>
      <div className="cartItems">
        {cartItem.map((item) => {
          return (
            <div className="cartItem" key={item.id}>
              <span>
                <img src={item.image} />
              </span>
              <span>{item.type}</span>
              <span>{item.name}</span>
              <span>{item.coffeeType}</span>
              <span>{item.size}</span>
              <span>{item.quantity}</span>
              <span>
                {item.price}
                <DeleteIcon
                  fontSize="large"
                  style={{
                    marginLeft: "20px",
                  }}
                />
              </span>
            </div>
          );
        })}
      </div>
      <button id="checkOutButton">Checkout</button>
    </div>
  );
}

export default Order;
