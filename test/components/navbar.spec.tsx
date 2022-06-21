import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Navbar from '../../components/navbar'
import RouterMock from '../mocks/router.mock'

describe('Navbar  - Component', () => {
  let mock: any

  beforeEach(() => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    mock = { ...RouterMock, pathname: '/login' }
    useRouter.mockImplementation(() => mock)
  })

  it('hide the ul on the login and index pages', () => {
    const { queryByRole } = render(<Navbar />)
    const list = queryByRole('list')

    expect(list).toBeNull()
  })

  it('should show the ul and highlight the first element', () => {
    mock.pathname = '/dashboard'

    const { getByText, getAllByRole } = render(<Navbar />)
    const list = getAllByRole('list')
    const search = getByText(/buscar/i)
    const profile = getByText(/my albums/i)

    expect(list).toHaveLength(1)
    expect(search.parentNode).toHaveClass('text-green-spotify')
    expect(profile.parentNode).not.toHaveClass('text-green-spotify')
  })

  it('should show the ul and highlight the second element', () => {
    mock.pathname = '/me'

    const { getByText, getAllByRole } = render(<Navbar />)
    const list = getAllByRole('list')
    const search = getByText(/buscar/i)
    const profile = getByText(/my albums/i)

    expect(list).toHaveLength(1)
    expect(search.parentNode).not.toHaveClass('text-green-spotify')
    expect(profile.parentNode).toHaveClass('text-green-spotify')
  })

  it('should logout on click', () => {
    mock.pathname = '/me'

    const { getByTestId } = render(<Navbar />)
    fireEvent.click(getByTestId('logout'))

    expect(RouterMock.push).toHaveBeenCalled()
    const route = RouterMock.push.mock.calls[0][0]
    expect(route).toEqual('/')
  })
})
