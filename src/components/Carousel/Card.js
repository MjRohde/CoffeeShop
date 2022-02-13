import React from "react";
import "./Card.css";

function Card({ products }) {
  let { name, brand, image, price } = products;
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="cardImage"></div>
      <div className="cardText">
        <h1>{name}</h1>
        <h2>Brand: {brand}</h2>
        <h3>Price: {parseFloat(price).toFixed(2)}$</h3>
      </div>
    </div>
  );
}

export default Card;
