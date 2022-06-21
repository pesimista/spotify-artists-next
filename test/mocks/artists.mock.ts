import { Artist } from '../../lib/types/artist.type'

export const ArtistMock: Artist = {
  external_urls: {
    spotify: 'https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d',
  },
  followers: {
    href: null,
    total: 41832704,
  },
  genres: ['classic rock', 'glam rock', 'rock'],
  href: 'https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d',
  id: '1dfeR4HaWDbWqFHLkxsg1d',
  images: [
    {
      height: 806,
      url: 'https://i.scdn.co/image/b040846ceba13c3e9c125d68389491094e7f2982',
      width: 999,
    },
  ],
  name: 'Queen',
  popularity: 83,
  type: 'artist',
  uri: 'spotify:artist:1dfeR4HaWDbWqFHLkxsg1d',
}
