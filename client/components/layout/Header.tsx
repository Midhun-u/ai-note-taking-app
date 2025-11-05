"use client"

import { assets } from "@/public/assets"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import {
    Moon as DarkThemeIcon,
    Sun as LightThemeIcon,
    MenuIcon,
    X as CloseIcon
} from 'lucide-react'
import { useContext, useState } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { useRouter } from "next/navigation"

const Header = () => {

    const context = useContext(ThemeContext)
    const navigate = useRouter()
    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    return (

        <header
            className="w-full flex justify-center h-auto px-5 py-2 border-b-2 fixed backdrop-blur-xs"
        >
            <nav
                className="w-full h-auto flex justify-between gap-5"
            >
                <Link
                    href={"/"}
                    className="flex gap-2 items-center cursor-pointer"
                >
                    <Image
                        src={assets.logo}
                        width={23}
                        height={23}
                        alt="logo"
                        className="w-5 h-5 md:w-6 md:h-6"
                    />
                </Link>
                <div className="flex items-center gap-3">
                    <div
                        className="cursor-pointer p-2 rounded-full hover:bg-popover"
                        onClick={() => context?.toggleTheme()}
                    >
                        {
                            context?.theme === "light"
                                ?
                                <DarkThemeIcon
                                    size={21}
                                    strokeWidth={1.5}
                                    className="stroke-foreground"
                                />
                                :
                                <LightThemeIcon
                                    size={21}
                                    strokeWidth={1.5}
                                    className="stroke-foreground"
                                />
                        }
                    </div>
                    {
                        showSidebar
                            ?
                            <CloseIcon
                                size={21}
                                className="sm:hidden stroke-foreground z-20"
                                onClick={() => setShowSidebar(false)}
                            />
                            :
                            <MenuIcon
                                size={21}
                                className="sm:hidden stroke-foreground z-20"
                                onClick={() => setShowSidebar(true)}
                            />
                    }
                    <div className="flex gap-2">
                        <Button
                            className="text-xs hidden sm:block cursor-pointer hover:bg-primary-hover"
                            size="sm"
                            onClick={() => navigate.push("/notes")}
                        >
                            Get Started
                        </Button>
                        <Button
                            className="text-xs hidden sm:block cursor-pointer hover:bg-primary-hover"
                            size="sm"
                        >
                            Sign In
                        </Button>
                    </div>
                    <aside className={`text-primary flex ${showSidebar ? "right-0" : "-right-[100vw]"} gap-1 transition-all h-screen duration-300 flex-col w-screen absolute top-0 px-5 items-end py-15 z-10 bg-background`}>
                        <Link
                            className="border-b-2 w-full flex justify-end text-md p-2"
                            href={"/notes"}
                        >Get Started
                        </Link>
                        <Link
                            className="border-b-2 pb-2 w-full flex justify-end text-md p-2"
                            href={"/"}
                        >Sign In
                        </Link>
                    </aside>
                </div>
            </nav>
        </header>

    )
}

export default Header