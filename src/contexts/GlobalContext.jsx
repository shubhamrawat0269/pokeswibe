import { data } from "../dummy/Data";
import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(data.length - 1);
  const [theme, setTheme] = useState("");

  const contexts = { currentIndex, setCurrentIndex, theme, setTheme };

  return (
    <GlobalContext.Provider value={contexts}>{children}</GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
