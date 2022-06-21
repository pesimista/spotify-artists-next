import { fail } from 'assert'
import axiosClient from '../../lib/services/axios.service'

describe('Axios - Interceptors', () => {
  describe('request interceptor', () => {
    it('should add the auth header', async () => {
      const requestInterceptors: any = axiosClient.interceptors.request

      const { headers } = requestInterceptors.handlers[0].fulfilled({
        headers: {},
      })

      expect(headers).toHaveProperty('Authorization')
      expect(headers.Authorization).toContain('Bearer')
    })

    it('should not add the auth header if already has one', async () => {
      const requestInterceptors: any = axiosClient.interceptors.request

      const { headers } = requestInterceptors.handlers[0].fulfilled({
        headers: { Authorization: 'Basic' },
      })

      expect(headers).toHaveProperty('Authorization')
      expect(headers.Authorization).toEqual('Basic')
    })
  })

  describe('response interceptor', () => {
    it('should return the response as it is', async () => {
      const responseInterceptors: any = axiosClient.interceptors.response

      const mock = { data: 'something' }

      const response = responseInterceptors.handlers[0].fulfilled(mock)

      expect(response).toEqual(mock)
    })

    it('should throw the error as it is if has ERR_NETWORK code', async () => {
      const responseInterceptors: any = axiosClient.interceptors.response
      const mock = {
        code: 'ERR_NETWORK',
      }

      try {
        responseInterceptors.handlers[0].rejected(mock)
        fail('unexpected path')
      } catch (error) {
        expect(error).toEqual(mock)
      }
    })

    it('should parse the error before throwing it', async () => {
      const responseInterceptors: any = axiosClient.interceptors.response
      const mock = {
        response: { status: 400, statusText: 'Bad Request', data: '' },
      }

      try {
        responseInterceptors.handlers[0].rejected(mock)
        fail('unexpected path')
      } catch (error) {
        expect(error).toHaveProperty('status')
        expect(error).toHaveProperty('statusText')
        expect(error).toHaveProperty('data')
      }
    })

    it('should parse the error before throwing it (null)', async () => {
      const responseInterceptors: any = axiosClient.interceptors.response

      try {
        responseInterceptors.handlers[0].rejected({})
        fail('unexpected path')
      } catch (error) {
        expect(error).toHaveProperty('status')
        expect(error).toHaveProperty('statusText')
        expect(error).toHaveProperty('data')
      }
    })
  })
})
