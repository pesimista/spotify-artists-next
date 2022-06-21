import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { fetchRefreshToken, fetchUser } from '../services/user.service'
import { User } from '../types/user.type'

type UserState = {
  user: User
  isLoading: boolean
}

export function useUser(): UserState {
  const router = useRouter()
  useQuery('refresh', fetchRefreshToken, {
    // onSuccess: () => queryClient.invalidateQueries('user'),
    onError: () => router.push('/'),
    refetchInterval: 3600000,
  })

  const result = useQuery('user', fetchUser)

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    user: result.data as User,
    isLoading: result.isLoading,
  }
}
