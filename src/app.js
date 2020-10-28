/**
 * Created by Wu Jian Ping on - 2020/10/28.
 */

import Docker from './libs/Docker'

const docker = new Docker()

const services = docker.service.ls()

console.log(services)


