/**
 * Created by Wu Jian Ping on 2017/3/23.
 */

import { makeDir, writeFile } from './libs/fs'
import pkg from '../package.json'
import config from './config'

async function copyEnvConfigFunc(env) {
  await writeFile('src/env.json', JSON.stringify({ env }))
}

async function copyPkgFunc() {
  await makeDir(`${config.dist}`)
  // generate package.json
  await writeFile(`${config.dist}/package.json`, JSON.stringify({
    name: pkg.name,
    private: true,
    engines: pkg.engines,
    dependencies: pkg.dependencies,
    scripts: {
      start: 'node server.js'
    }
  }, null, 2))
}


export var copyPkg = { // eslint-disable-line
  name: 'generate package.json',
  func: copyPkgFunc
}

export var copyEnvConfig = { // eslint-disable-line
  name: 'generate env.json',
  func: copyEnvConfigFunc
}
