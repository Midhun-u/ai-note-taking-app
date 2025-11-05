import FeatureCard from "./FeatureCard"
import {
    BookText as SummaryIcon,
    Flame as ImproveIcon,
    Tag as TagIcon
} from 'lucide-react'

const Features = () => {

    return (

        <div className="mt-20 flex flex-col items-center gap-2 w-full">
            <h1 className="text-xl md:text-2xl text-center font-medium">
                Powerful <span className="text-primary">AI</span> Features
            </h1>
            <p className="text-disable-color text-sm text-center">
                Everything you need to take your note-taking to the next level
            </p>
            <div className="w-full flex flex-wrap justify-center gap-4 mt-5 mb-10">
                <FeatureCard 
                    title="AI Summaries"
                    content="Instantly generate concise summaries of your lengthy notes to capture key points at a glance."
                >
                    <div className="bg-primary-accent p-1 rounded-md flex justify-center items-center w-10 h-10">
                        <SummaryIcon
                            strokeWidth={1.3}
                            className="stroke-primary"

                        />
                    </div>
                </FeatureCard>
                <FeatureCard
                    title="AI Improve"
                    content="Enhance your writing with AI-powered suggestions for grammar, clarity, and style improvements."
                >
                    <div className="bg-primary-accent p-1 rounded-md flex justify-center items-center w-10 h-10">
                        <ImproveIcon
                            strokeWidth={1.3}
                            className="stroke-primary"
                        />
                    </div>
                </FeatureCard>
                <FeatureCard
                    title="Smart Tags"
                    content="Automatically generate relevant tags for your notes to keep everything organized and searchable."
                >
                    <div className="bg-primary-accent p-1 rounded-md flex justify-center items-center w-10 h-10">
                        <TagIcon
                            strokeWidth={1.3}
                            className="stroke-primary"
                        />
                    </div>
                </FeatureCard>
            </div>
        </div>

    )
}

export default Features