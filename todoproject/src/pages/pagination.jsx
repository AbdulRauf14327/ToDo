import axios from "axios";
import Spinner from "./spinner";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";

const API_URL = "https://rickandmortyapi.com/";

const HeaderPage = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setErrorMessage("");
        const data = await axios.get(`${API_URL}api/character?page=${page}`);
        setCharacters(data.data.results);
        setTotalPages(data.data.info.pages);
        setTotalCount(data.data.info.count);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  const handlePageChange = (pageNum) => {
    setSearchParams({ Page: pageNum });
    setPage(pageNum);
  };

  const pageOptions = [];
  for (let i = 1; i <= totalPages; i++) {
    pageOptions.push(i);
  }

  useEffect(() => {
    const getData = setTimeout(() => {
      if (searchName) {
        setLoading(true);
        axios
          .get(`${API_URL}api/character?name=${searchName}`)
          .then((response) => {
            console.log(response, ".............ers");
            setCharacters(response?.data?.results);
            setTotalCount(response?.data?.info?.count);
            setErrorMessage("");
            setLoading(false);
          })
          .catch((error) => {
            setErrorMessage(error?.response?.data?.error);
            setTotalCount(0);
            setLoading(false);
          });
      } else {
        axios
          .get("https://rickandmortyapi.com/api/character")
          .then((response) => {
            setTotalCount(response?.data?.info?.count);
            setCharacters(response.data.results);
            setErrorMessage("");
            setLoading(false);
          })
          .catch((error) => {
            setErrorMessage("An error occurred");
            setTotalCount(0);
            setLoading(false);
          });
      }
    }, 2000);
    return () => clearTimeout(getData);
  }, [searchName]);

  const handleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const renderPageButtons = () => {
    const maxButtons = 5;
    let startPage = Math.max(page - 2, 1);
    let endPage = Math.min(page + 2, totalPages);

    if (endPage - startPage < maxButtons - 1) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxButtons - 1, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(endPage - maxButtons + 1, 1);
      }
    }

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`border-2 font-medium px-3 ml-2 ${
            i === page ? "bg-slate-600 text-white" : "bg-white text-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    if (startPage > 1) {
      pageButtons.unshift(<span key="start-ellipsis">...</span>);
      pageButtons.unshift(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`border-2 font-medium px-3 ml-2 ${
            page === 1 ? "bg-slate-600 text-white" : "bg-white text-gray-600"
          }`}
        >
          1
        </button>
      );
    }

    if (endPage < totalPages) {
      pageButtons.push(<span key="end-ellipsis">...</span>);
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`border-2 font-medium px-3 ml-2 ${
            page === totalPages
              ? "bg-slate-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <>
      <div className="max-md:top-64 md:w-[calc(100vw-18rem)] w-full md:ml-[16rem] absolute top-16 py-10 pl-10 ">
        <div className="search_bar mb-5 flex items-center ">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 p-1 focus:border-2"
            onChange={handleSearch}
          />
          <IoIosSearch className=" text-2xl text-gray-400 cursor-pointer absolute ml-40 " />
          <div className="counter_search font-bold ml-10 text-gray-400 flex">
            <div className="counter_search font-bold  text-gray-400">
              Counts: {totalCount}
            </div>
          </div>
        </div>
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="flex flex-wrap gap-3">
            {errorMessage ? (
              <div className="text-red-500 font-bold">{errorMessage}</div>
            ) : (
              characters?.map((item, index) => (
                <div key={index}>
                  <Link to={`/character/${item.id}`}>
                    <div>
                      <img
                        src={item?.image}
                        style={{
                          height: 200,
                          width: 280,
                          objectFit: "cover",
                          borderRadius: 5,
                        }}
                      />
                      <div className="font-bold flex flex-wrap">
                        {item?.name}
                      </div>
                      <div className="text-base">{item?.species}</div>
                      <div className="text-base">{item?.status}</div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
        <div className="pagination-button mt-10 flex justify-center items-center">
          <div className="previous-button flex justify-center items-center">
            <button onClick={() => handlePageChange(Math.max(1, page - 1))}>
              <MdOutlineSkipPrevious className="text-4xl cursor-pointer" />
            </button>
          </div>
          <div className="all-button">{renderPageButtons()}</div>
          <div className="next-button flex justify-center items-center">
            <button
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            >
              <MdOutlineSkipNext className="text-4xl cursor-pointer" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderPage;
