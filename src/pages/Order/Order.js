import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

function Order() {
  const [cartItem, setCartItem] = useLocalStorage("cart", []);
  const [local, setLocal] = useState([]);

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

  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      if (typeof window === undefined) {
        return initialValue;
      }

      try {
        const item = window.localStorage.getItem(key);

        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        console.log(error);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.log(error);
      }
    };
    return [storedValue, setValue];
  }

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
