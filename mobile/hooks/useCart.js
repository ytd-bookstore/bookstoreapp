import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchCart = async (userId) => {
  const data = await fetch(apiConstants.mobile_api + `carts/users`, {
    headers: {
      Authorization: "Bearer " + global.token,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

const useCart = (state, userId) =>
  useQuery([state, "cart", userId], () => fetchCart(userId));

export default useCart;
