import axios from "axios";

export const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const POSTS = `/posts`;
export const PHOTOS = `/photos`;
export const USERS = `https://api.github.com/users`;
