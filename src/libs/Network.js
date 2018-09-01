/**
 * Created by Wu Jian Ping on - 2018/09/02.
 */

import Compoment from './Compoment'

export default class Network extends Compoment {
  create(params) {
    return this.request.post('/networks/create', params)
  }

  ls(filters = {}) {
    return this.request.get('/networks', {
      params: {
        filters
      }
    })
  }

  inspect(idOrName, verbose = false, scope = '') {
    return this.request.get(`/networks/${idOrName}`, {
      params: {
        verbose,
        scope: scope || undefined
      }
    })
  }

  rm(idOrName) {
    return this.request.delete(`/networks/${idOrName}`)
  }

  connect(idOrName, params) {
    return this.request.post(`/networks/${idOrName}/connect`, params)
  }

  disconnect(idOrName, params) {
    return this.request.post(`/networks/${idOrName}/disconnect`, params)
  }

  prune(filters = {}) {
    return this.request.post('/networks/prune', filters)
  }
}
