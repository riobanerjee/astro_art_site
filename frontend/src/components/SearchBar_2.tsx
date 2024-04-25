import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react';

interface Props {
    apiRoute: string;
}


const SearchBar2 = ({apiRoute}: Props) => {
  const [metaData, setMetaData] = useState({});

  const fetchData = () => {
    fetch('http://127.0.0.1:5000/search')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is an array with the plans data at index 0 and the meals data at index 1
        setMetaData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  return (
    
    <div className="flex w-full max-w-sm items-center space-x-2 ">
      <Input className="input-shadow" type="query" placeholder="e.g. Galaxies" />
      <Link to='/results'>
          <Button className="input-shadow" key="home-search" type="submit" onClick={fetchData}>
            Go
          </Button>
      </Link>
    </div>
  );
};

export default SearchBar2;
