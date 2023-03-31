import ReactMarkdown from 'react-markdown'
import Image from 'next/image'

export default (props) => {
  return (
    <div className='container mx-auto max-w-screen-md p-10 pt-16'>
      <style>{`body { background-color: ${props.backgroundColor}; }`}</style>
      <style>{`a { color: #FDBED6;  }`}</style>
      <style>{`a:hover { text-decoration: underline;  }`}</style>
      <style>{`.markdown p { padding-bottom:10px  }`}</style>
      <div className='pb-5'>
        <Image className='mx-auto rounded-full' src={`/${props.image}`} alt="profile image" width={96} height={96} />
      </div>
      {props.title && <h1 className='pb-5 text-white text-center text-xl'>{props.title}</h1>}
      {props.subtitle && <h2 className='pb-5 text-white text-center text-xl'>{props.subtitle}</h2>}
      {props.bio && <div className="text-white px-5 markdown" dangerouslySetInnerHTML={{ __html: props.bio }}/>}
      {props.infoList && props.infoList.length && (
        <div className='flex justify-center pb-8'>
          <ul className='px-10 ml-5'>
          {props.infoList.map((i, k) => {
            return (
              <li key={k} className='text-white list-disc' dangerouslySetInnerHTML={{ __html: i }} />
            )
          })}
          </ul>
        </div>
      )}
      {props.links.map(link => {
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
      <p className='text-white text-center'>
        Built using React and Next.js.<br/>
        Source code available at <a href="https://github.com/reggi/home" className='hover:underline' target="_blank">https://github.com/reggi/home</a>
      </p>
    </div>
  )
}