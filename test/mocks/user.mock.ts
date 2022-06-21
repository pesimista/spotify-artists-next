import { SpotifyToken } from '../../lib/types/spotifyToken.type'
import { User } from '../../lib/types/user.type'

export const userMock: Partial<User> = {
  display_name: 'McDuck',
  href: 'https://api.spotify.com/v1/users/kkrfr9cw',
  id: 'kkrfr9cw',
  type: 'user',
  uri: 'spotify:user:kkrfr9cw',
}

export const tokenMock: SpotifyToken = {
  access_token: 'access_token',
  token_type: 'token_type',
  scope: 'scope',
  expires_in: 0,
  refresh_token: 'refresh_token',
}
