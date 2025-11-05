'use client'

import { createContext, ReactNode, useEffect, useState } from "react";

export const ThemeContext = createContext<null | {theme : "light" | "dark" , toggleTheme : Function}>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<"light" | "dark">('light')
    
    const toggleTheme = () => {
        
        const body = document.getElementsByTagName("body")[0]

        if(theme === "light"){
            body.classList.add("dark")
            setTheme('dark')
            localStorage.setItem("theme" , "dark")
        }else{
            body.classList.remove("dark")
            setTheme('light')
            localStorage.setItem("theme" , "light")
        }

    }

    useEffect(() => {

        const theme = localStorage.getItem("theme")
        const body = document.getElementsByTagName("body")[0]
        
        if(theme === "light" || theme === "dark"){
            setTheme(theme)
            theme === "dark" ? body.classList.add("dark") : null
        }

    } , [])

    return (
        <ThemeContext
            value={
                {
                    theme : theme,
                    toggleTheme : toggleTheme
                }
            }
        >
            {children}
        </ThemeContext>
    )

}