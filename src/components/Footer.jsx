import React from 'react'
import { logo, logo1 } from '../assets'
import { MdMarkEmailUnread } from 'react-icons/md';
import { AiFillInstagram } from 'react-icons/ai';
import { BsTwitterX } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { PiYoutubeLogoFill } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";

const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "About Us",
        link: "#",
      },
      {
        name: "Contact",
        link: "#",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Partners",
        link: "#",
      },
      {
        name: "Blog",
        link: "/blogs",
      },
      {
        name: "Job vacancies",
        link: "#",
      },
    ],
  },
  {
    title: "Policies",
    links: [
      {
        name: "Privacy Policy",
        link: "https://mycrib.info/privacy",
      },
      {
        name: "Cookie Policy",
        link: "https://mycrib.info/privacy",
      },
      {
        name: "Terms of Service",
        link: "https://mycrib.info/terms-of-service",
      },
    ],
  },
]

export const socialMedia = [
  {
    id: '0',
    title: 'Instagram',
    icon: AiFillInstagram,
    url: '#',
  },
  {
    id: '1',
    title: 'Twitter',
    icon: BsTwitterX,
    url: '#',
  },
  {
    id: '2',
    title: 'Facebook',
    icon: FaFacebookF,
    url: '#',
  },
  {
    id: '3',
    title: 'YouTube',
    icon: PiYoutubeLogoFill,
    url: '#',
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section
    className='flex justify-center items-center sm:py-16 flex-col bg-black'
    >
      <div className='flex justify-center items-start flex-col sm:flex-row max-w-7xl mx-auto mb-8 w-full'>
        <div className='flex-1 sm:flex md:flex-col sm:flex-row justify-start mr-10 relative'>
          <div>
            <img
              src={logo}
              alt='logo'
              className='w-80 object-contain'
            />
            <div className='absolute right-[275px] bottom-15 '>
            <img
            src={logo1}
            alt='logo'
            className='w-12 h-17 object-contain'
          />
            </div>
          </div>
          <p className='mt-4 text-4xl font-light text-white'>
            Powered by 
            <a href='https://mycrib.app' className='text-yellow-600'> myCrib</a>
          </p>
        </div>
        <div className='flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10 mx-3'>
          {footerLinks.map((footerLink, index) => (
            <div
              key={index}
              className='flex flex-col ss:my-0 my-4 min-w-[150px]'
            >
              <h4 className='font-medium text-lg mb-6 text-white'>
                {footerLink.title}
              </h4>
              <ul className='list-none mt-4'>
                {footerLink.links.map((link, linkIndex) => (
                  <li
                    key={linkIndex}
                    className='text-white font-light text-base leading-7 hover:text-indigo-600 cursor-pointer mb-4'
                  >
                    <a href={link.link}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t border-gray-700 container mx-auto'>
        <p className='text-center text-white font-light text-base'>
          &copy; {currentYear} MyCrib. All Rights Reserved.
        </p>
        <div className='flex flex-row md:mt-0 mt-6'>
          {socialMedia.map((social, index) => (
            <a
              key={social.id}
              href={social.url}
              target='_blank'
              rel='noopener noreferrer'
              className={`w-10 h-10 rounded-full bg-white/10 flex justify-center items-center text-white hover:bg-indigo-600 mr-4`}
            >
              <social.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Footer