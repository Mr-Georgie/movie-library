import React from 'react'
// import logo from '../images/logo.png'
import logo from '../images/ml-logo.png'
import searchIcon from '../images/search.png'
import close from '../images/close-square.png'

export default function Navbar(props) {

    function getInput(event) {
        props.handleChange(event.target.value)
    }

    return (
        <div className='navbar'>
            <nav className='container' style={{justifyContent: !props.isSearchIconClicked ? "space-between": "flex-start"}}>
                {!props.isSearchIconClicked && 
                    <img src={logo} className="nav-logo" alt="logo" onClick={() => props.handleClick()}/>
                }
                {!props.isSearchIconClicked && 
                    <img src={searchIcon} className="search-icon" 
                    alt="search icon" onClick={()=> props.searchBarHandler()}/>
                }
                {props.isSearchIconClicked && 
                    <div className="searchbar" style={{width:"100%"}}>
                        <input type="text" placeholder='Search by name, year, etc e.g 2021, jumanji...' 
                        style={{width:"100%"}}
                        onChange={getInput}
                        value={props.inputText}
                        />
                        <span className="clear"
                            onClick={() => props.clearInput()}>clear</span>
                    </div>   
                }
                {props.isSearchIconClicked && 
                    <img src={close} className="close" 
                    alt="search icon" onClick={()=> props.searchBarHandler()}/>
                }
            </nav>
        </div>
    )
}
