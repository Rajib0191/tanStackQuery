import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../controller/InfiniteScrool";

const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage?.length === 10 ? allPages?.length + 1 : undefined;
      },
    });

  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 1;

    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "error") return <div>Error fetching data</div>;

  return (
    <div>
      <h1>Infinite Scroll with React Query v5</h1>

      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page?.map((user) => (
            <li
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}
            >
              <p>{user.title}</p>
              <img
                src={user.thumbnailUrl}
                alt={user.title}
                width={50}
                height={50}
              />
            </li>
          ))}
        </ul>
      ))}

      <div style={{ textAlign: "center" }}>
        {isFetchingNextPage ? (
          <span style={{ color: "#fff", fontSize: "16px" }}>
            Loading more...
          </span>
        ) : hasNextPage ? (
          <span style={{ color: "#fff", fontSize: "16px" }}>
            Scroll down to load more
          </span>
        ) : (
          <span style={{ color: "#fff", fontSize: "16px" }}>No more users</span>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
