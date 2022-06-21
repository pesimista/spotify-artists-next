import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import Catalog from '../../components/catalog'

describe('Catalog - Component', () => {
  it('should render only numbers', () => {
    const setPage = jest.fn()

    const { getAllByRole, getByTestId } = render(
      <Catalog page={1} total={8} setPage={setPage} />
    )

    const items = getAllByRole('listitem')
    const selected = getByTestId(`catalog-item-1`)
    fireEvent.click(selected)

    expect(items).toHaveLength(4) // four numbers and the empty arrow spaces
    expect(selected).toHaveClass('font-bold', 'text-green-spotify')
    expect(setPage).toHaveBeenCalledWith(1)
  })

  it('should render with an arrow and dots at the end', () => {
    const setPage = jest.fn()

    const { getAllByRole, getByTestId, queryByTestId } = render(
      <Catalog page={1} total={40} setPage={setPage} />
    )

    const items = getAllByRole('listitem')
    const images = getAllByRole('img')
    const selected = getByTestId('catalog-item-1')

    const leftDots = queryByTestId('left-dots')
    const leftArrow = queryByTestId('left-arrow')
    const rightDots = getByTestId('right-dots')
    const rightArrow = getByTestId('right-arrow')

    expect(leftDots).toBeNull()
    expect(leftArrow).toBeNull()
    expect(rightDots).toBeInTheDocument()
    expect(rightArrow).toBeInTheDocument()

    fireEvent.click(rightArrow)

    expect(items).toHaveLength(8)
    expect(images).toHaveLength(1)
    expect(selected).toHaveClass('font-bold', 'text-green-spotify')
    expect(setPage).toHaveBeenCalledWith(2)
  })

  it('should render with an arrow and dots at the start', () => {
    const setPage = jest.fn()

    const { getAllByRole, getByTestId, queryByTestId } = render(
      <Catalog page={10} total={40} setPage={setPage} />
    )

    const items = getAllByRole('listitem')
    const images = getAllByRole('img')
    const selected = getByTestId(`catalog-item-10`)

    const leftDots = getByTestId('left-dots')
    const leftArrow = getByTestId('left-arrow')
    const rightDots = queryByTestId('right-dots')
    const rightArrow = queryByTestId('right-arrow')

    expect(leftDots).toBeInTheDocument()
    expect(leftArrow).toBeInTheDocument()
    expect(rightDots).toBeNull()
    expect(rightArrow).toBeNull()

    fireEvent.click(leftArrow)

    expect(items).toHaveLength(8)
    expect(images).toHaveLength(1)
    expect(selected).toHaveClass('font-bold', 'text-green-spotify')
    expect(setPage).toHaveBeenCalledWith(9)
  })

  it('should render with an arrow and dots on both ends', () => {
    const setPage = jest.fn()

    const { getAllByRole, getByTestId } = render(
      <Catalog page={5} total={40} setPage={setPage} />
    )

    const items = getAllByRole('listitem')
    const images = getAllByRole('img')
    const selected = getByTestId(`catalog-item-5`)

    const leftDots = getByTestId('left-dots')
    const leftArrow = getByTestId('left-arrow')
    const rightDots = getByTestId('right-dots')
    const rightArrow = getByTestId('right-arrow')

    expect(leftDots).toBeInTheDocument()
    expect(leftArrow).toBeInTheDocument()
    expect(rightDots).toBeInTheDocument()
    expect(rightArrow).toBeInTheDocument()

    fireEvent.click(getByTestId(`catalog-item-${10}`))
    fireEvent.click(getByTestId('catalog-item-1'))

    expect(items).toHaveLength(9)
    expect(images).toHaveLength(2)
    expect(selected).toHaveClass('font-bold', 'text-green-spotify')

    expect(setPage).toHaveBeenCalledTimes(2)
  })
})
