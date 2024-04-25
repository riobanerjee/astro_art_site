import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';

interface Props {
    apiRoute: string;
}

const SearchBar = ({apiRoute}: Props) => {
  const fetchData = () => {
    fetch('http://127.0.0.1:5000/search')
      .then(response => response.json())
      .then(data => {
        // Assuming the data is an array with the plans data at index 0 and the meals data at index 1
        setPlansData(data[0]);
        setMealsData(data[1]);
      })
      .catch(error => console.error('Error fetching data:', error));
  };
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="query" placeholder="e.g. Galaxies" />

          <Button key="home-search" type="submit">
      <button onClick={fetchData}>Go</button>

            

          </Button>
      {/* Render your plans and meals or other UI elements here */}
    </div>
);
};

export default SearchBar;

