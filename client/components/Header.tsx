import { assets } from "@/public/assets"
import Image from "next/image"
import Link from "next/link"

const Header = () => {

    return (

        <header className="w-full flex justify-center h-auto px-5 py-2 mt-2">
            <nav className="w-full h-auto flex justify-between">
                <Link href={"/"} className="flex gap-2 items-center cursor-pointer">
                    <Image
                        src={assets.logo}
                        width={23}
                        height={23}
                        alt="logo"
                    />
                    <span className="text-md font-medium">AI Note Taking App</span>
                </Link>
                <div>
                    
                </div>
            </nav>
        </header>

    )
}

export default Header