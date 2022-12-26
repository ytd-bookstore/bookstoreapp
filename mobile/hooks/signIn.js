import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchSignIn = async (email, password) => {
  const body = JSON.stringify({ email, password });
  const data = await fetch(apiConstants.api + `users/auth/login`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: body,
  });
  try {
    const jsonData = await data.json();
    return jsonData;
  } catch {
    return;
  }
};

const signIn = () =>
  useMutation(({ email, password }) => fetchSignIn(email, password));

export default signIn;
