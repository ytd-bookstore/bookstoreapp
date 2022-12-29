import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchDeleteFavorite = async (bookId) => {
  const body = JSON.stringify({ book_id: bookId });
  await fetch(apiConstants.mobile_api + `favorites/books`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.token,
    },
    method: "DELETE",
    body: body,
  });
};

const deleteFavorite = () =>
  useMutation(({ bookId }) => {
    fetchDeleteFavorite(bookId);
  });

export default deleteFavorite;
