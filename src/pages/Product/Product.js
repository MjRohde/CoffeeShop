import React, { useState, useEffect } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Draggable from "react-draggable";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import useLocalStorage from "../../components/useLocalStorage/useLocalStorage";

function Product() {
  const [product, setProduct] = useState({});
  const [shoppingVisible, setShoppingVisible] = useState(false);
  const [click, setClick] = useState(false);
  const [coffeeTypes, setCoffeeTypes] = useState([]);
  const [cartItem, setCartItem] = useLocalStorage("cart", []);

  const [type, setType] = useState("Coffee Bros.,Medium Roast");
  const [size, setSize] = useState("Small");
  const [quantity, setQuantity] = useState("1");

  //Uses the url parameter to get the name of the product that should be displayed.
  let { name } = useParams();

  //Uses the params to send the name of the product. The backend then returns the product.
  const loadProduct = async (name) => {
    axios.get("http://localhost:8080/getCoffee/" + name).then((response) => {
      setProduct(response.data[0]);
    });
  };

  //Loads the different types of coffeebeans that can be chosen by the user
  const loadTypes = async () => {
    axios.get("http://localhost:8080/allCoffeeTypes").then((response) => {
      setCoffeeTypes(response.data);
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
      console.log("Time", timeDifference);
    });

    sc.removeEventListener("mousedown", () => {
      mouseDownTime = new Date().getTime();
    });

    sc.removeEventListener("mouseup", function () {
      const mouseUpTime = new Date().getTime(),
        timeDifference = mouseUpTime - mouseDownTime;
      timeDifference < 300 ? setClick(true) : setClick(false);
    });
  }

  /** Adds the product to the cart items hook, to later be added in localStorage */
  function addToCart() {
    let item = {
      id: product.id,
      name: product.name,
      type: product.type,
      image: product.image,
      coffeeType: type,
      size: size,
      quantity: quantity,
      //The price is converted to cents in order to make it work with stripe.js
      priceInCents: product.price * 100,
    };
    setCartItem([...cartItem, item]);
  }

  //Deletes an item from the cart in localStorage
  function deleteCartItem(productName) {
    let items = localStorage.getItem("cart");
    let element = items.split(",");
    var index = element.indexOf(productName);
    element.splice(index);
    console.log(localStorage.getItem("cart"));
  }

  useEffect(() => {
    loadProduct(name);
    mouseIsDown();
    loadTypes();
  }, []);

  return (
    <div className="productContainer">
      <header
        className="productImage"
        style={{
          backgroundImage: `linear-gradient(40deg, rgba(106,151,140,0.6) 40%, rgba(140, 100, 104, 0.6), rgba(152, 126, 103, 0.6)), url(${product.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>{product.name}</h1>
      </header>
      <div className="productDetails"></div>
      {/**Creates a draggable element in case it is in the way of any content the user want to see. */}
      <Draggable>
        <div
          className="shoppingCart"
          id="shoppingCart"
          data-testid="shoppingCart"
        >
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
                  {item.price} {" x" + item.quantity}
                  <DeleteIcon
                    fontSize="large"
                    style={{
                      marginLeft: "20px",
                    }}
                    onClick={() => deleteCartItem(item.product)}
                  />
                </span>
              </div>
            );
          })}
          <a
            href="/orders"
            className="buttonProd"
            style={{
              width: "fit-content",
              margin: "auto",
              textDecoration: "none",
            }}
          >
            Go To Cart
          </a>
        </div>
      )}
      <div className="prodInfo">
        <span className="prodInfoParts">
          <h2>Type: {product.type}</h2>
        </span>
        <span className="prodInfoParts">
          <h2>Choose Your Details:</h2>
          <div className="prodInfoSelect">
            <label htmlFor="types" className="prodInfoLabelTypes">
              Choose the coffee beans:
            </label>
            <select
              className="select types"
              onChange={(e) => setType(e.target.value)}
            >
              {coffeeTypes.map((type) => {
                return (
                  <option key={type.id} className="typesOptions">
                    {type.brand}, {type.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="prodInfoSelect">
            <label htmlFor="size" className="prodInfoLabelTypes">
              Size:
            </label>
            <select
              className="select size"
              onChange={(e) => setSize(e.target.value)}
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Big</option>
            </select>
          </div>
          <div className="prodInfoSelect">
            <label htmlFor="quantity" className="prodInfoLabelTypes">
              Quantity:
            </label>
            <select
              className="select quantity"
              onChange={(e) => setQuantity(e.target.value)}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
        </span>
      </div>
      <div className="prodInfoButton">
        <button className="buttonProd" onClick={() => addToCart()}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Product;
