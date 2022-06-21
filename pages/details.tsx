import { CheckOutlined } from '@ant-design/icons'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import ListItem from '../components/listItem'
import Loader from '../components/loader'
import { defaultImage } from '../lib/config'
import { useArtistAlbums } from '../lib/hooks/useArtistAlbums.hook'
import { useSavedAlbums } from '../lib/hooks/useSavedAlbums.hook'
import { Album } from '../lib/types/album.type'
import { Artist } from '../lib/types/artist.type'
import { CollectionResult } from '../lib/types/searchResponse.type'
import NotFound from './404'

export default function Details(): JSX.Element {
  const router = useRouter()
  const { ids, saveAlbum, removeAlbum } = useSavedAlbums()
  const { artistRes, albumsRes } = useArtistAlbums(router.query.id as string)

  useEffect(() => {
    if (router.isReady && !router.query.id) {
      router.push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!router.query.id || artistRes.isFetching) {
    return <Loader />
  }

  if (artistRes.error && artistRes.error.status >= 400) {
    return <NotFound title='el artista' />
  }

  const artist = artistRes.data as Artist
  const albums = albumsRes.data as CollectionResult<Album>

  return (
    <>
      <Head>
        <title>Spotify - {artist?.name || 'Artist'}</title>
        <meta name='description' content='a web site to see your artists' />
      </Head>
      <main className='p-6'>
        <div className='md:max-w-[640px] lg:max-w-7xl mx-auto'>
          <div className='px-6'>
            <div className='flex flex-col md:flex-row'>
              <div className='w-40 h-40 md:w-60 md:h-60'>
                <Image
                  className='rounded-full'
                  src={artist.images?.[0].url || defaultImage}
                  alt={artist.name}
                  height={1}
                  width={1}
                  layout='responsive'
                />
              </div>

              <div className='md:ml-14'>
                <div className='flex mt-10 md:mt-0'>
                  <Image
                    src={'/verified.svg'}
                    alt='verified'
                    height={22}
                    width={22}
                  />
                  <p className='ml-3 font-semibold'>Artista ceritficado</p>
                </div>
                <h1 className='text-[40px] font-bold mt-3 mb-16 md:text-[40px] lg:mb-8 lg:text-[64px] lg:leading-[78px]'>
                  {artist.name}
                </h1>

                <p className='font-semibold mb-2'>
                  Followers: {artist.followers.total}
                </p>
                <p className='font-semibold'>
                  Generos: {artist.genres.join(', ')}
                </p>
              </div>
            </div>

            <p className='mb-7 mt-20 md:mt-10 md:mb-0 lg:mt-28'>
              Guarda tus álbumes favoritos de {artist.name}
            </p>
          </div>
          <div>
            <div className='flex justify-center items-center flex-wrap'>
              {albumsRes.isFetched &&
                albums.items.map((item) => (
                  <ListItem
                    key={item.id}
                    item={item}
                    isSaved={ids.has(item.id)}
                    add={() => saveAlbum(item.id)}
                    remove={() => removeAlbum(item.id)}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
