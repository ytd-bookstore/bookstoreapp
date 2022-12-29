import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchDeleteFromCart = async (bookId) => {
  const body = JSON.stringify({ book_id: bookId });
  await fetch(apiConstants.mobile_api + `carts/books`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.token,
    },
    method: "DELETE",
    body: body,
  });
};

const deleteBookFromCart = () =>
  useMutation(({ bookId }) => {
    fetchDeleteFromCart(bookId);
  });

export default deleteBookFromCart;
