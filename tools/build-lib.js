/**
 * Created by Wu Jian Ping on 2017/3/20.
 */

import webpack from 'webpack'
import webpackConfig from './webpack/build'

async function build() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        reject(err)
      } else {
        console.log(stats.toString(webpackConfig.stats)) //eslint-disable-line
        let statsJson = stats.toJson()
        if (statsJson.errors && statsJson.errors.length) {
          reject(statsJson.errors)
        } else {
          resolve()
        }
      }
    })
  })
}

export default {
  name: 'build lib',
  func: build
}
