import { useQuery } from "react-query";

import apiConstants from "../assets/constants/apiConstants";

const fetchGenres = async (genreNames) => {
  var genreIDs = [];
  for (let i = 0; i < genreNames.length; i++) {
    const data = await fetch(
      apiConstants.api + `genres?name=${genreNames[i].genre}`,
      {
        headers: {
          Authorization: "Bearer " + global.token,
        },
      }
    );
    const jsonData = await data.json();
    if (typeof jsonData[0] !== "undefined") {
      genreIDs.push(jsonData[0]);
    }
  }
  var genres = [];
  for (let i = 0; i < genreIDs.length; i++) {
    const data = await fetch(
      apiConstants.api + `genres/${genreIDs[i].id}/books`,
      {
        headers: {
          Authorization: "Bearer " + global.token,
        },
      }
    );
    const jsonData = await data.json();
    genres.push(jsonData);
  }
  return genres;
};

const useGenreIDs = (genreNames) =>
  useQuery(["genres", genreNames], () => fetchGenres(genreNames));

export default useGenreIDs;
