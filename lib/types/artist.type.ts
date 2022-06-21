import { ImageType } from './image.type'

export type Artist = {
  external_urls: {
    spotify: string
  }
  followers: {
    href: string | null
    total: number
  }
  genres: string[]
  href: string
  id: string
  images: ImageType[]
  name: string
  popularity: number
  type: string
  uri: string
}
