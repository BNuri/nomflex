import { useState, useEffect } from "react";

export const useAxios = (opts, api) => {
  const [state, setState] = useState({ loading: true, data: [], error: null });
  useEffect(() => {
    api(opts)
      .then((response) => {
        const { data } = response;
        setState({ ...state, data, loading: false });
      })
      .catch((error) => {
        setState({ ...state, loading: false, error: "Cannot find anything." });
      });
  }, []);

  return state;
};
