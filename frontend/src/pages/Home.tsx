import { useState } from 'react'
import SearchBar from '../components/Searchbar'
import HomeCard from '../components/HomeCard'

interface Props {
    apiRoute: string;
}

function HomePage({apiRoute}: Props) {

  const homeCardMeta = { "query": "Galaxy clusters", "authors": ["Author 4"], "tags": ["tag1", "tag2", "tag9"], "created_at": "2024-04-20T10:30:00" }

  return (  
    <>
        <div className="half-height-container">
            <SearchBar apiRoute={apiRoute} />
        </div>
        <div className='white-space' />
        <HomeCard apiRoute={apiRoute} query={homeCardMeta["query"]} authors={homeCardMeta["authors"]} tags={homeCardMeta["tags"]} date={homeCardMeta["created_at"]} />
    </>
  )
}

export default HomePage
