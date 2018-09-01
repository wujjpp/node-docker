/**
 * Created by Wu Jian Ping on - 2018/08/29.
 */

import Compoment from './Compoment'

export default class Image extends Compoment {
  create(image, tag = 'latest') {
    return this.request.post('/images/create', {}, {
      params: {
        fromImage: image,
        tag
      }
    })
  }
}
