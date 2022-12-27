import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchDeleteFromCart = async (userId, bookId) => {
  await fetch(apiConstants.api + `carts/users/${userId}/books/${bookId}`, {
    method: "DELETE",
  });
};

const deleteBookFromCart = () =>
  useMutation(({ userId, bookId }) => {
    fetchDeleteFromCart(userId, bookId);
  });

export default deleteBookFromCart;
