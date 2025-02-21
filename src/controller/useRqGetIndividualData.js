import { useQuery } from "@tanstack/react-query";
import { instance, POSTS } from "../route/api";

const fetchSinglePost = async (id) => {
  try {
    const res = await instance.get(`${POSTS}/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

export const useFetchSinglePost = (id) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchSinglePost(id), // Pass as a function reference
  });
};
