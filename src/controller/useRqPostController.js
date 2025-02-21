import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const fetchData = async () => {
  try {
    const res = await instance.get("/posts");
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

export const useFetchPosts = () => {
  return useQuery({ queryKey: ["posts"], queryFn: fetchData });
};
