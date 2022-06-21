import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'
import Loader from '../components/loader'
import { fetchToken } from '../lib/services/user.service'

export default function Login() {
  const router: NextRouter = useRouter()
  const mutation = useMutation(fetchToken, {
    onSuccess: () => router.push('/dashboard'),
    onError: () => router.push('/'),
    retry: 1,
  })

  useEffect(() => {
    if (router.query.code) {
      mutation.mutate(router.query.code.toString())
      return
    }

    if (router.isReady) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return (
    <>
      <Head>
        <title>Spotify - Artists</title>
        <meta name='description' content='a web site to see your artists' />
      </Head>
      <Loader />
    </>
  )
}
