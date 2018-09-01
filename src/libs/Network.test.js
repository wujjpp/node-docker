/**
 * Created by Wu Jian Ping on - 2018/08/28.
 */

import { expect } from 'chai'

const network = docker.network
const image = docker.image
const container = docker.container

describe('Test Network Compoment', function() {
  after(function(done) {
    container
      .stop('hello-node')
      .then(() => {
        return container.rm('hello-node')
      })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('create bridge network', function(done) {
    let params = {
      Name: 'test-bridge-net',
      Driver: 'bridge',
      Attachable: true,
      ingress: false,
      EnableIPv6: false
    }

    network
      .create(params)
      .then(o => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('create overlay network', function(done) {
    let params = {
      Name: 'test-overlay-net',
      Driver: 'overlay',
      Attachable: true,
      ingress: false,
      EnableIPv6: false
    }

    network
      .create(params)
      .then(o => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('ls', function(done) {
    network.ls()
      .then(networks => {
        expect(networks.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  // https://docs.docker.com/engine/api/v1.37/#operation/NetworkList
  it('ls with filter', function(done) {
    let filters = {
      name: {host: true},
      scope: {'swarm': true, 'global': true, 'local': true}
    }
    network.ls(filters)
      .then(networks => {
        expect(networks.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('inspect', function(done) {
    network.inspect('host', true)
      .then(networkInfo => {
        expect(networkInfo.Name).to.be.equal('host')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('rm', function(done) {
    network
      .rm('test-overlay-net')
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('connect', function(done) {
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
        return container.start('hello-node')
      })
      .then(() => {
        let params = {
          Name: 'test-connect-net',
          Driver: 'bridge',
          Attachable: true,
          ingress: false,
          EnableIPv6: false
        }
        return network.create(params)
      })
      .then(() => {
        return network.connect('test-connect-net', {Container: 'hello-node'})
      })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('disconnect', function(done) {
    network
      .disconnect('test-connect-net', {
        Container: 'hello-node'
      })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('prune', function(done) {
    network
      .prune()
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
