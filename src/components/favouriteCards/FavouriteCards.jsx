import React, { useEffect } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const FavouriteCards = () => {
  const { favouritesList, setFavouriteList } = useGlobalContext();
  console.log(favouritesList);

  useEffect(() => {
    if (favouritesList.length == 0) {
      const data = JSON.parse(localStorage.getItem("favourites"));
      setFavouriteList(data);
    }
  }, [favouritesList]);

  return (
    <div className="w-screen h-screen">
      <h2 className="text-5xl text-center my-4">My Favourite Card</h2>

      <div className="flex flex-col md:p-[1rem] md:flex-row gap-4 overflow-y-auto">
        {favouritesList.length > 0 ? (
          favouritesList?.map((character) => {
            return (
              <div
                key={character?.id}
                className="w-[70vw] mx-auto md:mx-0 md:w-[18rem] p-4 dark:bg-neutral-900 rounded-lg bg-teal-400 bg-cover bg-center"
              >
                <figure className="flex flex-col gap-2 justify-center items-center relative">
                  <img
                    className="w-full p-10 aspect-square bg-teal-800"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${character?.id}.svg`}
                    alt={character?.name}
                  />
                  <figcaption className="text-1xl absolute -bottom-3 left-2 px-3 py-1 rounded-xl bg-slate-400 dark:text-white">
                    {(character?.name).toUpperCase()}
                  </figcaption>
                </figure>
                <div className="mt-5">
                  <h3 className="flex items-center justify-between">
                    <span className="text-teal-100">Base Experience</span>
                    <span className="text-neutral-700 text-xl">
                      {character?.base_experience}
                    </span>
                  </h3>
                  <h3 className="flex items-center justify-between">
                    <span className="text-teal-100">Height</span>
                    <span className="text-neutral-700 text-xl">
                      {" "}
                      {character?.height}
                    </span>
                  </h3>
                  <h3 className="flex items-center justify-between">
                    <span className="text-teal-100">Weight</span>
                    <span className="text-neutral-700 text-xl">
                      {character?.weight}
                    </span>
                  </h3>
                </div>
              </div>
            );
          })
        ) : (
          <h1 className="text-7xl text-slate-700 text-center">No Favourites</h1>
        )}
      </div>
    </div>
  );
};

export default FavouriteCards;
