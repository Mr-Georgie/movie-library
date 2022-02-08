import React from 'react';

import defaultPic from '../images/no-pic.png'


export default function Modal(props) {

    function handleImageError(event) {
        event.target.src = defaultPic
    }

    return (
        // <!-- Modal -->
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <div className="modal-top-end">
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <h5 className="modal-title" id="staticBackdropLabel">
                  {props.movieInfo.name}
                </h5>
                <img onError={handleImageError} src={props.movieInfo.cover_photo_link} alt="" className='custom-card-img'/>
                <p className="movie-description">{props.movieInfo.description}</p>
                <p className='movie-description'>Size: <span className='movie-size'>{props.movieInfo.size}</span></p>
                <p className='movie-description'>Category: <span className='movie-size'>{props.movieInfo.category}</span></p>
                <div className="download-section">
                    <a href={props.movieInfo.download_link}>Download</a>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}
