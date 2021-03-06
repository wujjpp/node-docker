/**
 * Created by Wu Jian Ping on - 2018/09/01.
 */

import Promise from 'bluebird'
import Container from './Container'
import Image from './Image'
import Node from './Node'
import Service from './Service'
import System from './System'
import Network from './Network'
import Volume from './Volume'

import { createRequest } from './request'

export default class Docker {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.request = createRequest(this.endpoint)
    this.container = new Container(this.request)
    this.image = new Image(this.request)
    this.node = new Node(this.request)
    this.service = new Service(this.request)
    this.system = new System(this.request)
    this.network = new Network(this.request)
    this.volume = new Volume(this.request)
  }

  prune() {
    return new Promise((resolve, reject) => {
      Promise
        .resolve()
        .then(() => {
          return this.container.prune()
        })
        .then(() => {
          return this.network.prune()
        })
        .then(() => {
          return this.image.prune({ dangling: { 'false': true } })
        })
        .then(() => {
          return this.image.cleanBuildCache()
        })
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
