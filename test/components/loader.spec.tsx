import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Loader from '../../components/loader'

describe('Loader - Component', () => {
  it('should render', () => {
    const { getByRole } = render(<Loader />)
    const spinner = getByRole('img')

    expect(spinner).toBeInTheDocument()
  })
})
