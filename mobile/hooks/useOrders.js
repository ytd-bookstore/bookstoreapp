import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchOrders = async () => {
  const data = await fetch(apiConstants.mobile_api + `orders/users`, {
    headers: {
      Authorization: "Bearer " + global.token,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

const useOrders = (state) => useQuery([state, "orders"], () => fetchOrders());

export default useOrders;
