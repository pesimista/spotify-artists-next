import Image from 'next/image'
import Link from 'next/link'
import { MouseEventHandler } from 'react'
import { defaultImage } from '../lib/config'
import { Album } from '../lib/types/album.type'
import { Artist } from '../lib/types/artist.type'

type ListItemProps = {
  item: Album | Artist
  isSaved?: boolean
  remove?: MouseEventHandler<HTMLButtonElement>
  add?: MouseEventHandler<HTMLButtonElement>
}

export default function ListItem({
  item,
  isSaved,
  remove,
  add,
}: ListItemProps): JSX.Element {
  const data = item as Album & Artist
  const isArtist = item.type === 'artist'
  const aditionalClass = isArtist
    ? 'hover:bg-green-spotify hover:cursor-pointer group'
    : ''

  const node = (
    <div
      className={`flex flex-col p-6 w-80 rounded mb-6 ${aditionalClass}`}
      data-testid={`item-list-${data.id}`}
    >
      <Image
        src={data.images?.[0]?.url || defaultImage}
        alt={data.name}
        // layout='responsive'
        className='rounded-xl'
        height={270}
        width={270}
      />
      <p className='pt-6 pb-3 font-semibold text-2xl group-hover:text-black-spotify overflow-hidden text-ellipsis whitespace-nowrap'>
        {data.name}
      </p>
      <p className='group-hover:text-black-spotify font-semibold'>
        {isArtist
          ? `Followers: ${data.followers.total}`
          : `Publicado: ${data.release_date}`}
      </p>
      {!isArtist && !isSaved && (
        <button
          onClick={add}
          className='border-none rounded-3xl bg-green-spotify text-black-spotify py-2 font-bold w-40 mt-6'
        >
          + Add album
        </button>
      )}
      {!isArtist && isSaved && (
        <button
          onClick={remove}
          className='border-none rounded-3xl bg-red-spotify text-black-spotify py-2 font-bold w-48 mt-6'
        >
          - Remove album
        </button>
      )}
    </div>
  )

  if (isArtist) {
    return (
      <Link href={{ pathname: '/details', query: { id: data.id } }}>
        {node}
      </Link>
    )
  }

  return node
}
