import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchCart = async () => {
  const data = await fetch(apiConstants.mobile_api + `carts/users`, {
    headers: {
      Authorization: "Bearer " + global.token,
    },
  });
  const jsonData = await data.json();
  return jsonData;
};

const useCart = (state) => useQuery([state, "cart"], () => fetchCart());

export default useCart;
