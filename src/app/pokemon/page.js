"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ThemeButton from "../components/ThemeButton";

const Home = () => {
  // const [page, setPage] = useState(10);
  const [data, setData] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [detailModal, setDetailModal] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchResultPage, setSearchResultPage] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const modalRef = useRef();

  // const getData = async () => {
  //   const request = await fetch(
  //     "https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole"
  //   );
  //   const response = await request.json();

  //   setData(response);
  // };

  const getDataUser = async () => {
    const request = await fetch(
      `https://randomuser.me/api/?page=1&results=50&seed=abc`
    );
    const response = await request.json();

    setDataUser(response.results);
  };

  useEffect(() => {
    // getData();
    getDataUser();
  }, []);

  const getMoreDataUser = async () => {
    const request = await fetch(
      `https://randomuser.me/api/?page=${pageNumber}&results=50&seed=abc`
    );
    const response = await request.json();
    return response.results;
  };

  const fetchData = async () => {
    const response = await getMoreDataUser();
    if (pageNumber === 9 || pageNumber > 8) {
      setHasMore(false);
    }
    setPageNumber(pageNumber + 1);

    setDataUser([...dataUser, ...response]);
  };

  const deleteCard = (e) => {
    const filterDelete = dataUser.filter((data) => {
      return data.login.uuid !== e.target.id;
    });
    setDataUser(filterDelete);
  };

  // useEffect to watch dataUser, if someone deleted some cards the searchResult will be updated
  useEffect(() => {
    searchCard();
  }, [dataUser]);

  const detailCard = (e) => {
    dataUser.map((data) => {
      if (data.login.uuid === e.target.id) {
        setDetailModal(data);
      }
      return data;
    });
  };

  const Cards = ({ firstName, lastName, gender, id, index }) => {
    return (
      <div className=" flex flex-col hover:scale-[102%] md:text-sm text-xs transition items-center px-1 py-1 bg-white dark:bg-slate-800 text-black dark:text-slate-200 rounded-xl shadow-xl">
        <div className="flex justify-center items-center h-[50px] w-full bg-gradient-to-r from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 rounded-xl">
          <span className="text-white dark:text-slate-200">Photo Card</span>
        </div>
        <div className="flex flex-col justify-center items-center py-2">
          <h1>
            Name: {firstName} {lastName}
          </h1>
          <h1>
            Gender: {gender} {data.gender}
          </h1>
        </div>
        <div className="flex space-x-1">
          <button
            id={id}
            onClick={(e) => detailCard(e)}
            index={index}
            className="flex justify-center items-center p-2 text-white bg-gradient-to-r from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200 rounded-xl"
          >
            Detail
          </button>
          <button
            id={id}
            onClick={(e) => deleteCard(e)}
            index={index}
            className="flex justify-center items-center p-2 text-white bg-gradient-to-r from-red-500 to-yellow-500 dark:from-slate-900 dark:to-red-950 dark:text-slate-200 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  const Modal = () => {
    useEffect(() => {
      let handler = (e) => {
        if (!modalRef.current?.contains(e.target)) {
          setDetailModal(null);
        }
      };

      document.addEventListener("click", handler);

      return () => {
        document.removeEventListener("click", handler);
      };
    }, []);

    return (
      <div className="fixed flex justify-center flex-col inset-0  items-center bg-black backdrop-blur-sm bg-opacity-50 text-black">
        <div ref={modalRef} className="bg-white rounded-xl p-8">
          <div className="text-center">
            <p className="font-bold text-xl mb-4">
              {detailModal.name.first} {detailModal.name.last}
            </p>
            <p>Gender: {detailModal.gender}</p>
            <p>Email: {detailModal.email}</p>
            <p>Phone: {detailModal.phone}</p>
            <p>
              Location: {detailModal.location.street.name}{" "}
              {detailModal.location.street.number}, {detailModal.location.city},{" "}
              {detailModal.location.country}{" "}
            </p>
            <div className="mt-4 flex justify-center items-center">
              <button
                className=" text-white py-1 px-2 bg-gradient-to-r from-pink-500 to-violet-950 rounded-md"
                onClick={closeDetailModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const closeDetailModal = () => {
    setDetailModal("");
  };

  const searchCard = (e) => {
    e?.preventDefault();
    const filterSearch = dataUser.filter((item) => {
      const nameUser =
        item.name.first.toString() + " " + item.name.last.toString();
      // if (nameUser?.toLowerCase().includes(searchTitle?.toLowerCase()) && searchTitle !== " ") {
      //   setSearchResultPage(true);
      // }
      return nameUser?.toLowerCase().includes(searchTitle?.toLowerCase());
    });

    if (filterSearch.length !== 0) {
      setSearchResultPage(true);
      setSearchResult(filterSearch);
    }

    if (
      searchTitle === "" ||
      searchTitle == undefined ||
      filterSearch.length === 0
    ) {
      setSearchResultPage(false);
    }
  };

  const closeSearchResult = () => {
    setSearchResultPage(false);
  };

  return (
    <>
      <title>Address Book App</title>
      <div className="fixed flex z-10 top-0 bg-gradient-to-bl from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200 text-black h-[70px] w-full">
        <div className="flex justify-center items-center my-auto w-[45%]">
          <Image src="img/pokemon-logo-bw.svg" width={70} height={70} />
        </div>
        <div className="flex justify-center items-center w-[10%]">
          <ThemeButton />
        </div>
        <div className="flex justify-center items-center w-[45%]">
          <form>
            <input
              className="rounded-md py-1 px-2"
              type="search"
              placeholder="Search..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
            <button
              onClick={(e) => searchCard(e)}
              type="search"
              className="font-semibold px-2"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="bg-slate-50 dark:text-slate-400 dark:bg-slate-900 px-4 lg:px-16 mt-[70px]">
        {/* <div className="flex bg-gradient-to-bl from-teal-500 to-purple-900 py-4 mb-4 justify-center">
          Bank Data
        </div>
        {data.slice(0, 50).map((data) => {
          return (
            <div className="text-black">
              <p>
                {data.first} {data.last}{" "}
              </p>
              <p>{data.email} </p>
            </div>
          );
        })}
        <div className="flex bg-gradient-to-bl from-teal-500 to-purple-900 py-4 my-4 justify-center rounded-t-xl ">
          Bank Data
        </div>
        <InfiniteScroll
          dataLength={data.length} //This is important field to render the next data
          // next={fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-3">
            {data.map((data, index) => {
              return (
                <div
                  index={index}
                  className=" flex flex-col hover:scale-[98%] md:text-sm text-xs transition items-center px-1 py-1 bg-white text-black rounded-xl shadow-xl"
                >
                  <div className="flex justify-center items-center h-[50px] w-full bg-gradient-to-r from-emerald-600 to-indigo-900 rounded-xl">
                    <div className="text-white">Card Pict</div>
                  </div>
                  <div>
                    {data.first} {data.last}
                  </div>
                  <div>{data.email}</div>
                  <div>balance: {data.balance}</div>
                </div>
              );
            })}
          </div>
        </InfiniteScroll> */}

        {searchResultPage ? (
          <>
            <div className="py-4">
              <div className="flex justify-between bg-gradient-to-bl from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200 py-4 my-4 rounded-t-xl ">
                <div className="w-[63.736px]"></div>
                <div>Search Result</div>
                <button onClick={closeSearchResult} className="px-3">
                  Done
                </button>
              </div>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-3">
                {searchResult?.map((data, index) => {
                  return (
                    <Cards
                      firstName={data.name.first}
                      lastName={data.name.last}
                      gender={data.gender}
                      id={data.login.uuid}
                      index={index}
                    />
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="py-4">
          <div className="flex bg-gradient-to-bl from-teal-500 to-purple-900 dark:from-slate-900 dark:to-slate-950 dark:text-slate-200  py-4 my-4 justify-center rounded-t-xl ">
            Address Book
          </div>
          <InfiniteScroll
            dataLength={dataUser.length} //This is important field to render the next data
            next={fetchData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-3">
              {dataUser?.map((data, index) => {
                return (
                  <Cards
                    firstName={data.name.first}
                    lastName={data.name.last}
                    gender={data.gender}
                    id={data.login.uuid}
                    index={index}
                  />
                );
              })}
            </div>
          </InfiniteScroll>
        </div>
      </div>
      {detailModal ? <Modal /> : ""}
    </>
  );
};

export default Home;
