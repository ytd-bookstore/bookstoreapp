import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchGenre = async (genreId) => {
  const data = await fetch(apiConstants.api + `genres/${genreId}/books`);
  const jsonData = await data.json();
  return jsonData;
};

const useGenre = (genreId) =>
  useQuery(["genres", genreId], () => fetchGenre(genreId));

export default useGenre;
