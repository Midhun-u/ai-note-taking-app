import { SignIn } from "@clerk/nextjs"

const page = () => {

    return (

        <section className="py-15 w-full flex justify-center items-center">
            <SignIn />
        </section>

    )
}

export default page