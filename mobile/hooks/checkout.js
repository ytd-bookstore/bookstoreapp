import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchCheckout = async (userId, information) => {
  const body = JSON.stringify(information);
  const data = await fetch(apiConstants.api + `orders/users/${userId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: body,
  });
};

const checkout = () =>
  useMutation(({ userId, information }) => {
    fetchCheckout(userId, information);
  });

export default checkout;
