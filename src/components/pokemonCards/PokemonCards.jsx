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
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />
      <div className="cardContainer">
        {data.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div className="card">
              <img
                className="img-style"
                src={character.url}
                alt={character.name}
              />
              <div className="buttons">
                <button
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  onClick={() => swipe("left")}
                >
                  Swipe left!
                </button>
                <button
                  style={{ backgroundColor: !canGoBack && "#c3c4d3" }}
                  onClick={() => goBack()}
                >
                  Undo swipe!
                </button>
                <button
                  style={{ backgroundColor: !canSwipe && "#c3c4d3" }}
                  onClick={() => swipe("right")}
                >
                  Swipe right!
                </button>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default PokemonCards;
