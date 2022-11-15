import React, {useRef} from 'react'

function Search({ setActualSearchList, actualMovieList, setSearchFocus }) {

  const searchRef = useRef();

  function updateSearchList() {
    if (searchRef.current.value.length >= 2) {
      setSearchFocus(true);
      let newArray = actualMovieList.filter(movie => movie.moviename.toLowerCase().includes(searchRef.current.value.toString().toLowerCase()));
      setActualSearchList(newArray);
    }else {
      setSearchFocus(false);
      setActualSearchList([]);
    }
  }

  return (
    <section className='layout-row justify-content-center mb-40'>
      <input
        type='text'
        placeholder='Search for movie by name'
        className='w-75 py-2'
        data-testid='search'
        ref = {searchRef}
        onInput={updateSearchList}
        onBlur={() => {
          setSearchFocus(false);
        }}
      />
    </section>
  )
}

export default Search
