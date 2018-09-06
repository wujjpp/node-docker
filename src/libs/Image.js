/**
 * Created by Wu Jian Ping on - 2018/08/29.
 */

import Compoment from './Compoment'

export default class Image extends Compoment {
  create(image, tag = 'latest', credentials = null) {
    let config = {
      params: {
        fromImage: image,
        tag
      }
    }

    if (credentials) {
      config.headers = {
        'X-Registry-Auth': (Buffer.from(JSON.stringify(credentials))).toString('base64')
      }
    }

    return this.request.post('/images/create', {}, config)
  }
}
