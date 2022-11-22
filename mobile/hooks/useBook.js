import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchBook = async (bookId) => {
  const { data } = await fetch(
    apiConstants.api + apiConstants.books + `${bookId}`
  );
  return data;
};

const useBook = (bookId) =>
  useQuery(["posts", bookId], () => fetchBook(bookId));

export default useBook;
