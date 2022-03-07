import React, { useContext, useEffect, useState } from "react";
import * as favApi from "../apis/fav";
import useApi from "../hooks/use-api";

const FavContext = React.createContext({
  fav: {},
  isLoading: false,
});

export function FavProvider({ children }) {
  const [favItem, setFavItem] = useState({});
  const fav = useApi(favApi.getFavItems, { keyExtractor: "favorites" });
  const user = window.localStorage.getItem("user");

  useEffect(() => {
    fav.request().then((res) => {
      mapResDataToFavItems(res);
    });
  }, [user]);

  const mapResDataToFavItems = (res) => {
    const favs = res.data.favorites;
    const favObj = {};
    favs.forEach((fv) => {
      favObj[fv.itemId] = fv;
    });
    setFavItem(favObj);
  };

  return (
    <FavContext.Provider value={{ fav: favItem, isLoading: fav.isLoading }}>
      {children}
    </FavContext.Provider>
  );
}

export const useFavContext = () => useContext(FavContext);
