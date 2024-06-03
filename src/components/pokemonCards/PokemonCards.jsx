import { createRef, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import { useGlobalContext } from "../../hooks/useGlobalContext";

const PokemonCards = ({ data }) => {
  const { currentIndex, setCurrentIndex } = useGlobalContext();
  const currentIndexRef = useRef(currentIndex);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(
    () =>
      Array(data.length)
        .fill(0)
        .map((i) => createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < data.length - 1;

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
    if (canSwipe && currentIndex < data.length) {
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
    <div className="">
      {data.map((character, index) => (
        <TinderCard
          ref={childRefs[index]}
          className="swipe"
          key={character.name}
          onSwipe={(dir) => swiped(dir, character.name, index)}
          onCardLeftScreen={() => outOfFrame(character.name, index)}
        >
          <div className=" bg-slate-200 rounded-2xl border-black border-2 bg-cover bg-center">
            <figure className="flex flex-col gap-2 justify-center items-center">
              <img
                className="w-[12vw] aspect-square"
                src={character.url}
                alt={character.name}
              />
              <figcaption className="text-3xl">{character.name}</figcaption>
            </figure>
            <div className="flex justify-around items-center gap-1 my-5">
              <div className="bg-orange-500 py-1 px-4 text-orange-100 rounded-lg">
                Fire
              </div>
              <div className="bg-red-500 py-1 px-4 text-orange-100 rounded-lg">
                Flying
              </div>
              <div className="bg-purple-500 py-1 px-4 text-orange-100 rounded-lg">
                Blaze
              </div>
              <div className="bg-neutral-900 py-1 px-4 text-orange-100 rounded-lg">
                Solar
              </div>
            </div>
            <div className="flex flex-wrap justify-center">
              <button
                style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                onClick={() => swipe("left")}
              >
                Dislike
              </button>
              <button
                style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
                onClick={() => goBack()}
              >
                Undo
              </button>
              <button
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
