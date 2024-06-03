import { data } from "../../dummy/Data";
import { PokemonCards } from "../../components";

const Home = () => {
  return (
    <div>
      <PokemonCards data={data} />
    </div>
  );
};

export default Home;
