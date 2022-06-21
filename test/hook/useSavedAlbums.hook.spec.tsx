import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { useSavedAlbums } from '../../lib/hooks/useSavedAlbums.hook'
import { AlbumMock } from '../mocks/album.mock'
import RouterMock from '../mocks/router.mock'
import { tokenMock, userMock } from '../mocks/user.mock'

describe('useSavedAlbums - Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementation(() => RouterMock)

    setLogger({
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    })
  })

  it('should return the information', async () => {
    window.localStorage.getItem = jest.fn().mockReturnValue('token')
    localStorage.setItem('token', 'sometoken')

    nock('https://accounts.spotify.com')
      .get('/api/token')
      .reply(200, tokenMock)
      .post('/api/token')
      .reply(200, tokenMock)

    nock('https://api.spotify.com').get('/v1/me').reply(200, userMock)
    nock('https://api.spotify.com')
      .get('/v1/me/albums')
      .query(true)
      .reply(200, {
        items: [{ album: AlbumMock }],
        next: null,
      })

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 1 } },
    })

    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result, waitFor } = renderHook(() => useSavedAlbums(), { wrapper })

    await waitFor(() => Boolean(result.current.user))
    await waitFor(() => !result.current.isLoading)
  })
})
