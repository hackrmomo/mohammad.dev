import { makeUseAxios, UseAxios } from "axios-hooks";

export const useAxios: UseAxios = (() => {
  return makeUseAxios();
})();
