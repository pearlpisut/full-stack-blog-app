//This page renders the fullscreen view of each review
import React, {useEffect, useState, useRef} from 'react'
import { useParams, Link } from 'react-router-dom'
import './fullscreen.scss'

import parse from 'html-react-parser'

import {useThemeUpdate} from './ThemeSetter'

export default function Fullscreen() {
  
    const ThemeToggled = useThemeUpdate()
    
    //receive parameters from variables in url  -->  currentTheme is 1 when it is light theme, 2 for dark theme.
    const {id, currentTheme} = useParams()

    const [review, setReview] = useState('')

    //theme style configuration
    const newArticleTheme = {
        background: currentTheme == 1 ? 'white' : '#333',
        color: currentTheme == 1 ? 'black' : 'white'
    }

    const newdirectionTxtTheme = {
        background: currentTheme == 1? 'white' :'#9d9d9e',
        color: currentTheme == 1 ? 'black' : 'white'
    }

    const [currentarr, setCurrentArr] = useState({})  //storing the current article to show
    const [allArr, setallArr] = useState({}) //storing all fetched articles
    const [ind, setInd] = useState(0)  //to track which article to shown by its id (on the database)
    
    //startParse prevent parsing to take place before currentArr is defined
    const startParse = useRef(false)

    function updateArr(){
        setCurrentArr(allArr[ind])
        // modifying the link when looking at next/previous article without refreshing
        window.history.pushState({}, null, `http://localhost:3000/${allArr[ind].code}/${currentTheme}`);
    }

    //for navigating through next/previous article
    function nextOne(){
        if(ind === allArr.length - 1)
        setInd(0)
        else setInd(ind => ind+1)
        updateArr()
    }
    function prevOne(){
        if(ind === 0) setInd(() => allArr.length-1)
        else setInd(ind => ind-1)
        updateArr()
    }

    //fetching all articles in the database
    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/course-reviews/`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${process.env.REACT_APP_API_KEY}`
            }
        })
        .then(resp => resp.json()) 
        .then((data) => setallArr(data))
        .catch(error => console.log(error))
    }, [])

    //to allow rendering of html-tagged content (reviews), after currentArr is defined upon changing
    useEffect(()=>{
        if(startParse.current){
            setReview(parse(allArr[ind].review))
        }
        else startParse.current = true
    }, [currentarr])

    //show the clicked article + update article to show when the article_id to show is changed
    useEffect(()=>{
        for(let i = 0; i < allArr.length; i++){
            if(allArr[i].code === id){
                setCurrentArr(allArr[i]);
                setInd(i)
                setReview(parse(allArr[i].review))
                break;
            }
        }
    }, [id, allArr])
    // console.log(currentarr)


    return (
    <div id="whole-article" style={newArticleTheme}>

        <div id="but-container">
            <Link id="link" to="/">
            <button id="backBtn" className="back-btn bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-xl" 
            onClick={currentTheme==1?null:ThemeToggled}>
            <span>Back to reviews</span>  
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>

            </button>
            </Link>
        </div>
        <div id="article-body">
            <h1 id="course-code" className="text-5xl">{currentarr.code}</h1>
            <h2 id="course-name" className="text-3xl">{currentarr.title}</h2>
            <div className="para-wrapper">
                <p id="instructor"><em>Instructor:&nbsp;&nbsp;&nbsp;&nbsp;</em> {currentarr.instructor}</p>
                <p id="data-taken" ><em>Date Taken:&nbsp;&nbsp;</em> {currentarr.dateTaken}</p>
                <p id="assessment"><em>Assessment:&nbsp;&nbsp;</em>{currentarr.assessment}</p>
                <p component="span" id="review">{review}</p>
                {/* {review} */}
            </div>
        </div>
        <hr className='solid' />
        <ul className="courseNextPrev">
            <li>
                <button onClick={prevOne}
                    className="hover:scale-105 transform transition duration-200 ease-out focus:bg-teal-500"
                ><span id="prevTxt" className="directionTxt" style={newdirectionTxtTheme}>previous</span><span className='reviewTxt'>review</span></button>
            </li>
            <li>
                <button onClick={nextOne}
                    className="hover:scale-105 transform transition duration-200 ease-out focus:bg-teal-500"
                ><span id="nextTxt" className="directionTxt" style={newdirectionTxtTheme}>next</span><span className='reviewTxt'>review</span></button>
            </li>
        </ul>
    
    </div>
  )
}
