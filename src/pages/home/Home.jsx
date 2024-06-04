// import { data } from "../../dummy/Data";
import { PokemonCards } from "../../components";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { theme, setTheme } = useGlobalContext();

  useEffect(() => {
    let mainDiv = document.getElementById("primary__section");
    if (theme === "") {
      mainDiv.classList.remove("dark");
    } else {
      mainDiv.classList.add("dark");
    }
  }, [theme]);

  return (
    <div
      id="primary__section"
      className="w-screen h-screen grid place-items-center relative bg-sky-50 overflow-hidden"
    >
      <PokemonCards />

      <div className="flex gap-4 items-center absolute top-5 right-5">
        {theme == "dark" ? (
          <div className="cursor-pointer" onClick={() => setTheme("")}>
            <MdDarkMode size={30} />
          </div>
        ) : (
          <div className="cursor-pointer" onClick={() => setTheme("dark")}>
            <MdOutlineLightMode size={30} />
          </div>
        )}
        <Link to={`/favourites`} className="cursor-pointer">
          <FaHeart size={30} color="red" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
