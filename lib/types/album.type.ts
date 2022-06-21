import { Artist } from './artist.type'
import { ImageType } from './image.type'

export type Album = {
  album_group: string
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: ImageType[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

export type SavedAlbum = {
  added_at: string
  album: Album
}
