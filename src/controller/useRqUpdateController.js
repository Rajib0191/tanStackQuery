import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance, POSTS } from "../route/api";

const updatePosthData = async (id) => {
  try {
    const res = await instance.patch(`${POSTS}/${id}`, {
      title: "I Have Updated",
    });
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch posts");
  }
};

export const useUpdatePost = (pageNumber) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => updatePosthData(id),
    /**
     * apiData = response body data.
     * postId = individual post id.
     **/
    onSuccess: (apiData, postID) => {
      queryClient.setQueryData(["posts", pageNumber], (posts) => {
        return posts.map((post) => {
          return post.id === postID ? { ...post, title: apiData?.title } : post;
        });
      });
    },
  });
};
