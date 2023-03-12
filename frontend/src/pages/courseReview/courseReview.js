// This page renders the whole overview page of coures reviews
import React, {useEffect, useRef, useState, useContext} from 'react'
import Card from './card'

import './courseReview.scss'
import {ThemeProvider, useTheme, useThemeUpdate} from './ThemeSetter'

export default function CourseReview() {

    //import the current theme info and function to toggle theme
    const darkTheme = useTheme()
    const ThemeToggled = useThemeUpdate()

    //configuration for styles in dark/light theme
    const ThemeStyle = {
      backgroundColor: darkTheme ? '#444' : '#fff',
      color: darkTheme? 'white' : 'black'
    }
    const cardThemeStyle = {
      color: darkTheme ? 'white' : 'black',
      background: !darkTheme ? 'linear-gradient(90deg, rgba(150,164,238,1) 0%, rgba(255,189,211,1) 61%, rgba(255,196,254,1) 100%)' :
      'linear-gradient(90deg, rgba(121,134,203,1) 0%, rgba(255,143,181,1) 61%, rgba(255,165,253,1) 100%)'
    }
    const newHeaderStyle = {
      color: darkTheme ? 'white' : 'black'
    }
    const newInputStyle = {
      'borderColor': darkTheme? '#e0dc69' : 'gray',
       opacity: darkTheme? 1: 0.5,
       background: darkTheme? '#feffe8': 'background: rgba(250, 255, 236, 0.5)'
    }

    const [allArticle, recordAllArticle] = useState([])
    const [shownArticle, setshownArticle] = useState([])
    const [searchkey, setSearchkey] = useState('')

    //showSearch prevents the allArticle gets rendered before it finishes fetching the first time    
    const showSearch = useRef(true)

    // getting all the reviews from database
    useEffect(()=>{
      fetch(`http://127.0.0.1:8000/api/course-reviews/`, {
        'method': 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${process.env.REACT_APP_API_KEY}`
        }
      })
      .then(resp => resp.json()) 
      .then((data) => recordAllArticle(data))
      .catch(error => console.log(error))
    }, [])

    // console.log('all', allArticle)

    //search bar: obtain courses that match search keyword
    useEffect(()=>{
      var tmpArr = []
      // console.log('effect used')
      if(allArticle !== [] && searchkey === '')
          setshownArticle(allArticle)
      else{
        for(let i=0; i<allArticle.length; i++){
          if(allArticle[i].code.includes(searchkey)){
            tmpArr.push(allArticle[i])
            console.log(545)
          }
        }
        setshownArticle(tmpArr)
        
        /*showSearch becomes false the first time when allArticle finishes fetching, ensuring that
        there will be articles available to shown upon the site visit*/
        showSearch.current = false
      }

    }, [searchkey, allArticle])

    // console.log(' search arr b4 print:  ', shownArticle)
    // console.log(' search key b4 print:  ', searchkey)
    // console.log(' all arr b4 print:  ', allArticle)

  return (
    <div className='reviewpage relative' style={ThemeStyle}>
        {/* theme toggle button */}
        <button onClick={ThemeToggled} id="ThemeSetter">
          {darkTheme ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8"
               id="sun">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg> :          
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8"
               id="moon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          }
        </button>
        
        <h1 id="titlereview" style={newHeaderStyle} className="">Courses Review</h1>
        
        {/* search bar */}
        <div className="relative searchbar-wrap">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className="w-5 h-5 ml-3 text-gray-500 pointer-events-none
            hover:bg-red-200">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          
          <input id="searchbar" maxLength="8" type="search" placeholder='search course'
          className="px-3 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-2 border-gray-500 ring-2 ring-gray-300
          focus:ring-red-200 focus:ring-5 pr-3 pl-10"  style={newInputStyle}
          onChange={e => {
            e = e.target.value
            if(e.length === 0) setshownArticle(allArticle);
            setSearchkey(e.toUpperCase())
            console.log("onchaged called")
          }} 
          />
        </div>

        {/* displaying all courses */}
        <div className="cardWrap-wrap">
          <div className = "cardWrap">
            {
              showSearch.current ?
              // before visitor searches for anything -> show content from allArticle
              allArticle.map(arrticle => {
                return(
                  <Card 
                    key = {arrticle.id}      
                    article = {arrticle}
                    style = {cardThemeStyle}
                  />
                )
              }) :
              //once the all article is surely obtained and rendered, the displayed article will come from searchArticle instead
              shownArticle.map(arrticle => {
                return(
                  <Card 
                    key = {arrticle.id}      
                    article = {arrticle}
                    style = {cardThemeStyle}
                  />
                )
              })
            }
          </div>
        </div>
    </div>
  )
}