"use client"

import { assets } from "@/public/assets"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import {
    Moon as DarkThemeIcon,
    Sun as LightThemeIcon
} from 'lucide-react'
import { useContext } from "react"
import { ThemeContext } from "../context/ThemeContext"
import { useRouter } from "next/navigation"

const Header = () => {

    const context = useContext(ThemeContext)
    const navigate = useRouter()
 
    return (

        <header
            className="w-full flex justify-center h-auto px-5 py-2 border-b-2 fixed"
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
                    <Button
                        className="text-xs cursor-pointer hover:bg-primary-accent"
                        size="sm"
                        onClick={() => navigate.push("/notes")}
                    >
                        Get Started
                    </Button>
                </div>
            </nav>
        </header>

    )
}

export default Header