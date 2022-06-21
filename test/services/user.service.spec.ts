import axiosClient from '../../lib/services/axios.service'
import {
  deleteAlbum,
  fetchRefreshToken,
  fetchToken,
  fetchUser,
  getSavedAlbums,
  putAlbum,
  signout,
} from '../../lib/services/user.service'
import { SpotifyToken } from '../../lib/types/spotifyToken.type'
import { AlbumMock } from '../mocks/album.mock'
import { tokenMock, userMock } from '../mocks/user.mock'

describe('User - Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#fetchToken', () => {
    it('should return the user token', async () => {
      const postSpy = jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: tokenMock,
      })

      const res = await fetchToken('code')

      expect(res).toEqual(tokenMock)
      expect(postSpy).toHaveBeenCalled()
    })
  })

  describe('#fetchRefreshToken', () => {
    it('should return the user token using the refresh token', async () => {
      const postSpy = jest.spyOn(axiosClient, 'post').mockResolvedValue({
        data: tokenMock,
      })

      const res = await fetchRefreshToken()

      expect(res).toEqual(tokenMock)
      expect(postSpy).toHaveBeenCalled()
    })
  })

  describe('#fetchUser', () => {
    it('should return the user info', async () => {
      const getSpy = jest.spyOn(axiosClient, 'get').mockResolvedValue({
        data: userMock,
      })

      const res = await fetchUser()

      expect(res).toEqual(userMock)
      expect(getSpy).toHaveBeenCalled()
    })
  })

  describe('#getSavedAlbums', () => {
    it('should return the users favourite albums', async () => {
      const response = {
        items: [{ album: AlbumMock }],
        next: 'true',
      }
      const getSpy = jest.spyOn(axiosClient, 'get').mockResolvedValueOnce({
        data: response,
      })

      getSpy.mockResolvedValueOnce({ data: { ...response, next: null } })

      const res = await getSavedAlbums()

      expect(res).toHaveProperty('albums')
      expect(res).toHaveProperty('ids')

      expect(getSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('#putAlbum', () => {
    it('should call the right methods', async () => {
      const putSpy = jest.spyOn(axiosClient, 'put').mockResolvedValue(true)

      await putAlbum('code')
      expect(putSpy).toHaveBeenCalled()
    })
  })

  describe('#deleteAlbum', () => {
    it('should call the right methods', async () => {
      const deleteSpy = jest
        .spyOn(axiosClient, 'delete')
        .mockResolvedValue(true)

      await deleteAlbum('code')
      expect(deleteSpy).toHaveBeenCalled()
    })
  })

  describe('#signout', () => {
    it('should remove the tokens from localstorage', async () => {
      signout()
    })
  })
})
