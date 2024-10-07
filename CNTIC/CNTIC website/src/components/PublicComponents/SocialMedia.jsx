import React from 'react'
import { BsLinkedin, BsGithub} from 'react-icons/bs'
import { MdAlternateEmail } from 'react-icons/md'
import { FaInstagram, FaTwitterSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function SocialMedia() {
  return (
    <div className='flex mt-8 w-fit items-center gap-3' >
      <Link to="https://www.linkedin.com/company/cntic-club/" target='_blank'>
        <BsLinkedin size={25} className='text-TextColor cursor-pointer text-primaryColor' />
      </Link>
      <Link to="mailto:fntic.cntic@gmail.com">
        <MdAlternateEmail size={25} className='text-TextColor cursor-pointer text-primaryColor' />
      </Link>

      <Link to="https://github.com/cntic" target='_blank'>
        <BsGithub size={25} className='cursor-pointer text-primaryColor' />
      </Link>

      <Link to="https://www.instagram.com/cntic_club/" target='_blank'>
        <FaInstagram size={25} className='text-TextColor cursor-pointer text-primaryColor' />
      </Link>
    </div>
  )
}

export default SocialMedia