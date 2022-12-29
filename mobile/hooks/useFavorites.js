import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchFavorites = async () => {
  const data = await fetch(apiConstants.mobile_api + `favorites/users`, {
    headers: {
      Authorization: "Bearer " + global.token,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

const useFavorites = (state) =>
  useQuery([state, "favorites"], () => fetchFavorites());

export default useFavorites;
