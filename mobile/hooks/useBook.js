import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchBook = async (bookId) => {
  const data = await fetch(apiConstants.api + `books/${bookId}/genres`);
  const jsonData = await data.json();
  return jsonData;
};

const useBook = (bookId) =>
  useQuery(["books", bookId], () => fetchBook(bookId));

export default useBook;
