import React, { useState } from "react";
import "./Pagination.css";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const [hover, setHover] = useState({
    left: false,
    right: false,
  });
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  function handlePagination(number) {
    paginate(number);
  }

  return (
    <nav>
      <ul className="pagination">
        <ArrowLeftIcon
          fontSize="large"
          onMouseEnter={() => setHover({ left: true })}
          onMouseLeave={() => setHover({ left: false })}
          style={{ color: hover.left ? "rgba(119, 62, 43, 0.5)" : "white" }}
        />
        {pageNumbers.map((number) => {
          return (
            <li key={number} className="page-item">
              <a className="page-link" onClick={() => handlePagination(number)}>
                {number}
              </a>
            </li>
          );
        })}
        <ArrowRightIcon
          fontSize="large"
          onMouseEnter={() => setHover({ right: true })}
          onMouseLeave={() => setHover({ right: false })}
          style={{ color: hover.right ? "rgba(119, 62, 43, 0.5)" : "white" }}
          onClick={() => paginate()}
        />
      </ul>
    </nav>
  );
};

export default Pagination;
