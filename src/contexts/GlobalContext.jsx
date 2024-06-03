import { data } from "../dummy/Data";
import { createContext } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(data.length - 1);
  const contexts = { currentIndex, setCurrentIndex };
  return (
    <GlobalContext.Provider value={contexts}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
