import Head from 'next/head'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Catalog from '../components/catalog'
import ListItem from '../components/listItem'
import Loader from '../components/loader'
import { useUser } from '../lib/hooks/useUser.hook'
import { searchArtist } from '../lib/services/artists.service'

export default function Dashboard(): JSX.Element {
  const userState = useUser()
  const [value, setValue] = useState('')
  const [state, setState] = useState({ name: '', page: 1 })

  const artistResult = useQuery(
    ['search', state],
    () => searchArtist(state.name, state.page),
    { enabled: Boolean(state.name) }
  )

  function onSearch(e: React.SyntheticEvent) {
    e.preventDefault()

    setState({ name: value?.trim(), page: 1 })
  }

  function setPage(page: number): void {
    setState({ ...state, page })
  }

  if (userState.isLoading) {
    return <Loader />
  }

  return (
    <>
      <Head>
        <title>Spotify - Dashboard</title>
        <meta name='description' content='a web site to see your artists' />
      </Head>
      <main className='p-6'>
        <div className='md:max-w-[640px] lg:max-w-7xl mx-auto'>
          <div className='px-0 md:px-6'>
            <div className='w-full flex flex-col items-start md:items-center'>
              <h1 className='font-bold md:text-center text-[40px] leading-[48px] md:text-[64px] md:leading-[78px] mb-6'>
                Busca tus
                <br />
                <span className='text-green-spotify'>artistas</span>
              </h1>

              <p className='mb-8 max-w-[450px] leading-8 md:mb-24 md:text-center lg:mb-8'>
                Encuentra tus artistas favoritos gracias a nuestro buscador y
                guarda tus álbumes favoritos
              </p>
            </div>
            <div>
              <form
                className='flex items-center border-white bg-white border rounded-3xl p-2 mx-auto max-w-2xl'
                onSubmit={onSearch}
              >
                <input
                  className='font-semibold appearance-none bg-transparent border-none w-full text-black-spotify mr-3 py-1 px-2 leading-tight focus:outline-none'
                  type='text'
                  placeholder='Nirvana'
                  value={value}
                  name='artist'
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setValue(e.currentTarget.value)
                  }
                  aria-label='Artist name'
                />
                <button
                  className='flex-shrink-0 rounded-3xl px-11 bg-green-spotify text-black-spotify font-semibold  border-green-spotify text-sm border-4 py-2'
                  type='submit'
                >
                  Search
                </button>
              </form>
            </div>
          </div>

          {artistResult.isFetching && (
            <div className='h-96 md:h-[550px] flex'>
              <Loader />
            </div>
          )}

          {artistResult.isFetched && artistResult.isSuccess && (
            <>
              <p className='mb-3 mt-11 text-sm max-w-2xl md:px-6 md:mt-14 md:mb-0 lg:mt-20 lg:mb-7 lg:max-w-6xl'>
                Mostrando {artistResult.data?.items?.length} resultados de{' '}
                {artistResult.data?.total}
              </p>

              <div className='flex justify-center items-center flex-wrap'>
                {artistResult.data.items.map((item) => (
                  <ListItem key={item.id} item={item} />
                ))}
              </div>
              <Catalog
                className='max-w-2xl lg:max-w-6xl mx-auto'
                page={state.page}
                setPage={setPage}
                total={artistResult.data?.total}
              />
            </>
          )}
        </div>
      </main>
    </>
  )
}
