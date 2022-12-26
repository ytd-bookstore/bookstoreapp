import { useMutation } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchDeleteFavorite = async (userId, bookId) => {
  const data = await fetch(
    apiConstants.api + `favorites/users/${userId}/books/${bookId}`,
    {
      method: "DELETE",
    }
  );
  //const jsonData = await data.json();
  //return jsonData;
};

const deleteFavorite = () =>
  useMutation(({ userId, bookId }) => {
    fetchDeleteFavorite(userId, bookId);
  });

export default deleteFavorite;
