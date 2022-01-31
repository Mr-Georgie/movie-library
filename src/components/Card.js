import React from 'react';

import arrow from "../images/arrow-left.png"
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
                <div className="back" >
                    <img src={arrow} alt="go back" onClick={() => props.handleClick()}/>
                </div>
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
