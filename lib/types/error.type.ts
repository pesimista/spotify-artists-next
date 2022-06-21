export type SpotifyErrorType = {
  error: {
    status: number
    message: string
  }
}

export type SpotifyAxiosError = {
  status: number
  statusText: string
  data?: SpotifyErrorType
}
