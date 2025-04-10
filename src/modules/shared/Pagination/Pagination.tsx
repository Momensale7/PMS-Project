import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    onPageSizeChange: (newSize: number) => void;
    label: string;
    handlePrev: () => void;
    handleNext: () => void;
}

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
        <div className="d-flex justify-content-between align-items-center px-4 py-3">
            {/* Left - Show per page */}
            <div className="d-flex align-items-center gap-2">
                <span>Show:</span>
                <select
                    className="form-select"
                    style={{ width: "70px" }}
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
        <div className="d-flex align-items-center gap-3">
            <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handlePrev}
                disabled={pageNumber === 1}
            >
                <FaArrowLeft />
            </button>

            <span>
            Page <strong>{pageNumber}{totalPages}</strong> |
            Showing <strong>{(pageNumber - 1) * pageSize + 1}</strong> to{" "}
            <strong>
                {pageNumber * pageSize > totalItems
                ? totalItems
                : pageNumber * pageSize}
            </strong>
            of <strong>{totalItems}</strong> {label}
            </span>

            <button
            className="btn btn-outline-secondary btn-sm"
            onClick={handleNext}
            disabled={pageNumber === totalPages}
            >
            <FaArrowRight />
            </button>
        </div>
        </div>
    );
};

export default Pagination;
