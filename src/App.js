import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar'
import Header from './components/Header'
import Cards from './components/Cards'
// import Card from './components/Card'
import Footer from './components/Footer'

import LoadingContainer from './components/Animation';

import Modal from './components/Modal';
// import WelcomeModal from './components/WelcomeModal';


export default function App() {

    // The back-to-top button is hidden at the beginning
    const [showButton, setShowButton] = useState(false);
    
    // 
    // const [isCardClicked, setisCardClicked] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState({})
    
    const [inputText, setInputText] = useState("")
    const [filterText, setFilterText] = useState("")
    const [showSearchBar, setShowSearchBar] = useState(false)

    const [error, setError] = useState(false)
    const [isUserSearching, setIsUserSearching] = useState(false)

    // new
    const [movieData, setMovieData] = useState([])

    // uses state to toggle between search icon and search input field
    function clickSearchIcon() {
        setShowSearchBar(prevState => !prevState)

        // capture when user attempts to search
        setIsUserSearching(prevState => !prevState)

        // clear input field when input field is closed
        setInputText("")
    }

    // card component
    function movieDetail(movieInfo) {
        // saves movie detail to state before rendering
        setSelectedMovie(movieInfo)
    }

    // for navbar component
    function handleChange(value) {
        setInputText(value.toLowerCase())
    }

    // for navbar component
    function clearInput() {
        setInputText("")
    }

    // for header component, when header categories are clicked
    function handleClick(name) {
        setFilterText(name)
    }

    // scroll to top effect
    useEffect(() => {
        window.addEventListener("scroll", () => {
          if (window.pageYOffset > 600) {
            setShowButton(true);
          } else {
            setShowButton(false);
          }
        });
      }, []);

    // This function will scroll the window to the top 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };

    // http://localhost:5000/ -> local
    // https://movie-library-backend.herokuapp.com/ -> live

    useEffect(() => {
        fetch("https://movie-library-backend.herokuapp.com/getData/?page=1,2,3,4,5&engine=netnaija,fzmovies")
            .then(res => res.json())
            .then(data => setMovieData(data))
            .catch(err => {
                console.log("An error occured: ", err);
                setError(true);
            })
    }, [])

    console.log("filter: ",filterText)
    console.log("Error? ", error)

    // lets filter movieData in 4 steps
    // 1.
    const filter1 = movieData.filter(movie => movie.engine === "NetNaija" && movie.is_series === false && movie.category !== "")
    // 2.
    const filter2 = filter1.filter(movie => movie.engine === "NetNaija" && movie.is_series === false && movie.category !== null)
    // 3.
    const filter3 = movieData.filter(movie => movie.engine === "NetNaija" && movie.is_series === true)
    // 4.
    const filter4 = movieData.filter(movie => movie.engine !== "NetNaija")

    // merge all filters
    const filteredMovieData = [...filter2, ...filter3, ...filter4]

    // console.log(filteredMovieData.filter(movie => movie.engine === "NetNaija" && movie.is_series === false && (movie.category === null || movie.category === "")))

    // this should be rendered when the user uses the header category to filter movies
    const filteredCards = filteredMovieData.filter(movie => movie.engine === filterText).map((movie, index) => {

        return (
            <Cards
                key={index}
                movie={movie}
                getMovieDetail={movieDetail}
            /> 
        )
    })

    // this should be rendered when user uses input field to search for movie
    const searchedCards = filteredMovieData.filter(movie => movie.name.toLowerCase().indexOf(inputText) > -1).map((movie, index) => {

        return (
            <Cards
                key={index}
                movie={movie}
                getMovieDetail={movieDetail}
            /> 
        )
    })

    // this should be rendered when no movie was found either by filter or searching or if the app could not get movies from API
    const noMovieFound = (  
        <div className='no-movie-found'>
            <h1 className='heading'>
                {error ? "Oops! Please reload this page." : "Sorry, No results found"}
            </h1>
            <p className='text'>
                {error ? "An error occured. Possibly your network connection is not stable" : "There are no movies or TV shows matching your search terms."}
            </p>
        </div>
    )
    

    return (
        <>
            <div id='body'>
                <Navbar 
                    /**
                     * this navbar contains the app logo and searchbar /  searchbar icon
                     * it receives the inputted search term, then the handleChange function stores searched term to react state
                     * react uses searched term to filter the cards rendered
                     */ 
                    // handleClick={clickCard}
                    searchBarHandler={clickSearchIcon}
                    isSearchIconClicked={showSearchBar}
                    inputText={inputText}
                    handleChange={handleChange}
                    clearInput={clearInput}

                />
                <div className="app-container">
                    <Header 
                        isSearchIconClicked={showSearchBar}
                        filterText={filterText}
                        handleClick={handleClick}
                    />
                    {filterText === "" && 
                    // show searched cards if user is not filtering by header category
                    <div className='cards-list'>
                        {searchedCards.length !== 0 ? searchedCards : 
                        !error ? isUserSearching ? noMovieFound : <LoadingContainer /> : noMovieFound}
                    </div>
                    }

                    {filterText !== "" && 
                        // show filtered cards when user is filtering
                        <div className='cards-list'>
                            {filteredCards.length !== 0 ? 
                                /**
                                 * is user searching? show searched cards
                                 * else show filtered cards
                                 * user searching or filtering was not found? show no movie found 
                                 */
                                <>{!showSearchBar ? filteredCards: searchedCards} </> : 
                                !error ? <LoadingContainer /> : noMovieFound }
                        </div>
                    }
                    </div>
                
                <Modal 
                    movieInfo={selectedMovie}
                    // handleClick={clickCard}
                    getMovieDetail={movieDetail}
                    filteredMovieData={movieData}
                />

                {/* <WelcomeModal /> */}
            </div>

            {showButton && (
                <button onClick={scrollToTop} className="back-to-top">
                ☝️
                </button>
            )}
            {/* &#8679; is used to create the upward arrow */}
            
            <Footer />
        </>
    )
}
