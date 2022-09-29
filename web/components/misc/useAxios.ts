import { makeUseAxios, UseAxios } from "axios-hooks";
import axios from "axios";
import { useAuth } from "./useAuth";

export const useAxios: UseAxios = (() => {
  const [auth] = useAuth();
  if (auth.authenticated) {
    return makeUseAxios({
      axios: axios({
        headers: {
          Authorization: auth.authToken!,
        },
      }),
    });
  }
  return makeUseAxios();
})();
