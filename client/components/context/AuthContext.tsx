'use client'

import { createContext, ReactNode, useState } from "react";

export const AuthContext = createContext<null | {authScreen : boolean , handleChangeAuthScreen : Function}>(null)

export const AuthProvider = ({children} : {children : ReactNode}) => {

    const [authScreen , setAuthScreen] = useState<boolean>(false)

    const handleChangeAuthScreen = () => {

        setAuthScreen(!authScreen)

    }

    return (

        <AuthContext value={{
            authScreen : authScreen,
            handleChangeAuthScreen : handleChangeAuthScreen
        }}>
            {children}
        </AuthContext>

    )

}