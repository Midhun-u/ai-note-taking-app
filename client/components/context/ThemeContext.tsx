'use client'

import { createContext, ReactNode, useState } from "react";

export const ThemeContext = createContext<null | {theme : "light" | "dark" , toggleTheme : Function}>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {

    const [theme, setTheme] = useState<"light" | "dark">('light')
    const toggleTheme = () => {
        
        const body = document.getElementsByTagName("body")[0]

        if(theme === "light"){
            body.classList.add("dark")
            setTheme('dark')
        }else{
            body.classList.remove("dark")
            setTheme('light')
        }

    }

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