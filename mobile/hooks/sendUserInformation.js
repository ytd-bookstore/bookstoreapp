import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const postInformation = async (userId, information) => {
  const data = await fetch(apiConstants.mobile_api + `users/address`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + global.token,
    },
    method: "PUT",
    body: JSON.stringify(information),
  });
  const jsonData = await data.json();
  return jsonData;
};

const sendUserInformation = (userId, information) =>
  useMutation(() => postInformation(userId, information));

export default sendUserInformation;
