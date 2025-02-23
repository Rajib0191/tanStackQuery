import { instance, PHOTOS } from "../route/api";

export const fetchUsers = async ({ pageParam = 1 }) => {
  try {
    const res = await instance.get(`${PHOTOS}?_start=${pageParam}&_limit=10`);
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { data: [], nextPage: undefined };
  }
};
