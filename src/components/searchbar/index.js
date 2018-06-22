import React from "react";
import "./searchbar.css";

const SearchBar = () => {
  return (
    <form id="searchBar" action="https://www.google.com/search" method="get">
      <input type="search" name="q" placeholder="Search..." />
      <input type="submit" value="Search" />
    </form>
  );
};

export default SearchBar;
