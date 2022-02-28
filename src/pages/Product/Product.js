import React, { useState, useEffect } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Draggable from "react-draggable";

function Product() {
  const [product, setProduct] = useState({});
  //Uses the url parameter to get the name of the product that should be displayed.
  let { name } = useParams();

  //Uses the params to send the name of the product. The backend then returns the product.
  const loadProduct = async (name) => {
    axios.get("http://localhost:8080/getCoffee/" + name).then((response) => {
      setProduct(response.data[0]);
    });
  };

  useEffect(() => {
    loadProduct(name);
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
      {/**Creates a draggable element in case it is in the way of any content the user want to see. */}
      <Draggable>
        <div className="shoppingCart">
          <ShoppingCartIcon fontSize="large" style={{ color: "white" }} />
        </div>
      </Draggable>
    </div>
  );
}

export default Product;
