import { useEffect, useState } from "react";
import { instance, POSTS } from "../route/api";

export const fetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await instance.get(POSTS);
      if (res.data) {
        setPosts(res.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { posts, isLoading, isError };
};
