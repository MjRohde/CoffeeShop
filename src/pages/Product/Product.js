import React, { useState, useEffect } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import { Input } from "@mui/material";

function Product() {
  const [product, setProduct] = useState({});
  const [shoppingVisible, setShoppingVisible] = useState(false);
  const [click, setClick] = useState(false);
  //Uses the url parameter to get the name of the product that should be displayed.
  let { name } = useParams();

  //Uses the params to send the name of the product. The backend then returns the product.
  const loadProduct = async (name) => {
    axios.get("http://localhost:8080/getCoffee/" + name).then((response) => {
      setProduct(response.data[0]);
    });
  };

  /** Function to check if shopping cart icon is clicked or dragged, important because the entire
   * shopping cart should not be displayed when the icon is dragged.
   */
  function mouseIsDown() {
    let sc = document.getElementById("shoppingCart");
    let mouseDownTime;
    sc.addEventListener("mousedown", () => {
      mouseDownTime = new Date().getTime();
    });

    sc.addEventListener("mouseup", function () {
      const mouseUpTime = new Date().getTime(),
        timeDifference = mouseUpTime - mouseDownTime;
      timeDifference < 300 ? setClick(true) : setClick(false);
    });

    sc.removeEventListener("mousedown", () => {
      mouseDownTime = new Date().getTime();
    });

    sc.removeEventListener("mouseup", function () {
      const mouseUpTime = new Date().getTime(),
        timeDifference = mouseUpTime - mouseDownTime;
      timeDifference < 300 ? setClick(true) : setClick(false);
      console.log(timeDifference);
    });
  }

  useEffect(() => {
    loadProduct(name);
    mouseIsDown();
  }, []);
  return (
    <div className="productContainer">
      <header
        className="productImage"
        style={{
          backgroundImage: `linear-gradient(rgba(29, 38, 113, 0.7), rgba(195, 55, 100, 0.7)), url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>{product.name}</h1>
      </header>
      <div className="productDetails"></div>
      {/**Creates a draggable element in case it is in the way of any content the user want to see. */}
      <Draggable>
        <div className="shoppingCart" id="shoppingCart">
          <ShoppingCartIcon
            fontSize="large"
            style={{ color: "white" }}
            onClick={() => setShoppingVisible(!shoppingVisible)}
          />
        </div>
      </Draggable>
      {click && (
        <div
          className="shoppingCartContainer"
          style={{ height: shoppingVisible ? "90vh" : "0", width: "100vw" }}
        >
          <CloseIcon
            fontSize="large"
            style={{ position: "absolute", top: "5%", right: "5%" }}
            onClick={() => setShoppingVisible(false)}
          />
          <div className="cartItem">
            <span>
              <img src={product.image} />
            </span>
            <span>{product.type}</span>
            <span>{product.name}</span>
            <span>{product.brand}</span>
            <span>{product.price}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
