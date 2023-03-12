//This page renders each displayed card component in the course review overall page
import React, {useState, useEffect} from 'react'
import './card.scss'

import {useTheme} from './ThemeSetter'

export default function Card(props) {
  const darkTheme = useTheme()
  const [darkThemePass, setdarkThemePass] = useState(1)
  const course = props.article
  const ThemeStyle = props.style //import theme configuration from props passed from coureReview.js

  useEffect(()=>{
    if(darkTheme) setdarkThemePass(2)
    else setdarkThemePass(1)   //1 is light mode, 2 is dark mode
  },[darkTheme])

  return (
      <div className="card cursor-pointer hover:shadow-lg hover:scale-105 transform transition duration-200 ease-out
      border-double hover:from-indigo-200 hover:to-pink-200" 
      onClick={() => {
        //add the darkThemePass into url to indicate theme for fullscreen.js page to render
        window.location.replace(`http://localhost:3000/${course.code}/${darkThemePass}`)  
      }
      }
      style={ThemeStyle}>
          <h2 className="card-mem text-3xl font-bold"> {course.code} </h2>
          <h3 className="card-mem text-xl"> {course.title} </h3>
          <p className='card-mem instructor'> {course.instructor} </p>
      </div>
  )
}
