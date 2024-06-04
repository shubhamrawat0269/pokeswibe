import React from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const FavouriteCards = () => {
  const { favouritesList } = useGlobalContext();
  // console.log(favouritesList);
  return (
    <div className="w-screen h-screen">
      <h2 className="text-5xl text-center my-4">My Favourite Card</h2>

      <div className="flex flex-col md:flex-row gap-4 overflow-y-auto m-5">
        {favouritesList.length > 0 ? (
          favouritesList?.map((character) => {
            return (
              <div
                key={character?.id}
                className=" bg-slate-200 md:w-[14vw] p-4 dark:bg-neutral-900 rounded-2xl border-black border-2 bg-cover bg-center"
              >
                <figure className="flex flex-col gap-2 justify-center items-center relative">
                  <img
                    className="w-[5rem] aspect-square"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${character?.id}.svg`}
                    alt={character?.name}
                  />
                  <figcaption className="text-4xl dark:text-white">
                    {character?.name}
                  </figcaption>
                </figure>
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
