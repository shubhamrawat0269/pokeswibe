import axios from "axios";
import { data } from "../dummy/Data";
import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [theme, setTheme] = useState("");
  const [pokeData, setPokeData] = useState([]);
  const [favouritesList, setFavouriteList] = useState([]);

  const getPokeData = async () => {
    const URL = `https://pokeapi.co/api/v2/pokemon`;

    try {
      const res = await axios.get(URL);
      // console.log(res.data.results);
      let pokemonDetail = res.data.results;
      let pokeDetailList = [...pokemonDetail];

      const pokeData = await Promise.all(
        pokeDetailList.map(async (pokDetail) => {
          const res = await axios.get(`${pokDetail.url}`);
          return res;
        })
      );

      setPokeData(pokeData);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getPokeData();
  }, []);

  const contexts = {
    theme,
    setTheme,
    pokeData,
    getPokeData,
    favouritesList,
    setFavouriteList,
  };

  return (
    <GlobalContext.Provider value={contexts}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
