/**
 * Created by Wu Jian Ping on - 2018/08/28.
 */

const image = docker.image

describe('Test Image Module', function() {
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
})
