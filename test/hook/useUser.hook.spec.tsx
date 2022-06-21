import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'
import { QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { useUser } from '../../lib/hooks/useUser.hook'
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

  it('should try to redirect if the token is null and the request returns 401', async () => {
    localStorage.setItem('token', 'sometoken')

    nock('https://accounts.spotify.com')
      .post('/api/token')
      .replyWithError({ message: 'Unauthorized', code: 401 })

    nock('https://api.spotify.com').get('/v1/me').reply(200, userMock)

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    })

    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result, waitFor } = renderHook(() => useUser(), { wrapper })

    await waitFor(() => !result.current.isLoading)
    expect(RouterMock.push).toHaveBeenCalled()
  })

  it('should try to redirect if the token is not saved', async () => {
    window.localStorage.clear()

    nock('https://accounts.spotify.com')
      .post('/api/token')
      .reply(200, tokenMock)

    nock('https://api.spotify.com').get('/v1/me').reply(200, userMock)

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: 0 } },
    })

    const wrapper = ({ children }: { children: any }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )

    const { result, waitFor } = renderHook(() => useUser(), { wrapper })

    await waitFor(() => result.current.isLoading)
    expect(RouterMock.push).toHaveBeenCalled()
  })
})
