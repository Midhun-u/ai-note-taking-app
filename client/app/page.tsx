import { ThemeProvider } from '@/components/context/ThemeContext'
import Header from '@/components/layout/Header'
import Home from '@/components/layout/Home'

const page = () => {

  return (

    <section className='w-full h-full flex flex-col gap-2'>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
      <Home />
    </section>

  )
}

export default page