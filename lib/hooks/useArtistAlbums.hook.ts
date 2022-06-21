import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { getAlbums, fetchArtist } from '../services/artists.service'
import { Album } from '../types/album.type'
import { Artist } from '../types/artist.type'
import { SpotifyAxiosError } from '../types/error.type'
import { CollectionResult } from '../types/searchResponse.type'

type useArtistAlbumsRes = {
  artistRes: UseQueryResult<Artist, SpotifyAxiosError>
  albumsRes: UseQueryResult<CollectionResult<Album>, unknown>
}

export function useArtistAlbums(id: string): useArtistAlbumsRes {
  const client = useQueryClient()
  const artistRes = useQuery(['artist', id], () => fetchArtist(id as string), {
    enabled: Boolean(id),
    // retry: 1,
    onError: (error: SpotifyAxiosError) => {
      if (error.status === 401) {
        client.invalidateQueries('refresh')
      }
    },
  })

  const albumsRes = useQuery(
    ['albums', artistRes?.data?.id],
    () => getAlbums(artistRes?.data?.id as string),
    { enabled: Boolean(artistRes?.data?.id) }
  )

  return {
    artistRes,
    albumsRes,
  }
}
