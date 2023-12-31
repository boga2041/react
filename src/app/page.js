import Image from 'next/image'
import Link from 'next/link'
import Header from './components/layout/Header'
import Hero from './components/layout/Hero'
import HomeMenu from './components/layout/HomeMenu'
import SectionHeaders from './components/layout/SectionHeaders'

export default function Home() {
  return (
    <>
      
      <Hero></Hero>
      <HomeMenu></HomeMenu>
      <section className="text-center my-16">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} ></SectionHeaders>
        <div className='max-w-2xl max-w-md text-gray-500 mx-auto mt-4 flex
        flex-col gap-4'>
        <p >
        Lorem ipsum dolor sit ame
        </p>
        <p>
          Lorem
        </p>

        <p>
        Lorem ipsum dolor sit ame
        </p>

        </div>
       
      </section>

      <section className='text-center my-8'>
        <SectionHeaders 
        
        subHeader={'Don\'t hesitate'} 
        mainHeader={'Contact us'}></SectionHeaders>
        <div className='mt-8'>
        <a className='text-4xl underline text-gray-500 ' href='tel:+46738123123'>+46 738 123 123</a>
        </div>
     </section>
    
    </>
  )
}
