import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { instance, POSTS } from "../route/api";

const fetchData = async (pageNumber) => {
  try {
    const res = await instance.get(`${POSTS}?_start=${pageNumber}&_limit=5`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

export const useFetchPosts = (pageNumber) => {
  return useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchData(pageNumber),
    placeholderData: keepPreviousData,
  });
};
