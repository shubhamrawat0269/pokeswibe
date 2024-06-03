import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
