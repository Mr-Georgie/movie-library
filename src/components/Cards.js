import React from 'react'
// import a from '../images/1.jpg'

import defaultPic from '../images/no-pic.png'

export default function Cards(props) {

  function handleImageError(event) {
    event.target.src = defaultPic
  }

  return (
    <div className='card' onClick={() => [props.handleClick(),props.getMovieDetail(props.movie)]}>
      <img onError={handleImageError} src={props.movie.cover_photo_link} alt="movie screenshot" className='card-image'/>
      <div className="card-content">{props.movie.name}</div>
    </div>
  )
}
