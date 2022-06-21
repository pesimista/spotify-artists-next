import {
  fetchArtist,
  getAlbums,
  searchArtist,
} from '../../lib/services/artists.service'
import axiosClient from '../../lib/services/axios.service'
import { Album } from '../../lib/types/album.type'
import {
  CollectionResult,
  SearchResponse,
} from '../../lib/types/searchResponse.type'

import { User } from '../../lib/types/user.type'
import { AlbumMock } from '../mocks/album.mock'
import { ArtistMock } from '../mocks/artists.mock'

describe('Artist - Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#searchArtist', () => {
    const data: SearchResponse = {
      artists: {
        href: 'https://api.spotify.com/v1/search',
        items: [
          {
            external_urls: {
              spotify: 'https://open.spotify.com/artist/41X1TR6hrK8Q2ZCpp2EqCz',
            },
            followers: {
              href: null,
              total: 1075444,
            },
            genres: ['canadian hip hop', 'dark trap', 'vapor trap'],
            href: 'https://api.spotify.com/v1/artists/41X1TR6hrK8Q2ZCpp2EqCz',
            id: '41X1TR6hrK8Q2ZCpp2EqCz',
            images: [
              {
                height: 640,
                url: 'https://i.scdn.co/image/ab6761610000e5eb6bca811e558018074bbc1b05',
                width: 640,
              },
            ],
            name: 'bbno$',
            popularity: 72,
            type: 'artist',
            uri: 'spotify:artist:41X1TR6hrK8Q2ZCpp2EqCz',
          },
          ArtistMock,
        ],
        limit: 4,
        next: 'https://api.spotify.com/v1/search',
        offset: 0,
        previous: '',
        total: 2,
      },
    }

    it('should return a collection of artist by with the query', async () => {
      const getSpy = jest.spyOn(axiosClient, 'get').mockResolvedValue({ data })

      const res = await searchArtist('code', 6)
      const args = getSpy.mock.calls[0][1]

      expect(res).toEqual(data.artists)
      expect(getSpy).toHaveBeenCalled()
      expect(args?.params.offset).toBe(20)
    })

    it('should update the page value', async () => {
      const getSpy = jest.spyOn(axiosClient, 'get').mockResolvedValue({ data })

      const res = await searchArtist('code')

      const args = getSpy.mock.calls[0][1]

      expect(res).toEqual(data.artists)
      expect(getSpy).toHaveBeenCalled()
      expect(args?.params.offset).toBe(0)
    })
  })

  describe('#fetchArtist', () => {
    it('should return the artist infomation based on the given id', async () => {
      const getSpy = jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: ArtistMock,
      })

      const res = await fetchArtist('queen-code')

      expect(res).toEqual(ArtistMock)
      expect(getSpy).toHaveBeenCalled()
    })

    it('should throw an error with code 400 if the id is undefined or empty', async () => {
      const getSpy = jest.spyOn(axiosClient, 'get')

      try {
        await fetchArtist('')
      } catch (error) {
        expect(error).toHaveProperty('code', 400)
        expect(getSpy).not.toHaveBeenCalled()
      }
    })
  })

  describe('#getAlbums', () => {
    it('should throw an error with code 400 if the id is undefined or empty', async () => {
      const getSpy = jest.spyOn(axiosClient, 'get')

      try {
        await getAlbums('')
      } catch (error) {
        expect(error).toHaveProperty('code', 400)
        expect(getSpy).not.toHaveBeenCalled()
      }
    })

    it('should return the artist album collection', async () => {
      const data: CollectionResult<Album> = {
        href: 'https://api.spotify.com/v1/artists/41X1TR6hrK8Q2ZCpp2EqCz/albums',
        items: [AlbumMock],
        limit: 50,

        next: 'https://api.spotify.com/v1/artists/41X1TR6hrK8Q2ZCpp2EqCz/albums',
        offset: 0,
        previous: '',
        total: 162,
      }

      const getSpy = jest.spyOn(axiosClient, 'get').mockResolvedValue({ data })

      const res = await getAlbums('41X1TR6hrK8Q2ZCpp2EqCz')

      expect(res).toEqual(data)
      expect(getSpy).toHaveBeenCalled()
    })
  })
})
