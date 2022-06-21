import ListItem from '../components/listItem'
import Loader from '../components/loader'
import { useSavedAlbums } from '../lib/hooks/useSavedAlbums.hook'
import { Album } from '../lib/types/album.type'
import Image from 'next/image'
import Head from 'next/head'

type ArtistList = {
  name: string
  id: string
  children: JSX.Element[]
}

export default function MePage(): JSX.Element {
  const { albums, saveAlbum, removeAlbum, isLoading } = useSavedAlbums()

  function shouldAddName(a: Album, b: Album) {
    return a.artists[0].id !== b.artists[0].id
  }

  const list: ArtistList[] = []
  for (let i = 0; i < albums.length; i++) {
    const { album } = albums[i]
    const item = (
      <ListItem
        key={album.id}
        item={album}
        isSaved={true}
        add={() => saveAlbum(album.id)}
        remove={() => removeAlbum(album.id)}
      />
    )

    if (!i || shouldAddName(album, albums[i - 1].album)) {
      list.push({
        name: album.artists[0].name as string,
        id: album.artists[0].id as string,
        children: [] as JSX.Element[],
      })
    }

    const lastItem = list[list.length - 1]
    lastItem.children.push(item)
  }
  list.sort((a, b) => b.children.length - a.children.length)

  return (
    <>
      <Head>
        <title>Spotify - Profile</title>
        <meta name='description' content='a web site to see your artists' />
      </Head>
      <main className='p-6'>
        <div className='md:max-w-[640px] lg:max-w-7xl mx-auto'>
          <div className='w-full flex flex-col items-start md:items-center mb-20 md:mb-28'>
            <h1 className='font-bold md:text-center text-[40px] leading-[48px] md:text-[64px] md:leading-[78px] mb-6'>
              Mis albumes
              <br />
              <span className='text-green-spotify'>guardados</span>
            </h1>

            <p className='md:text-center max-w-[450px] leading-8'>
              Disfruta de tu música a un solo click y descube que discos has
              guardado dentro de “mis álbumes”
            </p>
          </div>

          {isLoading && <Loader />}
          <div>
            {!isLoading &&
              list.map((item) => (
                <div key={item.id}>
                  <h2 className='text-[32px] px-6 font-bold leading-10 overflow-hidden text-ellipsis whitespace-nowrap'>
                    {item.name}
                  </h2>
                  <div className='flex justify-start items-center flex-wrap'>
                    {item.children}
                  </div>
                </div>
              ))}
            {!isLoading && !list.length && (
              <div className='flex flex-col justify-center items-center'>
                <Image
                  src='/sad-face.png'
                  alt='error'
                  height={120}
                  width={120}
                />
                <h2 className='font-bold text-center mt-6 mb-10 text-3xl'>
                  Aún no tienes albumes en favoritos!
                </h2>
                <p className='text-gray-200 text-center '>
                  Ve al buscador y comienza a agregarlos
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

// <div className='flex justify-center items-center flex-wrap'>
