import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetPostsById, GetUserById, TimeZones, Users } from "../services/api";

function Modal({ isOpen, openCloseModal, post }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 rounded-xl backdrop-blur-sm duration-1000 ease-in-out"
          onClick={() => openCloseModal()}
        >
          <div className="modal-container">
            <div className="bg-white w-96 rounded-xl shadow-lg p-4">
              <div className="text-right">
                <button
                  onClick={() => openCloseModal()}
                  className=" text-red-500 hover:text-red-600 hover:font-bold"
                >
                  Close
                </button>
              </div>
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {post.title}
              </h2>
              <p className="mb-4 capitalize"> {post.body}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [country, setCountry] = useState([]);

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openCloseModal = (post) => {
    setIsOpen(!isOpen);
    setModalData(post);
  };

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const formattedTime = () => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  useEffect(() => {
    async function getUser() {
      const { data } = await GetUserById(id);
      setUser(data[0]);
      console.log(data[0]);
      const userPost = await GetPostsById(id);
      setPosts(userPost.data);
      console.log(userPost.data);

      const data3 = await TimeZones();
      setCountry(data3.data);
      console.log(data3.data);
    }
    getUser();
  }, []);

  return (
    <div className="container xl:max-w-7xl mx-auto">
      <div className="h-screen">
        <div className="flex flex-col sm:flex-row justify-between bg-slate-200 py-8 gap-4  items-center px-20 ">
          <Link to={"/"}>
            <button className="border border-gray-400 h-10 rounded-lg px-6 cursor-pointer">
              Back
            </button>
          </Link>
          <div className="flex flex-col sm:flex-row md:gap-6  gap-4">
            <select
              name=""
              id=""
              className="border border-gray-400 h-10 rounded  px-4"
            >
              <option value="">Country DropDown</option>
              {country?.map((country) => (
                <option value={country}>{country}</option>
              ))}
            </select>
            <p className="border border-gray-400 h-10 flex items-center justify-center rounded-lg px-6 bg-black text-white">
              {formattedTime()}
            </p>
            <button
              className="border border-gray-400 h-10 rounded-lg px-6 cursor-pointer hover:text-red-500 hover:border-red-500"
              onClick={() => handleStartPause()}
              onDoubleClick={() => handleReset()}
            >
              Pause/Start
            </button>
          </div>
        </div>
        <p className="flex justify-center items-center h-20 text-xl font-bold">
          Profile Page
        </p>

        <div className="flex flex-col sm:flex-row w-full justify-between items-center py-6 px-4 sm:px-12 border rounded-xl shadow-lg bg-slate-300 cursor-pointer gap-4">
          <div className="flex flex-col ">
            <p className="text-center">{user?.name}</p>
            <p className="text-center">{user?.username} | Catch phase</p>
          </div>

          <div className="flex flex-col text-center">
            <p>
              {user?.address.suite}, {user?.address.city}
            </p>
            <p className="text-center">
              {user?.email} | {user?.phone}
            </p>
          </div>
        </div>

        <div className="flex gap-6 flex-wrap mt-8 justify-center pb-8">
          {posts?.map((post) => (
            <div
              className="flex flex-col justify-around items-center  py-4 sm:py-12 border rounded-xl shadow-lg bg-slate-300 cursor-pointer w-80 h-80 hover:scale-105 duration-700 ease-in-out"
              onClick={() => openCloseModal(post)}
            >
              <p className="text-center  line-clamp-1 px-2 sm:px-4 text-lg capitalize">
                {post?.title}
              </p>
              <p className="px-2 sm:px-4 text-center line-clamp-4 capitalize">
                {post?.body}
              </p>
            </div>
          ))}
        </div>
        {isOpen ? (
          <Modal
            isOpen={isOpen}
            openCloseModal={openCloseModal}
            post={modalData}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Profile;
