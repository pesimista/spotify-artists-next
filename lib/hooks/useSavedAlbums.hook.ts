import { useMutation, useQuery, useQueryClient } from 'react-query'
import { deleteAlbum, getSavedAlbums, putAlbum } from '../services/user.service'
import { SavedAlbum } from '../types/album.type'
import { User } from '../types/user.type'
import { useUser } from './useUser.hook'

type SavedAlbumsState = {
  user: User
  ids: Set<string>
  albums: SavedAlbum[]
  isLoading?: boolean
  isFetching: boolean
  saveAlbum: (id: string) => void
  removeAlbum: (id: string) => void
}

export function useSavedAlbums(): SavedAlbumsState {
  const { user } = useUser()
  const client = useQueryClient()
  const res = useQuery('savedAlbums', getSavedAlbums, {
    enabled: Boolean(user),
  })

  const onSuccess = () => client.invalidateQueries('savedAlbums')

  const saveAlbum = useMutation(putAlbum, { onSuccess })

  const removeAlbum = useMutation(deleteAlbum, { onSuccess })

  return {
    user,
    ids: res.data?.ids as Set<string>,
    albums: res.data?.albums || [],
    isLoading: res.isLoading,
    isFetching: res.isFetching,
    saveAlbum: saveAlbum.mutate,
    removeAlbum: removeAlbum.mutate,
  }
}
