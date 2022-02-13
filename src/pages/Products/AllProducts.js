import React, { useState, useEffect } from "react";
import "./AllProducts.css";
import axios from "axios";
import Card from "../../components/Carousel/Card";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "../../components/Pagination/Pagination";

function AllProducts() {
  const [hover, setHover] = useState({
    filter: false,
  });

  const [products, setProducts] = useState([]);
  const [filterProd, setFilterProd] = useState([]);
  const [prices, setPrices] = useState([]);

  const [uNames, setUNames] = useState([]);

  const [showChecks, setShowChecks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(9);

  function getProducts() {
    axios.get("http://localhost:8080/allProducts").then((res) => {
      setProducts(res.data);
      setFilterProd(res.data);
    });
  }

  function getPrices() {
    axios.get("http://localhost:8080/getPrices").then((res) => {
      setPrices(res.data);
    });
  }

  function getUniqueNames() {
    axios.get("http://localhost:8080/uniqueNames").then((res) => {
      setUNames(res.data);
    });
  }
  function filterProducts(checkBox, checkBoxValue) {
    if (checkBox === true) {
      const tempFilteredProds = products.filter((product) => {
        return product.name.includes(checkBoxValue);
      });
      setFilterProd(tempFilteredProds);
    } else {
      setFilterProd(products);
    }
  }

  function searchFilterProducts(searchEntry) {
    const tempFilteredProds = products.filter((product) => {
      return product.name.toLowerCase().includes(searchEntry.toLowerCase());
    });
    setFilterProd(tempFilteredProds);
  }

  function filterByPrice(checkBox, checkBoxValue) {
    if (checkBox === true) {
      const tempFilteredProds = products.filter((product) => {
        return parseFloat(product.price).toFixed(2) === checkBoxValue;
      });
      setFilterProd(tempFilteredProds);
    } else {
      setFilterProd(products);
    }
  }

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    getProducts();
    getUniqueNames();
    getPrices();
  }, []);

  const indexOfLastProduct = currentPage * prodPerPage;
  const indexOfFirstProduct = indexOfLastProduct - prodPerPage;
  const currentProducts = filterProd.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  return (
    <div>
      <section className="allCoffees">
        <span className="selectionCoffees">
          <span className="selection">
            <div
              className="filterButton"
              onClick={() => setShowChecks(!showChecks)}
            >
              <h3>
                Coffees{" "}
                {showChecks ? (
                  <ArrowDropDownIcon className="filterButtonArrow" />
                ) : (
                  <ArrowRightIcon className="filterButtonArrow" />
                )}
              </h3>
            </div>

            {uNames.map((item) => {
              return (
                <div
                  className="filterChoice"
                  style={{
                    display: showChecks ? "block" : "none",
                    position: "relative",
                    backgroundColor: "white",
                    width: "300px",
                    margin: "0 auto",
                    borderBottom: "2px solid black",
                    padding: "5px 0",
                    color: "black",
                  }}
                >
                  <input
                    className="check"
                    type="checkbox"
                    value={item}
                    onChange={(e) =>
                      filterProducts(e.target.checked, e.target.value)
                    }
                  />
                  <label for="check">{item}</label>
                </div>
              );
            })}
            <span>
              <div
                className="filterButton"
                onClick={() => setShowPrice(!showPrice)}
              >
                <h3>
                  Price{" "}
                  {showPrice ? (
                    <ArrowDropDownIcon className="filterButtonArrow" />
                  ) : (
                    <ArrowRightIcon className="filterButtonArrow" />
                  )}
                </h3>
              </div>
              {prices.map((item) => {
                return (
                  <div
                    className={
                      showPrice ? "filterChoice" : "filterChoiceClosed"
                    }
                    style={{
                      display: showPrice ? "block" : "none",
                      position: "relative",
                      backgroundColor: "white",
                      width: "300px",
                      margin: "0 auto",
                      borderBottom: "2px solid black",
                      padding: "5px 0",
                      color: "black",
                    }}
                  >
                    <input
                      className="check"
                      type="checkbox"
                      value={parseFloat(item).toFixed(2)}
                      onChange={(e) =>
                        filterByPrice(e.target.checked, e.target.value)
                      }
                    />
                    <label for="check">{parseFloat(item).toFixed(2)}$</label>
                  </div>
                );
              })}
            </span>
          </span>
          <span className="coffees">
            <div className="search">
              <input
                type="text"
                placeholder="Search for coffees..."
                size="large"
                onChange={(e) => searchFilterProducts(e.target.value)}
                style={{
                  display: showSearch ? "block" : "none",
                }}
              />
              <SearchIcon
                style={{
                  marginRight: "50px",
                  fontSize: "50px",
                  backgroundColor: hover.filter
                    ? "rgba(255,255,255,0.4)"
                    : "transparent",
                  borderRadius: "50%",
                }}
                onMouseEnter={() => setHover({ filter: true })}
                onMouseLeave={() => setHover({ filter: false })}
                onClick={() => setShowSearch(!showSearch)}
              />
            </div>
            {currentProducts.map((item) => {
              return <Card products={item} />;
            })}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination
                productsPerPage={prodPerPage}
                totalProducts={filterProd.length}
                paginate={paginate}
              />
            </div>
          </span>
        </span>
      </section>
    </div>
  );
}

export default AllProducts;
