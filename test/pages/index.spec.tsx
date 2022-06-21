import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Home from '../../pages/index'
import RouterMock from '../mocks/router.mock'

describe('Home', () => {
  it('should render correctly', () => {
    const { getByRole, getByTestId } = render(<Home />)

    const heading = getByRole('heading')
    const button = getByRole('button')

    const p = getByTestId('paragraph')

    expect(heading).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(p).toBeInTheDocument()
  })

  it('redirects to spotify auth', () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')

    useRouter.mockImplementation(() => RouterMock)
    const { getByRole } = render(<Home />)

    const button = getByRole('button')
    fireEvent.click(button)

    const route = RouterMock.push.mock.calls[0][0]
    expect(RouterMock.push).toHaveBeenCalled()
    expect(route).toContain('https://accounts.spotify.com/authorize')
  })
})
