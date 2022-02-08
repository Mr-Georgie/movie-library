import React from 'react';

import arrow from "../images/arrow-left.png"
import defaultPic from '../images/no-pic.png'


export default function Card(props) {

    const relatedMovie = props.movieData.slice(1, 8).map((movie, index) => {
        return (
            <p key={index} onClick={() => props.getMovieDetail(movie)}>{movie.name}</p> 
        )
    })

    function handleImageError(event) {
        event.target.src = defaultPic
    }

    return (
        <div className='card-page-container'>
            <div className='main-content'>
                <div className="back" >
                    <img src={arrow} alt="go back" onClick={() => props.handleClick()}/>
                </div>
                <h1 className='header-text'>
                    <span >{props.movieInfo.name} </span>
                </h1>
                
                <img onError={handleImageError} src={props.movieInfo.cover_photo_link} alt="" className='custom-card-img'/>
                <p className="movie-description">{props.movieInfo.description}</p>
                <p className='movie-description'>Size: <span className='movie-size'>{props.movieInfo.size}</span></p>
                <p className='movie-description'>Category: <span className='movie-size'>{props.movieInfo.category}</span></p>
                <div className="download-section">
                    <a href={props.movieInfo.download_link}>Download</a>
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
