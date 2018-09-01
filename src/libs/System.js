/**
 * Created by Wu Jian Ping on - 2018/08/26.
 */

import Compoment from './Compoment'

export default class System extends Compoment {
  auth(userName, password, serverAddress, email) {
    return this.request
      .post('/auth', {
        username: userName,
        password: password,
        serveraddress: serverAddress,
        email: email || undefined
      })
  }

  info() {
    return this.request.get('/info')
  }

  version() {
    return this.request.get('/version')
  }

  ping() {
    return this.request.get('/_ping')
  }

  usage() {
    return this.request.get('/system/df')
  }
}
