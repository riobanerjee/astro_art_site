
import { useState, useEffect } from 'react';
import SearchBar from '../components/Searchbar';
import SearchBar2 from '../components/Searchbar_2';
import GalleryCard from '../components/GalleryCard'; // A component representing individual cards

// Sample data to populate the gallery
const initialGalleryData = [
  { id: 1, title: 'Galaxy A', description: 'A beautiful spiral galaxy.', imageUrl: '/images/galaxy-a.jpg' },
  { id: 2, title: 'Galaxy B', description: 'A stunning elliptical galaxy.', imageUrl: '/images/galaxy-b.jpg' },
  { id: 3, title: 'Galaxy C', description: 'A mesmerizing galaxy cluster.', imageUrl: '/images/galaxy-c.jpg' },
  { id: 4, title: 'Galaxy D', description: 'A captivating irregular galaxy.', imageUrl: '/images/galaxy-d.jpg' },
  { id: 5, title: 'Galaxy E', description: 'A breathtaking barred spiral galaxy.', imageUrl: '/images/galaxy-e.jpg' },
  { id: 6, title: 'Galaxy F', description: 'A magnificent lenticular galaxy.', imageUrl: '/images/galaxy-f.jpg' },
  { id: 7, title: 'Galaxy G', description: 'A spectacular starburst galaxy.', imageUrl: '/images/galaxy-g.jpg' },
  { id: 8, title: 'Galaxy H', description: 'A fascinating irregular galaxy.', imageUrl: '/images/galaxy-h.jpg' },
  // Add more items as needed
];

function GalleryPage() {
  const [galleryData, setGalleryData] = useState(initialGalleryData);
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filtering gallery data based on search query
  const filteredGalleryData = galleryData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="gallery-page">
              <div className="quarter-height-container">
            <SearchBar2 />
        </div>
      <div className="gallery-grid">
        {filteredGalleryData.length > 0 ? (
          filteredGalleryData.map((item) => (
            <GalleryCard
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
            />
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
}

export default GalleryPage;
