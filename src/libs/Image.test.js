/**
 * Created by Wu Jian Ping on - 2018/08/28.
 */

import { expect } from 'chai'
import _ from 'lodash'

const image = docker.image

describe('Test Image Compoment', function() {
  it('create', function(done) {
    image
      .create('wujjpp/hello-node', 'latest')
      .then(o => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('ls', function(done) {
    image
      .ls()
      .then(images => {
        expect(images.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('build', function(done) {
    let params = {
      remote: 'https://raw.githubusercontent.com/wujjpp/hello-node/master/Dockerfile2',
      t: 'wujjpp/build-by-api:0.0.1',
      rm: false,
      networkmode: 'host'
      // pull: 'wujjpp/hello-node:laest' // indicate if force checking base image even if exists lat local
    }

    image
      .build(params)
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })



  it('inspect', function(done) {
    let imageName = 'wujjpp/hello-node:latest'
    image
      .inspect(imageName)
      .then(image => {
        let b = _.includes(image.RepoTags, imageName)
        expect(b).to.be.equal(true)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('history', function(done) {
    let imageName = 'wujjpp/hello-node:latest'
    image
      .history(imageName)
      .then(histories => {
        expect(histories.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  // it('push', function(done) {
  //   let imageName = 'wujjpp/build-by-api:0.0.1'
  //   let credentials =
  //     {
  //       username: 'wujjpp',
  //       password: '***',
  //       serveraddress: 'https://index.docker.io/v1/'
  //     }
  //
  //   image
  //     .push(imageName, credentials)
  //     .then(() => {
  //       done()
  //     })
  //     .catch(err => {
  //       done(err)
  //     })
  // })

  it('tag', function(done) {
    let imageName = 'wujjpp/build-by-api:0.0.1'
    image
      .tag(imageName, 'git.qixin007.com:5009/docker/build-by-api', '0.0.1')
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('rm', function(done) {
    let imageName = 'wujjpp/build-by-api:0.0.1'
    image
      .rm(imageName, true)
      .then(tags => {
        expect(tags.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('search', function(done) {
    image
      .search('sshd')
      .then(results => {
        expect(results.length).to.be.greaterThan(0)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('prune', function(done) {
    image
      .prune({ dangling: { 'false': true } })
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('cleanBuildCache', function(done) {
    image
      .cleanBuildCache()
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
