import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar'
import Header from './components/Header'
import Cards from './components/Cards'
import Card from './components/Card'
import Footer from './components/Footer'

// remove this below
// import data from './data/data'



export default function App() {

    const [isCardClicked, setisCardClicked] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState({})
    
    const [inputText, setInputText] = useState("")
    const [filterText, setFilterText] = useState("")
    const [showSearchBar, setShowSearchBar] = useState(false)

    // new
    const [movieData, setMovieData] = useState([])

    // handles which card is shown in detail
    function clickCard() {
        setisCardClicked(prevCardState => !prevCardState)
        // setShowSearchBar(prevState => !prevState)
    }

    // uses state to toggle between search icon and search input field
    function clickSearchIcon() {
        setShowSearchBar(prevState => !prevState)
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

    useEffect(() => {
        fetch(`https://gophie-ocena.herokuapp.com/list/?page=1${filterText === "" ? "&" : `&engine=${filterText.toLowerCase()}` }`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "Accept"
                },
                mode: 'cors'
            })
            .then(res => res.json())
            .then(data => setMovieData(data))
    }, [filterText])

    console.log(movieData.length)

    // this should be rendered when the user uses the header category to filter movies
    const filteredCards = movieData.filter(movie => movie.engine === filterText).map(movie => {

        return (
            <Cards
                key={movie.id}
                movie={movie}
                handleClick={clickCard}
                getMovieDetail={movieDetail}
            /> 
        )
    })

    // this should be rendered when user uses input field to search for movie
    const searchedCards = movieData.filter(movie => movie.name.toLowerCase().indexOf(inputText) > -1).map(movie => {

        return (
            <Cards
                key={movie.id}
                movie={movie}
                handleClick={clickCard}
                getMovieDetail={movieDetail}
            /> 
        )
    })

    // this should be rendered when no movie was found either by filter or searching or if the app could not get movies from API
    const noMovieFound = (  <div className='no-movie-found'>
                                <h1 className='heading'>Sorry, No results found</h1>
                                <p className='text'>There are no movies or TV shows matching your search terms.</p>
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
                handleClick={clickCard}
                searchBarHandler={clickSearchIcon}
                isSearchIconClicked={showSearchBar}
                inputText={inputText}
                handleChange={handleChange}
                clearInput={clearInput}

            />
            
            { isCardClicked === false && 
            // show all cards/movies if no card/movie is selected or clicked
                <div className="container">
                    <Header 
                        isSearchIconClicked={showSearchBar}
                        handleClick={handleClick}
                    />
                    {filterText === "" && 
                    // show searched cards if user is not filtering by header category
                    <div className='cards-list'>
                        {searchedCards.length !== 0 ? searchedCards : noMovieFound}
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
                            <>{!showSearchBar ? filteredCards: searchedCards} </> : noMovieFound}
                    </div>
                    }
                </div>
            }
            {isCardClicked === true && 
            // show a particular movie in detail when its clicked
            <div className="container">
                <Card 
                    movieInfo={selectedMovie}
                    handleClick={clickCard}
                    getMovieDetail={movieDetail}
                    movieData={movieData}    
                />
            </div>
            }
            </div>
            
            <Footer />
        </>
    )
}
