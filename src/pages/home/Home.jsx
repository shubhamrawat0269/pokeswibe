import { data } from "../../dummy/Data";
import { PokemonCards } from "../../components";

const Home = () => {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <PokemonCards data={data} />
    </div>
  );
};

export default Home;
