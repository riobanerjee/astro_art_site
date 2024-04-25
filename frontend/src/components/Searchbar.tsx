import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';

interface Props {
    apiRoute: string;
}

const SearchBar = ({apiRoute}: Props) => {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="query" placeholder="e.g. Galaxies" />
      <Link to='/results'>
          <Button key="home-search" type="submit">
            Go
          </Button>
      </Link>
    </div>
  );
};

export default SearchBar;

