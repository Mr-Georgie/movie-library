import React from 'react'
// import a from '../images/1.jpg'
// import b from '../images/2.jpg'

export default function Cards(props) {
  return (
    <div className='card' onClick={() => [props.handleClick(),props.getMovieDetail(props.movie)]}>
      <img src={props.movie.cover_photo_link} alt="movie screenshot" className='card-image'/>
      <div className="card-content">{props.movie.name}</div>
    </div>
  )
}
