import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";
import * as SecureStore from "expo-secure-store";

const fetchBook = async (bookId) => {
  let token = await SecureStore.getItemAsync(apiConstants.tokenKey);
  const data = await fetch(apiConstants.api + `books/${bookId}/genres`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

const useBook = (bookId) =>
  useQuery(["books", bookId], () => fetchBook(bookId));

export default useBook;
