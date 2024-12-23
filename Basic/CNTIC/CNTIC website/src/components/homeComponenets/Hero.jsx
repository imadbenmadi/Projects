
// import Button from '../Button'
import IMG from '../../assets/hero.png'
import React from 'react'
import SocialMedia from '../PublicComponents/SocialMedia'
function Hero() {
  return (
    <div className='md:grid lg:grid-cols-2 gap-[5rem] py-[3rem]'>
      <div className=''>
        <h1 className='text-5xl leading-[4rem] font-bold text-TextredColor mb-8 text-primaryColor'>CNTIC CLUB</h1>
        <p className=' text-TextColor text-lg leading-8 mb-5 text-gray-700 text-[15px]'>
        Notre Club de Nouvelle Technologie Informatique et Communication « CNTIC » est un club scientifique estudiantin destiné à toute personne voulant partager et développer sa créativité en vivant de nouvelles expériences en informatique.
Le CNTIC propose des formations et ateliers récurrents et gratuits dans les différents domaines de la programmation et du développement, animés par les étudiants d'université Kasdi Merbah.
        </p>
        {/* <Button /> */}
        <SocialMedia />
      </div>

      <img src={IMG} alt="" className='mt-[3rem]' loading='lazy' />

    </div>
  )
}

export default Hero