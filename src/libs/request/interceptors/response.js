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
        let err = new Error(error.response.data.message)
        err.status = error.status
        return Promise.reject(err)
      } else {
        let err = new Error(error.response.data || 'Unknow error')
        err.status = error.status
        return Promise.reject(err)
      }
    }
    let err = new Error('request error')
    err.status = -1
    return Promise.reject(err)
  }
]
