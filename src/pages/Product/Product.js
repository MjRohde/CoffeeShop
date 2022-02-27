import React, { useState, useEffect } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import axios from "axios";

function Product() {
  const [product, setProduct] = useState({});
  let { name } = useParams();

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
      <div className="product"></div>
    </div>
  );
}

export default Product;
