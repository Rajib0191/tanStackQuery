import { useMutation, useQueryClient } from "@tanstack/react-query";
import { instance, POSTS } from "../route/api";

const deletePost = async (id) => {
  try {
    return await instance.delete(`${POSTS}/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to delete post");
  }
};

export const useDeletePost = (pageNumber) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      //   console.log(data, id);
      queryClient.setQueryData(["posts", pageNumber], (curElem) => {
        return curElem?.filter((post) => post.id !== id);
      });
    },
  });
};

// export const useDeletePost = (pageNumber) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deletePost,
//     onSuccess: (deletedId) => {
//       queryClient.setQueryData(["posts", pageNumber], (oldData) => {
//         if (!oldData) return oldData;

//         // Remove the deleted post
//         const updatedPosts = oldData.filter((post) => post.id !== deletedId);

//         // If fewer than 5 posts, try fetching one more
//         if (updatedPosts.length < 5) {
//           queryClient.invalidateQueries(["posts", pageNumber + 1]); // Fetch next page
//         }

//         return updatedPosts;
//       });

//       // Refetch only the current page to ensure it stays filled
//       queryClient.invalidateQueries(["posts", pageNumber]);
//     },
//   });
// };
