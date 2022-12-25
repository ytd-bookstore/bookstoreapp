import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchUser = async (userId) => {
  const data = await fetch(apiConstants.api + `users/${userId}/address`);
  const jsonData = await data.json();
  return jsonData;
};

const useUser = (userId) =>
  useQuery(["users", userId], () => fetchUser(userId));

export default useUser;
