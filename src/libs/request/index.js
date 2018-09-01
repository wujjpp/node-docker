/**
 * Created by Wu Jian Ping on - 2018/06/27.
 */

import axios from 'axios'
import responseInterceptor from './interceptors/response'

const createRequest = endpoint => {
  let requestConfig = {
    timeout: 1000 * 60 * 5,
    baseURL: endpoint
  }

  const client = axios.create(requestConfig)
  const [responseResolve, responseReject] = responseInterceptor

  client.interceptors.response.use(responseResolve, responseReject)
  return client
}

const dockerEndpoint = 'http://192.168.31.128:2376'

export default createRequest(dockerEndpoint)

export {
  createRequest
}
