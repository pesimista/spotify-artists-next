import { Album } from '../types/album.type'
import { Artist } from '../types/artist.type'
import { CollectionResult, SearchResponse } from '../types/searchResponse.type'
import axiosClient from './axios.service'

export async function searchArtist(
  query: string,
  page = 0
): Promise<SearchResponse['artists']> {
  const limit = 4
  page = page ? page - 1 : 0

  const res = await axiosClient.get<SearchResponse>(
    'https://api.spotify.com/v1/search',
    {
      params: {
        type: 'artist',
        q: query,
        limit,
        offset: page * limit,
      },
    }
  )

  return res.data.artists
}

export async function fetchArtist(id: string): Promise<Artist> {
  if (!id) {
    throw { code: 400 }
  }

  const res = await axiosClient.get<Artist>(
    `https://api.spotify.com/v1/artists/${id}`
  )

  return res.data
}

export async function getAlbums(id: string): Promise<CollectionResult<Album>> {
  if (!id) {
    throw { code: 400 }
  }

  const res = await axiosClient.get<CollectionResult<Album>>(
    `https://api.spotify.com/v1/artists/${id}/albums`,
    { params: { limit: 50 } }
  )

  return res.data
}
