import { useState } from "react";
import SearchBar from "../components/Searchbar";
import GalleryCard from "../components/GalleryCard2"; // A component representing individual cards

// Sample data to populate the gallery
const initialGalleryData = [
  {
    id: 1,
    title: "Galaxy A",
    description: "A beautiful spiral galaxy.",
    imageUrl: "/images/galaxy-a.jpg",
  },
  {
    id: 2,
    title: "Galaxy B",
    description: "A stunning elliptical galaxy.",
    imageUrl: "/images/galaxy-b.jpg",
  },
  {
    id: 3,
    title: "Galaxy C",
    description: "A mesmerizing galaxy cluster.",
    imageUrl: "/images/galaxy-c.jpg",
  },
  {
    id: 4,
    title: "Galaxy D",
    description: "A captivating irregular galaxy.",
    imageUrl: "/images/galaxy-d.jpg",
  },
  {
    id: 5,
    title: "Galaxy E",
    description: "A breathtaking barred spiral galaxy.",
    imageUrl: "/images/galaxy-e.jpg",
  },
  {
    id: 6,
    title: "Galaxy F",
    description: "A magnificent lenticular galaxy.",
    imageUrl: "/images/galaxy-f.jpg",
  },
  {
    id: 7,
    title: "Galaxy G",
    description: "A spectacular starburst galaxy.",
    imageUrl: "/images/galaxy-g.jpg",
  },
  {
    id: 8,
    title: "Galaxy H",
    description: "A fascinating irregular galaxy.",
    imageUrl: "/images/galaxy-h.jpg",
  },
  // Add more items as needed
];

function calculateSimilarity(searchQuery, text) {
  const query = searchQuery.toLowerCase();
  const termLength = query.length;
  const textLength = text.length;

  if (termLength === 0 || textLength === 0) {
    return 0;
  }

  let matchCount = 0;

  for (let i = 0; i < termLength; i++) {
    for (let j = 0; j < textLength; j++) {
      if (query[i] === text[j]) {
        matchCount++;
        break; // Break to avoid counting duplicate characters
      }
    }
  }

  // Calculate similarity as the ratio of matched characters to the length of the longer string
  return matchCount / Math.max(termLength, textLength);
}

// Filtering gallery data based on search query and description similarity

function GalleryPage() {
  const [galleryData, setGalleryData] = useState(initialGalleryData);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle search input
  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  // Filtering gallery data based on search query

  // const filteredGalleryData = galleryData.filter((item) => {
  //   const titleSimilarity = calculateSimilarity(
  //     searchQuery,
  //     item.title.toLowerCase()
  //   );
  //   const descriptionSimilarity = calculateSimilarity(
  //     searchQuery,
  //     item.description.toLowerCase()
  //   );
  //   return titleSimilarity > 0 || descriptionSimilarity > 0;
  // });

  const bestMatch = galleryData.reduce(
    (bestMatch, item) => {
      const titleSimilarity = calculateSimilarity(
        searchQuery,
        item.title.toLowerCase()
      );
      const descriptionSimilarity = calculateSimilarity(
        searchQuery,
        item.description.toLowerCase()
      );
      const totalSimilarity = titleSimilarity + descriptionSimilarity; // Total similarity score

      // Update best match if the current item has higher similarity score
      if (totalSimilarity > bestMatch.similarityScore) {
        return {
          item,
          similarityScore: totalSimilarity,
        };
      } else {
        return bestMatch;
      }
    },
    { item: null, similarityScore: -1 }
  );

  let filteredGalleryData;

  if (searchQuery === "") {
    filteredGalleryData = galleryData.filter((item) => {
      const lowerCaseTitle = item.title.toLowerCase();
      const searchRegex = new RegExp(searchQuery, "i"); // "i" flag for case-insensitive matching
      return searchRegex.test(lowerCaseTitle);
    });
  } else {
    filteredGalleryData = bestMatch.item ? [bestMatch.item] : [];
  }

  return (
    <div className="gallery-page">
      <div className="quarter-height-container">
        <SearchBar onSearch={handleSearch} />{" "}
        {/* Pass handleSearch function as a prop */}
        {/* Pass handleSearch function as a prop */}
      </div>
      {searchQuery === "" && <p>Showing all</p>}
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
