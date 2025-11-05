'use client'

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { SignIn } from "@clerk/nextjs"
import {
    X as CloseIcon
} from 'lucide-react'
import { ThemeContext } from "../context/ThemeContext"
import {dark} from '@clerk/themes'

const AuthForm = () => {

    const authContext = useContext(AuthContext)
    const themeContext = useContext(ThemeContext)

    if (!authContext?.authScreen) return

    return (

        <section className="w-screen h-screen flex justify-center pt-30 pb-10 overflow-auto backdrop-blur-xs absolute top-0 left-0">
            <div className="gap-1 w-min h-min flex justify-center  overflow-hidden relative">
                <CloseIcon
                    className="cursor-pointer self-end stroke-foreground absolute z-10 top-2 right-2"
                    strokeWidth={1.7}
                    size={25}
                    onClick={() => authContext?.handleChangeAuthScreen()}
                />
                <SignIn
                    routing="hash"
                    appearance={
                        themeContext?.theme === "dark"
                        ?
                        {
                            theme : dark
                        }
                        :
                        undefined
                    }
                    
                />
            </div>
        </section>

    )
}

export default AuthForm