import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchOrders = async (userId) => {
  const data = await fetch(apiConstants.api + `orders/users/${userId}`);
  const jsonData = await data.json();
  return jsonData;
};

const useOrders = (state, userId) =>
  useQuery([state, "orders", userId], () => fetchOrders(userId));

export default useOrders;
