import { useState } from "react";
import { IconChevronLeft, IconChevronRight } from "@components/Icons";

const Pagination = ({ data }: any) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  return (
    <>
      <ul className="sm:p-4 p-2 space-y-1 list-disc list-inside">
        {data
          .slice(
            currentPage * itemsPerPage,
            currentPage * itemsPerPage + itemsPerPage
          )
          .map((item: any) => (
            <li key={item}>{item}</li>
          ))}
      </ul>
      {data.length > itemsPerPage && (
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            onClick={() => {
              if (currentPage > 0) {
                setCurrentPage(currentPage - 1);
              }
            }}
            disabled={currentPage === 0}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconChevronLeft />
          </button>

          <span className="text-sm font-semibold">
            {currentPage + 1} / {Math.ceil(data.length / itemsPerPage)}
          </span>

          <button
            onClick={() => {
              if (currentPage < Math.ceil(data.length / itemsPerPage) - 1) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage >= Math.ceil(data.length / itemsPerPage) - 1}
            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <IconChevronRight />
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
