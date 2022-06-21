import { SavedAlbum } from './album.type'
import { Artist } from './artist.type'

export type SearchResponse = {
  artists: CollectionResult<Artist>
}

export type CollectionResult<T> = {
  href: string
  items: T[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

export type SavedAlbumsResponse = {
  albums: SavedAlbum[]
  ids: Set<string>
}
