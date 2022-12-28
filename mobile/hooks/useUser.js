import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchUser = async (userId) => {
  const data = await fetch(apiConstants.mobile_api + `users/address`, {
    headers: {
      Authorization: "Bearer " + global.token,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

const useUser = (userId) =>
  useQuery(["users", userId], () => fetchUser(userId));

export default useUser;
