import React, {useState} from 'react';


export default function Header(props) {

  // create header items as react state variables
  const [categories, setActive] = useState(
    [
      {name: "All",isActive: true},
      {name: "NetNaija",isActive: false},
      {name: "FzMoviez",isActive: false}
    ]
  )

  // function to implement categories item active class
  function toggleActive(name) {
    setActive(prevCategories => {

      // first change the current active class to inactive
      let changedCategories = prevCategories.map((item) => {
        return item.isActive === true ? {...item, isActive: !item.isActive} : item
      })

      // then assign a new active class to categories item based on its name
      return changedCategories.map((item) => {
        return item.name === name ? {...item, isActive: !item.isActive} : item
      })
    })

    if (name === "All") {
      props.handleClick("")
    } else {
      props.handleClick(name)
    }
  }

  // use array.map(to display categories items)
  const categoryElements = categories.map(item => {
    return (
      <span key={item.name} onClick={()=> toggleActive(item.name)} 
      style={{color: item.isActive ? "#fff" : "#7B6EF6", background: item.isActive ? "#7B6EF6" : ""}}>
        {item.name}
      </span>
    )
    // #C3C8D4
  })

  

  return (

    <section className="header-list">
      <h1 className='header-text'>
      { !props.isSearchIconClicked ? "Movie Library" : "Search results"}
      </h1>
      { !props.isSearchIconClicked &&
      <p className='header-desc'>
        Get the <span>latest movies</span> from your <span>favorite sites</span> right here without ads and other distractions
      </p>
      }
      { props.isSearchIconClicked &&
      <p className='header-desc'>
        Make sure to check your spellings when searching
      </p>
      }
      { !props.isSearchIconClicked &&
      <div className='header-categories'>
        {categoryElements}
      </div>
      }
    </section>
  )
}
