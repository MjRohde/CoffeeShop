import React, { useState, useEffect } from "react";
import "./AllProducts.css";
import axios from "axios";
import Card from "../../components/Carousel/Card";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
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

  const [showFilter, setShowFilter] = useState(false);
  const [showChecks, setShowChecks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(9);

  const getProducts = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:8080/allProducts");
    setProducts(res.data);
    setFilterProd(res.data);
    setLoading(false);
  };

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
        return product.type.includes(checkBoxValue);
      });
      setFilterProd(tempFilteredProds);
    } else {
      setFilterProd(products);
    }
  }

  function searchFilterProducts(searchEntry) {
    const tempFilteredProds = products.filter((product) => {
      return (
        product.type.toLowerCase().includes(searchEntry.toLowerCase()) ||
        product.name.toLowerCase().includes(searchEntry.toLowerCase())
      );
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
  const currentProducts =
    filterProd.length > 0
      ? filterProd.slice(indexOfFirstProduct, indexOfLastProduct)
      : products.slice(indexOfFirstProduct, indexOfLastProduct);
  return (
    <div>
      <section className="allCoffees">
        <span className="selectionCoffees">
          <span className="selection">
            <span className="filter" onClick={() => setShowFilter(!showFilter)}>
              <div className="filterButton">
                <h3>
                  Filter
                  {showFilter ? (
                    <ArrowDropUpIcon className="filterButtonArrow" />
                  ) : (
                    <ArrowRightIcon className="filterButtonArrow" />
                  )}
                </h3>
              </div>
            </span>
            {showFilter && (
              <span className="filterOptions">
                <div
                  className="filterButton unames"
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
                        key={item.id}
                        style={{ marginLeft: "5px" }}
                        onChange={(e) =>
                          filterProducts(e.target.checked, e.target.value)
                        }
                      />
                      <label htmlFor="check">{item}</label>
                    </div>
                  );
                })}
                <span>
                  <div
                    className="filterButton price"
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
                        className="filterChoice price"
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
                          key={item.id}
                          style={{ marginLeft: "5px" }}
                          onChange={(e) =>
                            filterByPrice(e.target.checked, e.target.value)
                          }
                        />
                        <label htmlFor="check">
                          {parseFloat(item).toFixed(2)}$
                        </label>
                      </div>
                    );
                  })}
                </span>
              </span>
            )}
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
                  marginTop: "30px",
                  padding: "10px",
                }}
              />
              <SearchIcon
                className="searchIcon"
                style={{
                  marginRight: "10px",
                  marginTop: "30px",
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
            {loading && (
              <div className="dots">
                <div className="dot first"></div>
                <div className="dot second"></div>
                <div className="dot third"></div>
              </div>
            )}
            {currentProducts.map((item) => {
              return (
                <a className="linkIndProduct" href={`/products/${item.name}`}>
                  <Card key={item.id} products={item} />
                </a>
              );
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
