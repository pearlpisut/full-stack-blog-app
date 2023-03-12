//This page governs the urls routing of all react components

import React, { ThemeProvider } from "./pages/courseReview/ThemeSetter.js"
import './App.css';
// import Header from './components/Header/Header.js'
import {Route, Routes} from 'react-router-dom'
import {CourseReview, Countries, Home} from "./pages/pages_index"
import Fullscreen from './pages/courseReview/fullscreen'

export default function App() {
  return (
    <div className="App">
      <Routes>
        {//These routes will be used once the Homepage and other pages are finished. 
        
        /* <Route path='/' element = {<Home/>} />
        <Route path='/course-review/:id/:currentTheme' element = {<ThemeProvider><Fullscreen /></ThemeProvider>} />
        <Route path='/course-review' element = {<ThemeProvider><CourseReview /></ThemeProvider>} />
        <Route path='/countries' element = {<Countries />} /> */
        }

        <Route path='/:id/:currentTheme' element = {<ThemeProvider><Fullscreen /></ThemeProvider>} />
        <Route path='/' element = {<ThemeProvider><CourseReview /></ThemeProvider>} />
      </Routes>
    </div>
  );
}