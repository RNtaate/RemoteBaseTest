import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';
import React, {useState, useRef} from 'react'

function Movieform({ setActualMovieList, actualMovieList }) {

  const [err, setErr] = useState('');
  const movieNameRef = useRef();
  const ratingRef = useRef();
  const durationRef = useRef();
  let currentMovieTime = ""

  function resetErr() {
    setErr('');
  }

  function validateName() {
    const movieRegex = /^[\w\W]{2,}$/
    if(movieNameRef.current.value.trim().match(movieRegex)) {
      return true;
    }
    return false;
  }

  function validateDuration() {
    const durationRegexMins = /^[0-9]+[m]{1}$/
    const durationRegexHours = /^[0-9]+[.]{0,1}[0-9]{0,1}[h]$/
    if(durationRef.current.value.trim().match(durationRegexMins) || durationRef.current.value.trim().match(durationRegexHours)) {
      if(durationRef.current.value.toString().split("").includes('m')){
        currentMovieTime = durationRef.current.value.split("m");
        currentMovieTime = currentMovieTime[0];
        currentMovieTime = (currentMovieTime / 60)
        currentMovieTime = parseFloat(currentMovieTime.toFixed(1));
      }
      else if(durationRef.current.value.toString().split("").includes('h')) {
        currentMovieTime = durationRef.current.value.split("h");
        currentMovieTime = currentMovieTime[0];
        currentMovieTime = parseFloat((currentMovieTime * 1.0).toFixed(1));
      }
      return true;
    }
    return false;
  }

  function validateRating() {
    if(ratingRef.current.value){
      return true;
    }
    return false;
  }

  function overallValidation () {
    if(!validateName()) {
      setErr('Please Enter a valide name with 2 or more characters');
      return;
    }
    if(!validateDuration()) {
      setErr('Please specify time in hours or minutes (e.g. 2.5h or 150m)');
      return;
    }

    if(!validateRating()) {
      setErr('Please fill in a rating between 0 and 100');
      return;
    }

    let enteredMovie = {
      moviename: movieNameRef.current.value,
      rating: `Ratings: ${parseInt(ratingRef.current.value)}`,
      duration: currentMovieTime + " Hrs"
    }

    setActualMovieList([...actualMovieList, enteredMovie])
  }

  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={ e => {
          e.preventDefault()
          overallValidation();
          e.target.reset();
          } }>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input 
              type='text' 
              id='name'
              placeholder='Enter Movie Name'
              data-testid='nameInput'
              onInput={resetErr}
              ref={movieNameRef}
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input 
              type='number' 
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
              onInput={resetErr}
              max="100"
              min="0"
              required
              ref={ratingRef}
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input 
              type='text' 
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
              onInput={resetErr}
              ref={durationRef}
            />
          </div>
          {/* Use this div when time format is invalid */}
          {err && <div 
            className='alert error mb-30'
            data-testid='alert'
          >
            {err}
            {/* Please specify time in hours or minutes (e.g. 2.5h or 150m) */}
          </div>} 
          <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
            >
              Add Movie
            </button>
          </div>
          </form>
      </div> 
    </section>
  )
}

export default Movieform
