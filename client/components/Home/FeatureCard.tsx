import { ReactNode } from "react"
import { Card, CardHeader , CardContent} from "../ui/card"

type FeatureCardType = {
    children : ReactNode,
    title : string,
    content : string
}

const FeatureCard = ({children , title , content} : FeatureCardType) => {

    return (


        <Card className="rounded-md gap-0 w-80 px-4 hover:-translate-y-2 transition-all duration-200 hover:shadow-md hover:shadow-primary">
            {children}
            <CardHeader className="p-0 mt-3 text-md font-light">
               {title}
            </CardHeader>
            <CardContent className="p-0 m-0 text-sm text-disable-color">
                {content}
            </CardContent>
        </Card>

    )
}

export default FeatureCard