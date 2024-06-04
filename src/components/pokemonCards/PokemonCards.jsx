import TinderCard from "react-tinder-card";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useGenerateRandomId } from "../../hooks/useGenerateRandomId";

const PokemonCards = () => {
  // {
  //   ref used : image || name || abilities || types
  // }

  const { pokeData, favouritesList, setFavouriteList } = useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(19);
  const currentIndexRef = useRef(currentIndex);
  const [lastDirection, setLastDirection] = useState();
  const optionsColor = [
    "#3572EF",
    "#254336",
    "#850F8D",
    "#40A578",
    "#A91D3A",
    "#153448",
    "#FFC470",
    "#FDE767",
  ];

  const childRefs = useMemo(() => {
    if (pokeData.length) {
      return Array(pokeData.length)
        .fill(0)
        .map((i) => React.createRef());
    }
  }, [pokeData]);
  // console.log(childRefs);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir, data) => {
    if (canSwipe && currentIndex < pokeData.length) {
      if (dir === "right") {
        // console.log(data);
        setFavouriteList([...favouritesList, data]);

        localStorage.setItem(
          "favourites",
          JSON.stringify([...favouritesList, data])
        );
      }
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <div className="w-inherit h-inherit grid place-items-center">
      {pokeData?.length > 0 ? (
        pokeData.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="absolute"
            key={character?.data?.name}
            onSwipe={(dir) => swiped(dir, character?.data?.name, index)}
            onCardLeftScreen={() => outOfFrame(character?.data?.name, index)}
          >
            <div className=" bg-slate-200 p-2 dark:bg-neutral-900 rounded-2xl shadow-xl bg-cover bg-center">
              <figure className="flex flex-col gap-2 justify-center items-center relative">
                <img
                  className="w-[20rem] aspect-square"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${character?.data?.id}.svg`}
                  alt={character?.data?.name}
                />
                <figcaption className="text-4xl dark:text-white">
                  {(character?.data?.name).toUpperCase()}
                </figcaption>
                <div>
                  <img
                    className="w-[4rem] absolute top-1 right-1"
                    src="like.png"
                    alt="likeImg"
                  />
                </div>
              </figure>
              <div className="flex justify-around items-center gap-1 my-5">
                {character?.data?.abilities.map((poke, id) => {
                  return (
                    <div
                      className="py-1 px-4 rounded-lg text-white"
                      key={id}
                      style={{
                        background: `${optionsColor[useGenerateRandomId()]}`,
                      }}
                    >
                      {poke?.ability?.name}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap justify-between">
                <button
                  className="p-2.5 bg-teal-700 rounded-md border-none text-white hover:scale-105 transition-all m-2.5 font-bold w-36"
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  onClick={() => swipe("left")}
                >
                  Dislike
                </button>
                <button
                  className="p-2.5 rounded-md bg-cyan-900 border-none text-white hover:scale-105  transition-all m-2.5 font-bold w-36"
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  onClick={() => swipe("right", character?.data)}
                >
                  Like
                </button>
              </div>
            </div>
          </TinderCard>
        ))
      ) : (
        <h1 className="text-3xl">Loading...</h1>
      )}
    </div>
  );
};

export default PokemonCards;
