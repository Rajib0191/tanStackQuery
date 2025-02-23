import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFetchPosts } from "../controller/useRqPostController";
import { useDeletePost } from "../controller/useRqDeleteController";
import { useUpdatePost } from "../controller/useRqUpdateController";

const FetchRQ = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isPending, isError, error } = useFetchPosts(pageNumber);

  const deleteMutation = useDeletePost(pageNumber);
  const updateMutation = useUpdatePost(pageNumber);

  // Conditional rendering based on loading, error, and posts data
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p> Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => deleteMutation.mutate(id)}>Delete</button>
              <button onClick={() => updateMutation.mutate(id)}>Update</button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button
          disabled={pageNumber === 0 ? true : false}
          onClick={() => setPageNumber((prev) => prev - 5)}
        >
          Prev
        </button>
        <p>{Math.floor(pageNumber / 5 + 1)}</p>
        <button onClick={() => setPageNumber((prev) => prev + 5)}>Next</button>
      </div>
    </div>
  );
};

export default FetchRQ;
