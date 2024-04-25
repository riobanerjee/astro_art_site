import { useState } from 'react'
import SearchBar from '../components/Searchbar'
import HomeCard from '../components/HomeCard'

interface Props {
    apiRoute: string;
}

function HomePage({apiRoute}: Props) {

  return (  
    <>
        <div className="half-height-container">
            <SearchBar apiRoute={apiRoute} />
        </div>
        <div className='white-space' />
        <HomeCard apiRoute={apiRoute} />
    </>
  )
}

export default HomePage
