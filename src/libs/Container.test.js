/**
 * Created by Wu Jian Ping on - 2018/08/28.
 */

import { expect } from 'chai'
import Promise from 'bluebird'

const container = docker.container
const image = docker.image

describe('Test Container Compoment', function() {
  it('create', function(done) {
    let params = {
      Image: 'wujjpp/hello-node:latest',
      ExposedPorts: {
        '9000/tcp': { }
      },
      Volumes: {
        '/data': { }
      },
      HostConfig: {
        Binds: [
          '/data:/data'
        ],
        PortBindings: {
          '9000/tcp': [
            {
              HostIp: '0.0.0.0',
              HostPort: '9003'
            }
          ]
        },
        LogConfig: {
          Type: 'json-file',
          Config: { }
        }
      },
      StopSignal: 'SIGKILL'
    }
    image
      .create('wujjpp/hello-node', 'latest')
      .then(() => {
        return container.create(params, 'hello-node')
      })
      .then(o => {
        expect(o).to.have.property('Id')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('start', function(done) {
    container
      .start('hello-node')
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('inspect', function(done) {
    container
      .inspect('hello-node', true)
      .then(o => {
        expect(o).to.have.property('Id')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('top', function(done) {
    container
      .top('hello-node')
      .then(processInfo => {
        expect(processInfo.Processes.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('logs', function(done) {
    Promise.delay(1000)
      .then(() => {
        return container.logs('hello-node', false, true, true)
      })
      .then(data => {
        expect(data.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('diff', function(done) {
    container
      .diff('hello-node')
      .then(o => {
        expect(o.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('stats', function(done) {
    let stats = []
    container
      .stats('hello-node')
      .then(o => {
        stats.push(o)
        return container.stats('hello-node')
      })
      .then(o => {
        stats.push(o)
        expect(stats.length).to.be.equal(2)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('stop', function(done) {
    container
      .stop('hello-node')
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('kill', function(done) {
    container
      .start('hello-node')
      .then(() => {
        return container.kill('hello-node')
      })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('rm', function(done) {
    container
      .rm('hello-node')
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('ls', function(done) {
    let params = {
      Image: 'wujjpp/hello-node:latest',
      ExposedPorts: {
        '9000/tcp': { }
      },
      Volumes: {
        '/data': { }
      },
      HostConfig: {
      },
      StopSignal: 'SIGKILL'
    }
    Promise.delay(1000)
      .then(() => {
        return Promise
          .all([
            container.create(params, 'created-container'),
            container.create(params, 'running-container'),
            container.create(params, 'exited-container')
          ])
      })
      .then(() => {
        return Promise.all([
          container.start('running-container'),
          container.start('exited-container')
        ])
      })
      .then(() => {
        return container.stop('exited-container')
      })
      .then(() => {
        let filters = {
          status: ['created', 'running', 'exited']
        }
        return container
          .ls(true, 10, true, filters)
      })
      .then(containers => {
        expect(containers.length).to.be.equal(3)
      })
      .then(() => {
        return container.stop('running-container')
      })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('prune', function(done) {
    container
      .prune()
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
