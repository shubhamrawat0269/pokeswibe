import TinderCard from "react-tinder-card";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { createRef, useMemo, useRef, useState } from "react";

const PokemonCards = () => {
  // {
  //   ref : image || name || abilities || types
  // }

  const { currentIndex, setCurrentIndex, pokeData, getPokeData } =
    useGlobalContext();
  const currentIndexRef = useRef(currentIndex);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(
    () =>
      Array(pokeData.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < pokeData.length - 1;
  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < pokeData.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="w-inherit h-inherit grid place-items-center">
      {pokeData.map((character, index) => (
        <TinderCard
          ref={childRefs[index]}
          className="absolute"
          key={character?.data?.name}
          onSwipe={(dir) => swiped(dir, character?.data?.name, index)}
          onCardLeftScreen={() => outOfFrame(character?.data?.name, index)}
        >
          <div className=" bg-slate-200 dark:bg-neutral-900 rounded-2xl border-black border-2 bg-cover bg-center">
            <figure className="flex flex-col gap-2 justify-center items-center relative">
              <img
                className="w-[20rem] aspect-square"
                // src={character.url}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${character?.data?.id}.svg`}
                alt={character?.data?.name}
              />
              <figcaption className="text-4xl dark:text-white">
                {character?.data?.name}
              </figcaption>
              <div>
                <img
                  className="w-[5rem] absolute top-1 right-3"
                  src="like.png"
                  alt="likeImg"
                />
              </div>
            </figure>
            <div className="flex justify-around items-center gap-1 my-5">
              {character?.data?.abilities.map((poke, id) => {
                return (
                  <div
                    className="bg-orange-500 py-1 px-4 text-orange-100 rounded-lg"
                    key={id}
                  >
                    {poke?.ability?.name}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center">
              <button
                className="p-2.5 bg-blue-600 rounded-md border-none text-white hover:scale-105 transition-all m-2.5 font-bold w-24"
                style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                onClick={() => swipe("left")}
              >
                Dislike
              </button>
              <button
                className="p-2.5 rounded-md border-none text-white hover:scale-105  transition-all m-2.5 font-bold w-24"
                style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
                onClick={() => goBack()}
              >
                Undo
              </button>
              <button
                className="p-2.5 rounded-md bg-blue-600 border-none text-white hover:scale-105  transition-all m-2.5 font-bold w-24"
                style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                onClick={() => swipe("right")}
              >
                Like
              </button>
            </div>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default PokemonCards;
