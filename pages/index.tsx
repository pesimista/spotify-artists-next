import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Spotify - Artists</title>
        <meta name='description' content='a web site to see your artists' />
      </Head>
      <main className='p-6 lg:my-5 flex flex-col lg:flex-row justify-center items-center md:items-start'>
        <div className='w-56 h-56 mb-6 md:mb-20 md:w-80 md:h-80 lg:mb-0 lg:mr-36 lg:w-[465px] lg:h-[465px]'>
          <Image
            src='/green-arrow.svg'
            alt='arrow'
            height={1}
            width={1}
            layout='responsive'
          />
        </div>
        <div>
          <h1 className='font-bold mb-6 text-[40px] leading-[48px] md:text-[64px] md:text-center md:leading-[78px] md:mb-9'>
            Disfruta de la <br />
            <span className='text-green-spotify'>mejor música</span>
          </h1>
          <p className='mb-10 md:mb-28 leading-5' data-testid='paragraph'>
            Accede a tu cuenta para guardar tus albumes favoritos.
          </p>
          <Link
            href={{
              pathname: 'https://accounts.spotify.com/authorize',
              query: {
                response_type: 'code',
                client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT,
                scope: 'user-library-read user-library-modify',
                redirect_uri: `http://localhost:3000/login`,
              },
            }}
          >
            <button className='font-bold hover:cursor-pointer'>
              <span className='mr-7'>Log in con Spotify</span>
              <Image
                src='/right-arrow.svg'
                alt='arrow'
                height={14}
                width={16}
              />
            </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
