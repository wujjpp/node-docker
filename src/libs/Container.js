/**
 * Created by Wu Jian Ping on - 2018/08/28.
 */

import Compoment from './Compoment'

export default class Container extends Compoment {
  // https://docs.docker.com/engine/api/v1.37/#operation/ContainerList
  ls(all = false, limit = 1000, size = false, filters = {}) {
    return this.request.get('/containers/json', {
      params: {
        all,
        limit,
        size,
        filters
      }
    })
  }

  // https://docs.docker.com/engine/api/v1.37/#operation/ContainerCreate
  create (params, name = '') {
    return this.request.post('/containers/create', params, {
      params: {
        name: name
      }
    })
  }

  start(idOrName) {
    return this.request.post(`/containers/${idOrName}/start`)
  }

  restart(idOrName) {
    return this.request.post(`/containers/${idOrName}/restart`)
  }

  stop(idOrName) {
    return this.request.post(`/containers/${idOrName}/stop`)
  }

  kill(idOrName, signal = 'SIGKILL') {
    return this.request.post(`/containers/${idOrName}/kill`, { signal })
  }

  inspect(idOrName, size = false) {
    return this.request.get(`/containers/${idOrName}/json`, {
      params: {
        size
      }
    })
  }

  top(idOrName, ps_args = '-ef') {
    return this.request.get(`/containers/${idOrName}/top`, {
      params: {
        ps_args
      }
    })
  }

  logs (idOrName,
    follow = false,
    stdout = false,
    stderr = false,
    since = 0,
    until = 0,
    timestamps = false,
    tail = 'all') {
    return this.request.get(`/containers/${idOrName}/logs`, {
      params: {
        follow,
        stdout,
        stderr,
        since,
        until,
        timestamps,
        tail
      }
    })
  }

  diff(idOrName) {
    return this.request.get(`/containers/${idOrName}/changes`)
  }

  export(idOrName) {
    throw new Error('Not Implement')
  }

  stats(idOrName, stream = false) {
    return this.request.get(`/containers/${idOrName}/stats`, {
      params: {
        stream
      }
    })
  }

  rm(idOrName, force = false, v = false, link = false) {
    return this.request.delete(`/containers/${idOrName}`, {
      params: {
        force,
        v,
        link
      }
    })
  }

  prune() {
    return this.request.post('/containers/prune')
  }
}
