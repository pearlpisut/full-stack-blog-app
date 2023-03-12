//This file manages essential variables + functions needed to allow theme toggling of our website
import React, {useContext, useState} from 'react'

const ThemeContext = React.createContext()
const ThemeUpdateContext = React.createContext()

//allow other files to access darkTheme value
export function useTheme () {
    return useContext(ThemeContext)
}

//allow other files to access toggleTheme function
export function useThemeUpdate (){
    return useContext(ThemeUpdateContext)
}

export function ThemeProvider({children}) {
    // darkTheme indicates currently selected theme
    const [darkTheme, setdarkTheme] = useState(false)

    function toggleTheme(){
        setdarkTheme(darkTheme => !darkTheme)
    }
    return (
        // it means that the 'value' going to be received by the things wrapped in ThemeContext
        <ThemeContext.Provider value = {darkTheme}>
            <ThemeUpdateContext.Provider value = {toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}
