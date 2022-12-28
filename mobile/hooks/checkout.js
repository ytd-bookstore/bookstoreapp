import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchCheckout = async (userId, information) => {
  const body = JSON.stringify(information);
  await fetch(apiConstants.mobile_api + `checkout`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.token,
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
