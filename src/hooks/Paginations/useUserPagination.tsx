import { useState } from "react";
//import useLedger from "../APIrequest/useLedger";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const useUserPagination = (
  initialPage = 1,
  searchValue: string,
  selectedFilter: string,
  users: any[],
  filterAll: boolean,
  isDatePicked?: boolean
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [postPerPage, setPostPerPage] = useState(5);
  // const { users } = useLedger();

  const [viewAll, setViewAll] = useState(false);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  //logic for filteration cut from legder under file
  console.log(searchValue, "for it");
  console.log(selectedFilter, "for the 2");
  console.log(users, "for users:");
  const filteredUsers =
    isDatePicked && !filterAll
      ? users?.slice(firstPostIndex, lastPostIndex)
      : filterAll
      ? users?.slice(firstPostIndex, lastPostIndex).filter(
          (users: any) =>
            users.user.firstName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            users.guestName.toLowerCase().includes(searchValue.toLowerCase()) ||
            users.fileOwnerEmail
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            users.file.paperLink
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            // users.guestName.toLowerCase().includes(searchValue.toLowerCase()) ||
            users.action.toLowerCase().includes(searchValue.toLowerCase())
          //.includes(selectedFilter.toLowerCase())
        )
      : users?.slice(firstPostIndex, lastPostIndex).filter(
          (user: any) =>
            user.user.firstName
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            user.fileOwnerEmail
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            user.guestName.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.file.paperLink
              .toLowerCase()
              .includes(searchValue.toLowerCase()) ||
            //user.guestName.toLowerCase().includes(searchValue.toLowerCase()) ||
            user.action.toLowerCase().includes(searchValue.toLowerCase())
          // .includes(selectedFilter.toLowerCase())
        );

  const currentPost = viewAll ? users : filteredUsers;

  const totalPages = Math.ceil(users.length / postPerPage);

  const setPage = (page: number) => {
    setCurrentPage(page);
  };
  console.log(currentPage, "the page");
  const prevButton = (
    <button
      title="Previous Page"
      onClick={() => setPage(currentPage - 1)}
      className="p-1 outline-none rounded-full bg-green-300 text-xs m-1 w-5 h-5 flex justify-center"
      disabled={currentPage <= 1}
    >
      <FaChevronLeft color="white" />
    </button>
  );

  const nextButton = (
    <button
      title="Next Page"
      onClick={() => setPage(currentPage + 1)}
      className="p-1 bg-green-300 outline-none font-extrabold rounded-full text-xs m-1 w-5 h-5 flex justify-center hover:text-white"
      disabled={currentPage >= totalPages}
    >
      <FaChevronRight color="white" />
    </button>
  );

  const viewAllButton = (
    <button
      title="View All"
      onClick={() => setViewAll(!viewAll)}
      className="p-1 outline-none rounded-full bg-blue-500 text-xs m-1 w-20 h-5 flex justify-center"
    >
      {viewAll ? "Paginate" : "View All"}
    </button>
  );

  let paginationButtons = [];

  if (totalPages <= 10) {
    paginationButtons = Array.from({ length: totalPages }, (_, index) => (
      <button
        title="click to navigate"
        onClick={() => setPage(index + 1)}
        className={`p-1 outline-none rounded-full bg-slate-100 text-xs m-1 w-5 h-5 flex justify-center align-middle items-center  ${
          currentPage === index + 1 ? "bg-slate-300" : ""
        }`}
        key={index}
      >
        {index + 1}
      </button>
    ));
  } else {
    const leftEllipsis = currentPage > 5;
    const rightEllipsis = totalPages - currentPage > 4;

    if (leftEllipsis) {
      paginationButtons.push(
        <button
          title="click to navigate"
          onClick={() => setPage(1)}
          className={`p-1 outline-none rounded-full bg-slate-100 text-xs m-1 w-5 h-5 flex justify-center align-middle items-center`}
          key={0}
        >
          1
        </button>
      );
      paginationButtons.push(<span className="p-1">...</span>);
    }

    for (let i = currentPage - 4; i <= currentPage + 4; i++) {
      if (i >= 1 && i <= totalPages) {
        paginationButtons.push(
          <button
            title="click to navigate"
            onClick={() => setPage(i)}
            className={`p-1 outline-none rounded-full bg-slate-100 text-xs m-1 w-5 h-5 flex justify-center align-middle items-center  ${
              currentPage === i ? "bg-slate-300" : ""
            }`}
            key={i}
          >
            {i}
          </button>
        );
      }
    }

    if (rightEllipsis) {
      paginationButtons.push(<span className="p-1">...</span>);
      paginationButtons.push(
        <button
          title="click to navigate"
          onClick={() => setPage(totalPages)}
          className={`p-1 outline-none rounded-full bg-slate-100 text-xs m-1 w-5 h-5 flex justify-center align-middle items-center`}
          key={totalPages}
        >
          {totalPages}
        </button>
      );
    }
  }

  return {
    currentPost,
    paginationButtons,
    prevButton,
    nextButton,
    viewAllButton,
  };
};

export default useUserPagination;
