import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchCart = async (userId) => {
  const data = await fetch(apiConstants.api + `carts/users/${userId}`);
  const jsonData = await data.json();
  return jsonData;
};

const useCart = (state, userId) =>
  useQuery([state, "cart", userId], () => fetchCart(userId));

export default useCart;
