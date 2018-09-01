/**
 * Created by Wu Jian Ping on 2017/3/20.
 */

import run from './run'
import clean from './clean'
import { copyPkg } from './copy'
import buildLib from './build-lib'

async function build() {
  await run(clean)
  await run(copyPkg)
  await run(buildLib)
}

export default {
  name: 'build all',
  func: build
}
