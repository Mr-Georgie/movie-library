import React from 'react'
// import a from '../images/1.jpg'

import defaultPic from '../images/no-pic.png'

export default function Cards(props) {

  function handleImageError(event) {
    event.target.src = defaultPic
  }

  return (
    <div className='custom-card' onClick={() => props.getMovieDetail(props.movie)} 
    data-bs-toggle="modal" data-bs-target="#staticBackdrop">
      <img onError={handleImageError} src={props.movie.cover_photo_link} alt="movie screenshot" className='custom-card-image'/>
      <div className="custom-card-content">{props.movie.name}</div>
    </div>
  )
}
