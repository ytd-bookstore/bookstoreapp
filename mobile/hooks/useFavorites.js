import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchFavorites = async (userId) => {
  const data = await fetch(apiConstants.api + `favorites/users/${userId}`);
  const jsonData = await data.json();
  return jsonData;
};

const useFavorites = (state, userId) =>
  useQuery([state, "favorites", userId], () => fetchFavorites(userId));

export default useFavorites;
