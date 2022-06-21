import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { useArtistAlbums } from '../../lib/hooks/useArtistAlbums.hook'
import { AlbumMock } from '../mocks/album.mock'
import { ArtistMock } from '../mocks/artists.mock'

describe('useArtistAlbums - Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    setLogger({
      log: console.log,
      warn: console.warn,
      // ✅ no more errors on the console
      error: () => {},
    })
  })

  it('should return the artist information and their albums', async () => {
    const id = ArtistMock.id

    nock('https://api.spotify.com')
      .get(`/v1/artists/${id}`)
      .query(true)
      .reply(200, ArtistMock)

    nock('https://api.spotify.com')
      .get((uri) => uri.startsWith(`/v1/artists/${id}/albums`))
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

    const { result, waitFor } = renderHook(() => useArtistAlbums(id), {
      wrapper,
    })

    await waitFor(() => result.current.artistRes.isSuccess)
    await waitFor(() => result.current.albumsRes.isSuccess)
  })

  it('should call refresh if it returns 401', async () => {
    const id = ArtistMock.id

    nock('https://api.spotify.com')
      .get(`/v1/artists/${id}`)
      .query(true)
      .reply(401, { status: 401 })

    nock('https://api.spotify.com')
      .get((uri) => uri.startsWith(`/v1/artists/${id}/albums`))
      .query(true)
      .reply(200, {
        items: [{ album: AlbumMock }],
        next: null,
      })

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    })

    const spy = jest.spyOn(queryClient, 'invalidateQueries')

    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result, waitFor } = renderHook(() => useArtistAlbums(id), {
      wrapper,
    })

    await waitFor(() => !result.current.artistRes.isLoading)

    expect(spy).toHaveBeenCalled()
  })
})
