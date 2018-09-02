/**
 * Created by Wu Jian Ping on - 2018/09/02.
 */

import { expect } from 'chai'

const volume = docker.volume

describe('Test Volume Compoment', function() {
  after(function(done) {
    volume
      .prune()
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('create', function(done) {
    let params = {
      'Name': 'data',
      'Labels': {
        'com.example.some-label': 'some-value',
        'com.example.some-other-label': 'some-other-value'
      },
      'Driver': 'local'
    }

    volume
      .create(params)
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('ls', function(done) {
    volume
      .ls()
      .then(volumes => {
        expect(volumes.Volumes.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('inspect', function(done) {
    volume
      .inspect('data')
      .then(data => {
        expect(data.Name).to.be.equal('data')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('rm', function(done) {
    volume
      .rm('data')
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('prune', function(done) {
    let params = {
      'Name': 'data',
      'Labels': {
        'com.example.some-label': 'some-value',
        'com.example.some-other-label': 'some-other-value'
      },
      'Driver': 'local'
    }

    volume
      .create(params)
      .then(() => {
        return volume.prune({})
      })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
