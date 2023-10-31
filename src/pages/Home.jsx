import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users } from "../services/api";

function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getUsers() {
      const { data } = await Users();
      setUsers(data);
      console.log(data);
    }
    getUsers();
  }, []);

  return (
    <div className="container lg:max-w-7xl mx-auto">
      <div className=" h-screen">
        <div className="">
          <h1 className="flex justify-center w-full items-end h-20 mb-12 text-xl font-bold">
            Dictionary
          </h1>

          <div className="flex flex-col gap-4 pb-8">
            {users.map((user) => (
              <Link to={`/profile/${user.id}`}>
                <div className="flex w-full justify-between items-center h-20 px-4 sm:px-12 border rounded-xl shadow-lg bg-slate-300 cursor-pointer">
                  <p>Name: {user.name}</p>
                  <p>Posts: 10</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
