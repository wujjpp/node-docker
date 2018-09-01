/**
 * Created by Wu Jian Ping on - 2018/06/27.
 */

import axios from 'axios'
import responseInterceptor from './interceptors/response'

let defaultConfig = {
  timeout: 1000 * 60 * 5,
  socketPath: '/var/run/docker.sock',
  baseURL: 'http:/v1.38'
}

const createRequest = endpoint => {
  let requestConfig = { ...defaultConfig }

  if (endpoint) {
    requestConfig.socketPath = null
    requestConfig.baseURL = endpoint
  }

  const client = axios.create(requestConfig)
  const [responseResolve, responseReject] = responseInterceptor

  client.interceptors.response.use(responseResolve, responseReject)
  return client
}

export default createRequest

export {
  createRequest
}
