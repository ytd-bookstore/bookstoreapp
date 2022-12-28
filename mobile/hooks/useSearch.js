import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchSearch = async (searchedItem) => {
  const data = await fetch(apiConstants.api + `books/search/${searchedItem}`, {
    headers: {
      Authorization: "Bearer " + global.token,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

const useSearch = (searchedItem) =>
  useQuery(["books", searchedItem], () => fetchSearch(searchedItem));

export default useSearch;
