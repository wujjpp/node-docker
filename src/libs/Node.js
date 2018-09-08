/**
 * Created by Wu Jian Ping on - 2018/08/25.
 */

import Promise from 'bluebird'
import _ from 'lodash'
import Compoment from './Compoment'

export default class Node extends Compoment {
  // https://docs.docker.com/engine/api/v1.37/#operation/NodeList
  ls(filters = {}) {
    return this.request
      .get('/nodes', {
        params: {
          filters
        }
      })
  }

  inspect(idOrName) {
    return this.request.get(`/nodes/${idOrName}`)
  }

  rm(id, force = false) {
    return this.request
      .delete(`/nodes/${id}`, {
        params: {
          force
        }
      })
  }

  // https://docs.docker.com/engine/api/v1.37/#operation/NodeUpdate
  update(idOrName, params = {}) {
    return new Promise((resolve, reject) => {
      this.inspect(idOrName)
        .then(nodeInfo => {
          let props = {
            Name: params.Name || nodeInfo.Spec.Name || undefined,
            Labels: params.Labels || nodeInfo.Spec.Labels,
            Role: params.Role || nodeInfo.Spec.Role,
            Availability: params.Availability || nodeInfo.Spec.Availability
          }
          return this.request
            .post(`/nodes/${nodeInfo.ID}/update`, props, {
              params: {
                version: nodeInfo.Version.Index
              }
            })
        })
        .then(data => { resolve(data) })
        .catch(err => {
          reject(err)
        })
    })
  }

  promote(idOrName) {
    return this.update(idOrName, { Role: 'manager' })
  }

  demote(idOrName) {
    return this.update(idOrName, { Role: 'worker' })
  }

  labelAdd(idOrName, labels) {
    return new Promise((resolve, reject) => {
      this.inspect(idOrName)
        .then(nodeInfo => {
          let originLabels = nodeInfo.Spec.Labels
          return this.update(nodeInfo.ID, {
            Labels: _.defaultsDeep({}, labels, originLabels)
          })
        })
        .then(data => { resolve(data) })
        .catch(err => {
          reject(err)
        })
    })
  }

  labelRm(idOrName, labels) {
    return new Promise((resolve, reject) => {
      this.inspect(idOrName)
        .then(nodeInfo => {
          let originLabels = nodeInfo.Spec.Labels
          let newLabels = _.omit(originLabels, labels)
          return this.update(nodeInfo.ID, {
            Labels: newLabels
          })
        })
        .then(data => { resolve(data) })
        .catch(err => {
          reject(err)
        })
    })
  }
}
