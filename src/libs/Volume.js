/**
 * Created by Wu Jian Ping on - 2018/09/02.
 */

import Compoment from './Compoment'

export default class Volume extends Compoment {
  // https://docs.docker.com/engine/api/v1.37/#operation/VolumeCreate
  create(params) {
    return this.request.post('/volumes/create', params)
  }

  // https://docs.docker.com/engine/api/v1.37/#operation/VolumeList
  ls(filters) {
    return this.request.get('/volumes', {
      params: filters
    })
  }

  inspect(idOrName) {
    return this.request.get(`/volumes/${idOrName}`)
  }

  rm(idOrName) {
    return this.request.delete(`/volumes/${idOrName}`)
  }

  prune(filters) {
    return this.request.post('/volumes/prune', {}, {
      params: filters
    })
  }
}
