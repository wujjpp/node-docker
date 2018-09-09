/**
 * Created by Wu Jian Ping on - 2018/08/29.
 */

import Compoment from './Compoment'
import fs from 'fs'
import _ from 'lodash'

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
    return this.request.get('/images/json', {
      params: {
        all,
        filters,
        digest
      }
    })
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

  export(names = []) {
    let params = ''
    _.each(names, (o, n) => {
      params += `${n === 0 ? '' : '&'}names=${encodeURIComponent(o)}`
    })

    return this.request.get(`/images/get?${params}`, {
      responseType: 'stream'
    })
  }

  load(archive) {
    return new Promise((resolve, reject) => {
      if (fs.existsSync(archive)) {
        let readStream = fs.createReadStream(archive)
        this.request
          .post('/images/load', readStream, {
            maxContentLength: 1024 * 1024 * 1024, // 1G
            headers: {
              'Content-Type': 'application/octet-stream'
            }
          })
          .then(() => {
            readStream && readStream.close()
            resolve()
          })
          .catch(err => {
            readStream && readStream.close()
            reject(err)
          })
      } else {
        let error = new Error(`tar file ${archive} doesn't exist`)
        error.status = -1
        reject(error)
      }
    })
  }
}
