import { Album } from '../../lib/types/album.type'
import { Artist } from '../../lib/types/artist.type'

export const AlbumMock: Album = {
  album_type: 'album',
  artists: [
    {
      external_urls: {
        spotify: 'https://open.spotify.com/artist/41X1TR6hrK8Q2ZCpp2EqCz',
      },
      href: 'https://api.spotify.com/v1/artists/41X1TR6hrK8Q2ZCpp2EqCz',
      id: '41X1TR6hrK8Q2ZCpp2EqCz',
      name: 'bbno$',
      type: 'artist',
      uri: 'spotify:artist:41X1TR6hrK8Q2ZCpp2EqCz',
    },
  ] as Partial<Artist>[] as Artist[],
  id: '6iMshsixZe8oMteQdln5kp',
  images: [
    {
      height: 640,
      url: 'https://i.scdn.co/image/ab67616d0000b2738c25aa58d7e0894df7436348',
      width: 640,
    },
  ],
  name: 'eat ya veggies',
  release_date: '2021-10-08',
  type: 'album',
  uri: 'spotify:album:6iMshsixZe8oMteQdln5kp',
  album_group: '',
  available_markets: [],
  external_urls: {
    spotify: '',
  },
  href: '',
  release_date_precision: '',
  total_tracks: 0,
}
