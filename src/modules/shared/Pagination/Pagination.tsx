import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {PaginationProps} from "../../Interfaces/Paginate";



const Pagination: React.FC<PaginationProps> = ({
    pageNumber,
    pageSize,
    totalItems,
    onPageSizeChange,
    label,
    handlePrev,
    handleNext,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="dark-text d-flex justify-content-end align-items-center px-4 py-3">
      {/* Left - Show per page */}
      <div
        className="d-flex align-items-center gap-2"
        style={{ marginRight: "2rem" }}
      >
        <span>Showing</span>
        <select
          className="form-select"
          style={{
            width: "70px",
            padding: "0.2rem 1rem",
            borderRadius: "1rem",
            cursor: "pointer",
          }}
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {[5, 10, 20, 30].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Center - Arrows + page info */}
      <div className="d-flex align-items-center gap-3 dark-text">
        <span className="d-flex align-items-center gap-2">
          <div className="dark-pagnaition-color" style={{ marginRight: "1rem" }}>
            {" "}
            of <strong>{totalItems }</strong> {label}
          </div>

          <span className="dark-pagnaition-color" >
            Page <strong>{pageNumber}</strong> of <strong>{totalPages}</strong>
          </span>

          <span></span>
        </span>

        <button
          className="btn btn-outline-secondary border-color  btn-sm dark-text"
          onClick={handlePrev}
          disabled={pageNumber === 1}
        >
          <FaArrowLeft className="dark-text" />
        </button>

        <button
          className="btn btn-outline-secondary border-color btn-sm dark-text"
          onClick={handleNext}
          disabled={pageNumber === totalPages}
        >
          <FaArrowRight className="dark-text" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
