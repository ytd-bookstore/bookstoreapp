import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchAddFavorite = async (userId, bookId) => {
  const body = JSON.stringify({ book_id: bookId });
  const data = await fetch(apiConstants.mobile_api + `favorites/books`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.token,
    },
    method: "POST",
    body: body,
  });

  const jsonData = await data.json();
  return jsonData;
};

const addFavorite = () =>
  useMutation(({ userId, bookId }) => {
    fetchAddFavorite(userId, bookId);
  });

export default addFavorite;
