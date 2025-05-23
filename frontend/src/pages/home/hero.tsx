import type { FC } from "react";



const Hero:FC = () => {
  return (
    <div className="hero bg-center bg-cover h-[200vh] md:h-[30vh] grid place-items-center  rounded-3xl p-5">
     <div className="text-white text-center">
       <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-5">Tripster ile Konaklama Rezarvasyonu Yap</h1>
       <p className="md:text-lg lg:text-xl">Dünya çapında 1.340.076 oda seni bekliyor!</p>
     </div>
    </div>
  )
}

export default Hero;