
/* eslint-disable no-console */

import { expect } from 'chai'
import Promise from 'bluebird'

const node = docker.node

describe('Test Node Module', function() {
  it('ls', function(done) {
    node
      .ls()
      .then(nodes => {
        expect(nodes.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('ls with filter', function(done) {
    let filters = { 'role': { 'worker': true } }
    node
      .ls(filters)
      .then(nodes => {
        expect(nodes.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('inspect', function(done) {
    node
      .ls()
      .then(nodes => {
        return node.inspect(nodes[0].ID)
      })
      .then(nodeInfo => {
        expect(nodeInfo).to.have.property('ID')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  // it('rm', done => {
  //   let filters = { 'role': { 'worker': true } }
  //   let id
  //   node
  //     .ls(filters)
  //     .then(([node0]) => {
  //       id = node0.ID
  //       return node.rm(id, true)
  //     })
  //     .then(() => {
  //       let filters = {
  //         id: {
  //           [id]: true
  //         }
  //       }
  //       return node.ls(filters)
  //     })
  //     .then(nodes => {
  //       expect(nodes.length).to.be.equal(0)
  //       done()
  //     })
  //     .catch(err => {
  //       done(err)
  //     })
  // })

  it('update', function(done) {
    let filters = { 'role': { 'worker': true } }
    Promise
      .delay(1000)
      .then(() => {
        return node.ls(filters)
      })
      .then(([node0]) => {
        return node.inspect(node0.ID)
      })
      .then(nodeInfo => {
        return node.update(nodeInfo.ID)
      })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('promote', function(done) {
    let filters = { 'role': { 'worker': true } }
    let nodeId
    Promise
      .delay(1000)
      .then(() => {
        return node.ls(filters)
      })
      .then(([node0]) => {
        nodeId = node0.ID
        return node.promote(node0.ID)
      })
      .then(() => {
        return node.inspect(nodeId)
      })
      .then(nodeInfo => {
        expect(nodeInfo.Spec.Role).to.be.equal('manager')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('demote', function(done) {
    let filters = { 'role': { 'manager': true } }
    let nodeId
    Promise
      .delay(1000)
      .then(() => {
        return node.ls(filters)
      })
      .then(([node0]) => {
        nodeId = node0.ID
        return node.demote(nodeId)
      })
      .then(() => {
        return node.inspect(nodeId)
      })
      .then(nodeInfo => {
        expect(nodeInfo.Spec.Role).to.be.equal('worker')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('labelAdd', function(done) {
    let filters = { 'role': { 'worker': true } }
    let nodeId
    node
      .ls(filters)
      .then(([node0]) => {
        nodeId = node0.ID
        return node.labelAdd(nodeId, {foo: 'bar'})
      })
      .then(() => {
        return node.inspect(nodeId)
      })
      .then(nodeInfo => {
        expect(nodeInfo.Spec.Labels.foo).to.be.equal('bar')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('labelRm', function(done) {
    let filters = { 'role': { 'worker': true } }
    let nodeId
    node
      .ls(filters)
      .then(([node0]) => {
        nodeId = node0.ID
        return node.labelRm(nodeId, ['foo'])
      })
      .then(() => {
        return node.inspect(nodeId)
      })
      .then(nodeInfo => {
        expect(nodeInfo.Spec.Labels.foo).to.be.equal(undefined)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
