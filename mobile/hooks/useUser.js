import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchUser = async () => {
  const data = await fetch(apiConstants.mobile_api + `users/address`, {
    headers: {
      Authorization: "Bearer " + global.token,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

const useUser = () => useQuery(["users"], () => fetchUser());

export default useUser;
