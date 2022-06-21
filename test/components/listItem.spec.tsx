import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import ListItem from '../../components/listItem'
import { AlbumMock } from '../mocks/album.mock'
import { ArtistMock } from '../mocks/artists.mock'
import RouterMock from '../mocks/router.mock'

describe('ListItem - Component', () => {
  let router: any

  beforeEach(() => {
    jest.clearAllMocks()
    const useRouter = jest.spyOn(require('next/router'), 'useRouter')
    router = { ...RouterMock }
    useRouter.mockImplementation(() => router)
  })

  it('should render the list item for an artist with their image', () => {
    const { getByRole, getByText, getByTestId, queryByText } = render(
      <ListItem item={ArtistMock} />
    )

    const image = getByRole('img')
    const name = getByText(ArtistMock.name)
    const followers = getByText(/followers/i)
    const publised = queryByText(/publicado/i)

    fireEvent.click(getByTestId(`item-list-${ArtistMock.id}`))

    expect(image).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(followers).toBeInTheDocument()
    expect(publised).toBeNull()
    expect(router.push).toHaveBeenCalled()
  })

  it('should render the list item for a album', () => {
    const addFn = jest.fn()

    const { getByRole, getByText, getByTestId, queryByText } = render(
      <ListItem item={AlbumMock} add={addFn} />
    )

    const image = getByRole('img')
    const name = getByText(AlbumMock.name)
    const publised = getByText(/publicado/i)
    const followers = queryByText(/followers/i)
    const button = getByRole(`button`)

    fireEvent.click(getByTestId(`item-list-${AlbumMock.id}`))
    fireEvent.click(button)

    expect(image).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(followers).toBeNull()
    expect(publised).toBeInTheDocument()

    expect(button).toHaveTextContent(/add album/i)
    expect(button).toHaveClass('bg-green-spotify')

    expect(router.push).not.toHaveBeenCalled()
    expect(addFn).toHaveBeenCalled()
  })

  it('should render the list item for a album', () => {
    const removeFn = jest.fn()

    const { getByRole, getByText, getByTestId, queryByText } = render(
      <ListItem item={AlbumMock} isSaved={true} remove={removeFn} />
    )

    const image = getByRole('img')
    const name = getByText(AlbumMock.name)
    const publised = getByText(/publicado/i)
    const followers = queryByText(/followers/i)
    const button = getByRole(`button`)

    fireEvent.click(getByTestId(`item-list-${AlbumMock.id}`))
    fireEvent.click(button)

    expect(image).toBeInTheDocument()
    expect(name).toBeInTheDocument()
    expect(followers).toBeNull()
    expect(publised).toBeInTheDocument()

    expect(button).toHaveTextContent(/remove album/i)
    expect(button).toHaveClass('bg-red-spotify')

    expect(router.push).not.toHaveBeenCalled()
    expect(removeFn).toHaveBeenCalled()
  })
})
