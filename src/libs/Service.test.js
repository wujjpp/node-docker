/**
 * Created by Wu Jian Ping on - 2018/09/01.
 */

import _ from 'lodash'
import Promise from 'bluebird'
import { expect } from 'chai'

const service = docker.service

describe('Test Service Compoment', function() {
  it('create', function(done) {
    let params = {
      Name: 'hello-node',
      TaskTemplate: {
        ContainerSpec: {
          Image: 'wujjpp/hello-node:latest'
        }
      },
      Mode: {
        Replicated: {
          Replicas: 2
        }
      },
      UpdateConfig: {
        Parallelism: 1,
        Order: 'start-first'
      },
      EndpointSpec: {
        Ports: [
          {
            Protocol: 'tcp',
            PublishedPort: 9002,
            TargetPort: 9000
          }
        ]
      }
    }
    service
      .create(params)
      .then(data => {
        expect(data).to.have.property('ID')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('ls', function(done) {
    service
      .ls({})
      .then(services => {
        expect(services.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('ls with filter', function(done) {
    let filter = { name: { 'hello-node': true } }
    service
      .ls(filter)
      .then(services => {
        expect(services.length).to.be.equal(1)
        expect(services[0].Spec.Name).to.be.equal('hello-node')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('inspect by id', function(done) {
    let serviceId
    service
      .ls()
      .then(([service0]) => {
        serviceId = service0.ID
        return service.inspect(serviceId, false)
      })
      .then(data => {
        expect(data.ID).to.be.equal(serviceId)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('inspect by name', function(done) {
    service
      .inspect('hello-node', false)
      .then(data => {
        expect(data.Spec.Name).to.be.equal('hello-node')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('update', function(done) {
    let replicas = _.random(1, 4)
    Promise
      .delay(1000)
      .then(() => {
        return service
          .update('hello-node', {
            Mode: {
              Replicated: {
                Replicas: replicas
              }
            }
          })
      })
      .then(data => {
        return service.inspect('hello-node', true)
      })
      .then(serviceInfo => {
        expect(serviceInfo.Spec.Mode.Replicated.Replicas).to.be.equal(replicas)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('scale', function(done) {
    Promise
      .delay(1000)
      .then(() => {
        return service.scale('hello-node', 6, 2)
      })
      .then(data => {
        return service.inspect('hello-node', true)
      })
      .then(serviceInfo => {
        expect(serviceInfo.Spec.Mode.Replicated.Replicas).to.be.equal(6)
        expect(serviceInfo.Spec.UpdateConfig.Parallelism).to.be.equal(2)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('rm', function(done) {
    service
      .rm('hello-node')
      .then(data => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
