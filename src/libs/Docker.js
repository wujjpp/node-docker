import Container from './Container'
import Image from './Image'
import Node from './Node'
import Service from './Service'
import System from './System'

import {createRequest} from './request'

export default class Docker {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.request = createRequest(this.endpoint)

    this.container = new Container(this.request)
    this.image = new Image(this.request)
    this.node = new Node(this.request)
    this.service = new Service(this.request)
    this.system = new System(this.request)
  }
}
