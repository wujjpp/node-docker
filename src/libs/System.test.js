/**
 * Created by Wu Jian Ping on - 2018/09/01.
 */

import { expect } from 'chai'
const system = docker.system

describe('Test System Module', function() {
  // it('auth', function(done) {
  //   system
  //     .auth('root', '******', '******')
  //     .then(info => {
  //       done()
  //     })
  //     .catch(err => {
  //       done(err)
  //     })
  // })

  it('info', function(done) {
    system
      .info()
      .then(info => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('version', function(done) {
    system
      .version()
      .then(info => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('ping', function(done) {
    system
      .ping()
      .then(data => {
        expect(data).to.be.equal('OK')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('usage', function(done) {
    system
      .usage()
      .then(data => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
