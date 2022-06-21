import { Album, SavedAlbum } from '../types/album.type'
import {
  CollectionResult,
  SavedAlbumsResponse,
} from '../types/searchResponse.type'
import { SpotifyToken } from '../types/spotifyToken.type'
import { User } from '../types/user.type'
import axiosClient from './axios.service'

const client = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT
const secret = process.env.NEXT_PUBLIC_SPOTIFY_SECRET
const redirect_uri = `${process.env.NEXT_PUBLIC_REDIRECT_URL}/login`

export async function fetchToken(code: string): Promise<SpotifyToken> {
  const base64 = Buffer.from(`${client}:${secret}`).toString('base64')

  const data = new URLSearchParams()
  data.append('grant_type', 'authorization_code')
  data.append('redirect_uri', redirect_uri)
  data.append('code', code)

  const res = await axiosClient.post<SpotifyToken>(
    'https://accounts.spotify.com/api/token',
    data,
    {
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  localStorage.setItem('token', res.data.access_token)
  localStorage.setItem('refresh_token', res.data.refresh_token)
  return res.data
}

export async function fetchRefreshToken(): Promise<SpotifyToken> {
  const base64 = Buffer.from(`${client}:${secret}`).toString('base64')
  const refresh = localStorage.getItem('refresh_token') as string

  const data = new URLSearchParams()
  data.append('grant_type', 'refresh_token')
  data.append('refresh_token', refresh)

  const res = await axiosClient.post<SpotifyToken>(
    'https://accounts.spotify.com/api/token',
    data,
    {
      headers: {
        Authorization: `Basic ${base64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )

  localStorage.setItem('token', res.data.access_token)
  return res.data
}

export async function fetchUser(): Promise<User> {
  const res = await axiosClient.get<User>('https://api.spotify.com/v1/me')

  return res.data
}

export async function getSavedAlbums(): Promise<SavedAlbumsResponse> {
  let albums: SavedAlbum[] = []
  let next = ''
  let offset = 0

  do {
    const res = await axiosClient.get<CollectionResult<SavedAlbum>>(
      'https://api.spotify.com/v1/me/albums',
      { params: { limit: 50, offset } }
    )
    next = res.data.next
    albums.push(...res.data.items)
    offset += 50
  } while (next)

  albums.sort((a, b) =>
    a.album.artists[0].name.localeCompare(b.album.artists[0].name)
  )

  const ids = new Set<string>(albums.map((item) => item.album.id))
  return { albums, ids }
}

export async function putAlbum(id: string): Promise<boolean> {
  await axiosClient.put('https://api.spotify.com/v1/me/albums', {
    ids: [id],
  })
  return true
}

export async function deleteAlbum(id: string): Promise<boolean> {
  await axiosClient.delete('https://api.spotify.com/v1/me/albums', {
    params: { ids: id },
  })
  return true
}

export function signout(): void {
  localStorage.removeItem('token')
  localStorage.removeItem('refresh_token')
}
