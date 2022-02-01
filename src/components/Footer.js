import React from 'react'

export default function Footer() {
    // const credits = {
    //     display: "flex",
    //     gap: "10px"
    // }

    const head = {
        color: "white",
    }

    return (
        <footer>
            <div className='footer container'>
                <p>A Personal Project Made <br /> with <span className='emoji'>❤️</span> by <a href="https://twitter.com/GeorgeIsiguzo" className='my-link'> Georgie</a></p>
                <p className='credit'> <span style={head}>Credits:</span> 
                    <a href="https://gophie.cam/Server1" 
                    style={{textDecorationLine: "underline", color: "rgba(255, 255, 255, 0.521)"}}>Gophie.cam API</a>
                    <a href="https://www.figma.com/file/P2kjthmRBefcSZhrlzqLJD/Movie-Listing-Web-App-(Community)?node-id=401%3A6827" 
                    style={{textDecorationLine: "underline", color: "rgba(255, 255, 255, 0.521)"}}>Maileheroko UI</a>
                </p>
            </div>
        </footer>
    )
}
