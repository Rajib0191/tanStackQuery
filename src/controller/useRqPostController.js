import { useQuery } from "@tanstack/react-query";
import { instance, POSTS } from "../route/api";

const fetchData = async () => {
  try {
    const res = await instance.get(POSTS);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

export const useFetchPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: fetchData,
  });
};
