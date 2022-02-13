import React, { useState, useEffect, useRef } from "react";
import "./HomePage.css";
import Header from "../../components/Header/Header";
import Card from "../../components/Carousel/Card";
import axios from "axios";
import Verticalinfo from "../../components/Info/Vertical/Verticalinfo";
import HorizontalInfo from "../../components/Info/Horizontal/HorizontalInfo";

function HomePage() {
  const [popCoffee, setPopCoffee] = useState([]);
  const [animation, setAnimation] = useState({
    info: false,
    popular: false,
  });
  const [mobile, setMobile] = useState(false);

  const height = window.innerHeight;
  const width = window.innerWidth;

  function checkIfInView() {
    if (window.pageYOffset > height / 100 && window.pageYOffset < 2 * height) {
      setAnimation({
        info: true,
      });
    }
  }

  function checkScreenWidth() {
    if (width < 699) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  function getPopCoffee() {
    axios.get("http://localhost:8080/popularCoffees").then((res) => {
      setPopCoffee(res.data);
    });
  }

  useEffect(() => {
    getPopCoffee();
    checkScreenWidth();
    window.addEventListener("scroll", checkIfInView);

    return () => window.removeEventListener("scroll", checkIfInView);
  }, []);

  return (
    <div>
      <Header />
      <section className="businessInfo">
        <span className={animation.info ? "infoText" : "infoTextHidden"}>
          <span>
            <h1>Freshly made</h1>
            <p>Every coffee ordered will be made fresh.</p>
          </span>
          <span>
            <h1>High-End Technology</h1>
            <p>All brewing tools used are of the highest quality</p>
          </span>
          <span>
            <h1>Money-back guarantee</h1>
            <p>
              Not satisfied? <a href="/">Let us know</a>, and get a cup for
              free!
            </p>
          </span>
        </span>
      </section>
      <section className={mobile ? "infoTextHidden" : "popularProducts"}>
        <h1>Popular Products</h1>
        <div className="slides">
          {popCoffee.map((item) => {
            return (
              <Card
                key={item.product}
                products={item}
                style={{ margin: "0 50px" }}
              />
            );
          })}
        </div>
      </section>
      <section className="customersChoice">
        <span className="imgLeftChoice">
          <img src="https://m.media-amazon.com/images/I/81DLJc5I5XL._SL1280_.jpg" />
        </span>
        {mobile ? (
          <HorizontalInfo
            title="Coffee type"
            infoTitle="What is your favorite?"
            text="Everyone has their favorite brand of coffee, and wheter you like nespresso, evergood or any other brand, you choose which brand is used when you order a coffee"
          />
        ) : (
          <Verticalinfo
            title="Coffee type"
            infoTitle="What is your favorite?"
            text="Everyone has their favorite brand of coffee, and wheter you like nespresso, evergood or any other brand, you choose which brand is used when you order a coffee"
          />
        )}
      </section>
    </div>
  );
}

export default HomePage;
