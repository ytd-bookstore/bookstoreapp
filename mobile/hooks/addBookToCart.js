import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchAddBookToCart = async (userId, bookId) => {
  const data = await fetch(
    apiConstants.api + `carts/users/${userId}/books/${bookId}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
    }
  );
};

const addBookToCart = () =>
  useMutation(({ userId, bookId }) => {
    fetchAddBookToCart(userId, bookId);
  });

export default addBookToCart;
