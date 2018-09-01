/**
 * Created by Wu Jian Ping on - 2018/08/25.
 */

/* eslint-disable prefer-promise-reject-errors */
export default [
  response => {
    return response.data
  },
  error => {
    if (error.response) {
      if (error.response.data.message) {
        return Promise.reject(new Error(error.response.data.message))
      } else {
        return Promise.reject(error.response.data)
      }
    }
    return Promise.reject(new Error('request error'))
  }
]
