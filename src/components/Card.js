import React from 'react';

// remove later
import movieData from '../data/data'


export default function Card(props) {

    const relatedMovie = movieData.map(movie => {
        return (
            <p key={movie.id} onClick={() => props.getMovieDetail(movie)}>{movie.name}</p> 
        )
    })

    return (
        <div className='card-page-container'>
            <div className='main-content'>
                <h1 className='header-text'>
                    <span >{props.movieInfo.name} </span>
                
                </h1>
                
                <img src={props.movieInfo.cover_photo_link} alt="" className='card-img'/>
                <p className="movie-description">{props.movieInfo.description}</p>
                <p className='movie-description'>Size: <span className='movie-size'>{props.movieInfo.size}</span></p>
                <p className='movie-description'>Category: <span className='movie-size'>{props.movieInfo.category}</span></p>
                <div className="download-section">
                    <a href='hi.com'>Download</a>
                </div>
            </div>
            <div className="sidebar">
                <h2 className='sidebar-header'>Related Movies</h2>
                <div className='sidebar-movies'>
                    {relatedMovie}
                </div>
                
            </div>
        </div>
    )
}
