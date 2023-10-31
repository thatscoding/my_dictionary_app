import axios from "axios";

export const Posts = async () => {
  try {
    return await axios.get("https://jsonplaceholder.typicode.com/posts");
  } catch (error) {
    console.log(error);
  }
};

export const GetPostsById = async (id) => {
  try {
    console.log(id);
    return await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const Users = async () => {
  try {
    return await axios.get("https://jsonplaceholder.typicode.com/users");
  } catch (error) {
    console.log(error);
  }
};

export const GetUserById = async (id) => {
  try {
    return await axios.get(
      `https://jsonplaceholder.typicode.com/users?id=${id}`
    );
  } catch (error) {
    console.log(error);
  }
};

export const TimeZones = async () => {
  try {
    return await axios.get("https://worldtimeapi.org/api/timezone");
  } catch (error) {
    console.log(error);
  }
};

// https://worldtimeapi.org/api/timezone
