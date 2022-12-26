import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchRegister = async (name, surname, email, password) => {
  const body = JSON.stringify({ name, surname, email, password });
  const data = await fetch(apiConstants.api + `users/auth/register`, {
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

const register = () =>
  useMutation(({ name, surname, email, password }) =>
    fetchRegister(name, surname, email, password)
  );

export default register;
