import React, { useState } from "react";
import "./Card.css";

function Card({ products }) {
  const [hover, setHover] = useState(false);

  //Gets all information available about a specific product
  let { name, brand, image, price, type } = products;
  return (
    <div
      className="card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover
          ? `linear-gradient(rgba(04,04,04,0.5), rgba(04,04,04,0.5)), url(${image})`
          : `url(${image})`,
      }}
    >
      <div className="cardText">
        <h1>{type}</h1>
        {hover && (
          <div className="textHover">
            <h2>{name}</h2>
            <h2>Brand: {brand}</h2>
            <h3>Price: {parseFloat(price).toFixed(2)}$</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
