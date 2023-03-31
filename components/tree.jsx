import Image from 'next/image'
import { useState } from 'react'

const Expandable = (props) => {
  const i = props
  const [toggle, setToggle] = useState(props.open || false)
  return (
    <span target="_blank" className={`cursor-pointer text-white border-2 mb-3 md:mb-5 pt-5 ${!toggle ? "rounded-full hover:bg-white hover:text-black" : 'rounded-3xl' }`} onClick={() => setToggle(v => !v)}>  
      <div className='pb-5 text-center'>{i.title}</div>
      <div className={`flex justify-center pb-5 ${!toggle ? 'hidden' : ''}`}>
        <ul className={`px-10 pb-5`}>
          {i.items.map((i, k) => {
            return (
              <li key={k} className='text-white list-disc' dangerouslySetInnerHTML={{ __html: i }}/>
            )
          })}
        </ul>
      </div>
    </span>
  )
}

export default (props) => {
  return (
    <div className='container mx-auto max-w-screen-md pt-10 md:pt-16 pb-16 px-5'>
      <style>{`body { background-color: ${props.backgroundColor}; }`}</style>
      <style>{`a { color: #FDBED6;  }`}</style>
      <style>{`a:hover { text-decoration: underline;  }`}</style>
      <style>{`.markdown p { padding-bottom:10px  }`}</style>
      <div className='pb-5'>
        <Image className='mx-auto rounded-full' src={`/${props.image}`} alt="profile image" width={96} height={96} />
      </div>
      {props.title && <h1 className='pb-5  text-white text-center text-xl'>{props.title}</h1>}
      {props.subtitle && <h2 className='pb-5  text-white text-center text-xl'>{props.subtitle}</h2>}
      {props.bio && <div className="text-white markdown" dangerouslySetInnerHTML={{ __html: props.bio }}/>}
      {props.infoList && (
        <div className='flex justify-center pb-5'>
          <ul className='ml-5'>
          {props.infoList.map((i, k) => {
            return (
              <li key={k} className='text-white list-disc' dangerouslySetInnerHTML={{ __html: i }} />
            )
          })}
          </ul>
        </div>
      )}
      {props.keyedList && (
        <div className=''>
          <ul className='ml-5'>
          {props.keyedList.map((i, k) => {
            return (
              <li key={k} className='text-white'>
                <p className='pb-5 text-center'>{i.title}</p>
                <div className='flex justify-center '>
                  <ul className="pb-5">
                    {i.items.map((i, k) => {
                      return (
                        <li key={k} className='text-white list-disc' dangerouslySetInnerHTML={{ __html: i }}/>
                      )
                    })}
                </ul>
                </div>
              </li>
            )
          })}
          </ul>
        </div>
      )}
      {props.links && (
        <div className='flex flex-col pt-2'>
          {props.links.map((link, k) => {
            if (link.title && link.items) {
              return (
                <Expandable {...link} key={k}></Expandable>
              )
            }
            return link.image ? (
              <a target="_blank" className='hover:bg-white hover:text-black text-white rounded-full border-2 mb-3 md:mb-5 text-center flex flex-row' key={link.id} href={link.url}>  
                <Image className='rounded-full flex pt-2 pl-2 pb-2' src={`/thumbs/${link.image}`} alt={`screencapture of ${link.text}`} width={46+8} height={46+8} />
                <p className="flex-grow pt-5 w-full text-center">{link.text}</p>
                <div style={{width:'50px', height: '50px'}}></div>
              </a>
            ) : (
              <a target="_blank" className='hover:bg-white hover:text-black text-white rounded-full border-2 mb-3 md:mb-5 text-center flex flex-row' key={link.id} href={link.url}>
                <p className="flex-grow pt-5 pb-4 w-full text-center">{link.text}</p>
              </a>
            )
          })}
        </div>
      )}
      <p className='text-white text-center pt-16'>
        Built using Tailwind, React and Next.js. Hosted on <a href="https://vercel.com/">Vercel</a>.<br/>
        Source code available at <a href="https://github.com/reggi/home" className='hover:underline' target="_blank">https://github.com/reggi/home</a>
      </p>
    </div>
  )
}
