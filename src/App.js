import React, { useState } from 'react'
import './App.css'
import 'h8k-components'

import { Movieform, Movieslist, Search } from './components'

const title = 'Favorite Movie Directory'

function App() {
  const [actualMovieList, setActualMovieList] = useState([]);
  const [actualSearchList, setActualSearchList] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  
  return (
    <div>
      <h8k-navbar header={ title } />
      <div className='layout-row justify-content-center mt-100'>
        <div className='w-30 mr-75'>
          <Movieform setActualMovieList={setActualMovieList} actualMovieList={actualMovieList}/>
        </div>
        <div className='layout-column w-30'>
          <Search actualMovieList={actualMovieList} setActualSearchList={setActualSearchList} setSearchFocus={setSearchFocus}/>
          {actualMovieList.length != 0 && 
          <>
            {(searchFocus && actualSearchList.length == 0) ?
            <div data-testid='noResult'>
              <h3 className='text-center'>No Results Found</h3>
            </div> : 
            <Movieslist actualMovieList={actualMovieList} actualSearchList={actualSearchList}/>}
          </>
          }
        </div>
      </div> 
    </div>
  )
}

export default App;
