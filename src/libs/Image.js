/**
 * Created by Wu Jian Ping on - 2018/08/29.
 */

import Compoment from './Compoment'

export default class Image extends Compoment {
  create(image, tag = 'latest', credentials = null) {
    let config = {
      params: {
        fromImage: encodeURI(image),
        tag
      }
    }

    if (credentials) {
      config.headers = {
        'X-Registry-Auth': (Buffer.from(JSON.stringify(credentials))).toString('base64')
      }
    }

    return this.request.post('/images/create', {}, config)
  }

  ls(all = false, filters = {}, digest = false) {
    return this.request.get('/images/json')
  }

  build(params, compresseType = 'identity', credentials = null) {
    let config = {
      params,
      headers: {
        'Content-type': 'application/x-tar'
      }
    }

    if (credentials) {
      config.headers = {
        'X-Registry-Config': (Buffer.from(JSON.stringify(credentials))).toString('base64')
      }
    }
    return this.request.post('/build', compresseType, config)
  }

  cleanBuildCache() {
    return this.request.post('/build/prune')
  }

  inspect(idOrName) {
    return this.request.get(`/images/${idOrName}/json`)
  }

  history(idOrName) {
    return this.request.get(`/images/${idOrName}/history`)
  }

  push(idOrName, credentials, tag = undefined) {
    return this.request.post(`/images/${idOrName}/push`, { tag }, {
      headers: {
        'X-Registry-Auth': (Buffer.from(JSON.stringify(credentials))).toString('base64')
      }
    })
  }

  tag(idOrName, repo, tag) {
    return this.request.post(`/images/${idOrName}/tag`, {}, {
      params: {
        repo,
        tag
      }
    })
  }

  rm(idOrName, force = false, noprune = false) {
    return this.request.delete(`/images/${idOrName}`, {
      params: {
        force,
        noprune
      }
    })
  }

  search(term, limit = 10, filters = {}) {
    return this.request.get('/images/search', {
      params: {
        term,
        limit,
        filters
      }
    })
  }

  prune(filters = { dangling: { 'true': true } }) {
    return this.request.post(`/images/prune?filters=${encodeURIComponent(JSON.stringify(filters))}`)
  }

  export(idOrName) {
    return this.request.get(`/images/${idOrName}/get`, {
      responseType: 'stream'
    })
  }
}
