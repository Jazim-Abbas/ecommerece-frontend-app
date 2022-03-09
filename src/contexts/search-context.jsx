import React, { useContext, useState } from "react";

const SearchContext = React.createContext({
  data: {
    searchVal: "",
    sort: {
      sortKey: "",
      sortOrder: "",
    },
    priceRange: {
      min: "",
      max: "",
    },
    isOutOfStock: false,
  },
  handleSearchVal: () => {},
  handleSortKey: () => {},
  handleSortOrder: () => {},
  handleMinPrice: () => {},
  handleMaxPrice: () => {},
  handleIsOutOfStock: () => {},
});

export function SearchProvider({ children }) {
  const [searchVal, setSearchVal] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isOutOfStock, setIsOutOfStock] = useState(false);

  const handleSearchVal = (val) => {
    setSearchVal(val);
  };

  const handleSortKey = (val) => {
    setSortKey(val);
  };

  const handleSortOrder = (val) => {
    setSortOrder(val);
  };

  const handleMinPrice = (val) => {
    setMinPrice(val);
  };

  const handleMaxPrice = (val) => {
    setMaxPrice(val);
  };

  const handleIsOutOfStock = (val) => {
    setIsOutOfStock(val);
  };

  return (
    <SearchContext.Provider
      value={{
        data: {
          searchVal,
          sort: { sortKey, sortOrder },
          priceRange: { min: minPrice, max: maxPrice },
          isOutOfStock,
        },
        handleSearchVal,
        handleSortKey,
        handleSortOrder,
        handleMinPrice,
        handleMaxPrice,
        handleIsOutOfStock,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => useContext(SearchContext);
