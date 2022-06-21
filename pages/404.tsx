import { defaultImage } from '../lib/config'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftOutlined } from '@ant-design/icons'
import Head from 'next/head'

export default function NotFound({ title = 'la página' }): JSX.Element {
  return (
    <>
      <Head>
        <title>Spotify - 404</title>
        <meta name='description' content='a web site to see your artists' />
      </Head>
      <div className='flex flex-col justify-center items-center py-20'>
        <Image src={defaultImage} alt='logo' height={120} width={120} />
        <h2 className='font-bold text-center mt-6 mb-10 text-3xl'>
          Hubo un problema para mostrar esta pagina!
        </h2>
        <p className='text-gray-200 text-center '>
          No encontramos {title} que estabas buscando.
        </p>
        <Link href='/dashboard'>
          <button className='hover:underline flex items-center mt-3'>
            <ArrowLeftOutlined className='mr-1 my-auto' />
            volver
          </button>
        </Link>
      </div>
    </>
  )
}
