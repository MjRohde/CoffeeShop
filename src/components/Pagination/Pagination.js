import React, { useState } from "react";
import "./Pagination.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import IconButton from "@mui/material/IconButton";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const [active, setActive] = useState(1);
  const [hover, setHover] = useState({
    left: false,
    right: false,
  });
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  function handlePagination(number) {
    setActive(number);
    paginate(number);
  }

  return (
    <nav>
      <ul className="pagination">
        <IconButton
          className="arrowLeft"
          disabled={active <= 1 ? true : false}
          onClick={(e) => handlePagination(active - 1)}
        >
          <ArrowLeftIcon
            fontSize="large"
            onMouseEnter={() => setHover({ left: true })}
            onMouseLeave={() => setHover({ left: false })}
            style={{
              color: hover.left
                ? "rgba(119, 62, 43, 0.5)"
                : "white" && active <= 1
                ? "grey"
                : "white",
            }}
          />
        </IconButton>

        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              <a
                className={active == number ? "page-link active" : "page-link"}
                onClick={(e) => handlePagination(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
        <IconButton
          className="arrowRight"
          disabled={active == pageNumbers.length ? true : false}
          onClick={(e) => handlePagination(active + 1)}
        >
          <ArrowRightIcon
            fontSize="large"
            onMouseEnter={() => setHover({ right: true })}
            onMouseLeave={() => setHover({ right: false })}
            style={{
              color: hover.right
                ? "rgba(119, 62, 43, 0.5)"
                : "white" && active == pageNumbers.length
                ? "grey"
                : "white",
            }}
          />
        </IconButton>
      </ul>
    </nav>
  );
};

export default Pagination;
