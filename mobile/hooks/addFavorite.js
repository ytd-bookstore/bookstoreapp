import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchAddFavorite = async (userId, bookId) => {
  const body = JSON.stringify({ user_id: userId, book_id: bookId });
  const data = await fetch(apiConstants.api + `favorites/`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: body,
  });

  const jsonData = await data.json();
  console.log(jsonData);
  return jsonData;
};

const addFavorite = () =>
  useMutation(({ userId, bookId }) => {
    fetchAddFavorite(userId, bookId);
  });

export default addFavorite;
