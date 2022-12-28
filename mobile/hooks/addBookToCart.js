import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchAddBookToCart = async (userId, bookId) => {
  const body = JSON.stringify({ book_id: bookId });
  await fetch(apiConstants.mobile_api + `carts/books`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.token,
    },
    method: "POST",
    body: body,
  });
};

const addBookToCart = () =>
  useMutation(({ userId, bookId }) => {
    fetchAddBookToCart(userId, bookId);
  });

export default addBookToCart;
