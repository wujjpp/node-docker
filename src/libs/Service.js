/**
 * Created by Wu Jian Ping on - 2018/09/01.
 */

import _ from 'lodash'
import Compoment from './Compoment'

export default class Service extends Compoment {
  ls(filters = {}) {
    return this.request
      .get('/services', {
        params: {
          filters
        }
      })
  }

  // https://docs.docker.com/engine/api/v1.37/#operation/ServiceCreate
  create(params) {
    return this.request.post('/services/create', params)
  }

  inspect (idOrName, insertDefaults = false) {
    return this.request
      .get(`/services/${idOrName}`, {
        params: {
          insertDefaults
        }
      })
  }

  rm(idOrName) {
    return this.request.delete(`/services/${idOrName}`)
  }

  // https://docs.docker.com/engine/api/v1.37/#operation/ServiceUpdate
  update(idOrName, params) {
    return new Promise((resolve, reject) => {
      this.inspect(idOrName, true)
        .then(serviceInfo => {
        // propare default value for update service
          let props = _.defaultsDeep({}, params, {
            Name: serviceInfo.Spec.Name,
            Labels: serviceInfo.Spec.Labels,
            TaskTemplate: serviceInfo.Spec.TaskTemplate,
            Mode: serviceInfo.Spec.Mode,
            UpdateConfig: serviceInfo.Spec.UpdateConfig,
            RollbackConfig: serviceInfo.Spec.RollbackConfig,
            EndpointSpec: serviceInfo.Spec.EndpointSpec
          })
          return this.request
            .post(`/services/${idOrName}/update`, props, {
              params: {
                version: serviceInfo.Version.Index
              }
            })
        })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  scale(idOrName, replicas, parallelism = 1) {
    return this.update(idOrName, {
      Mode: {
        Replicated: {
          Replicas: replicas
        }
      },
      UpdateConfig: {
        Parallelism: parallelism
      }
    })
  }
}
