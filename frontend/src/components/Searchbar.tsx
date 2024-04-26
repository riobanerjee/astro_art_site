import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    onSearch(query); // Ensure that onSearch is invoked with the query
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2 ">
      <Input
        className="input-shadow"
        type="text"
        placeholder="e.g. Galaxies"
        value={query}
        onChange={handleInputChange}
      />
      <Button
        className="input-shadow"
        key="home-search"
        type="submit"
        onClick={handleSearch} // Ensure that handleSearch is correctly attached to onClick
      >
        Go
      </Button>
    </div>
  );
};

export default SearchBar;
