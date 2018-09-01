import path from 'path'
import config from '../config'

export default {
  target: 'node',
  entry: ['./src/index.js'],

  output: {
    path: path.join(process.cwd(), config.dist),
    filename: 'index.js',
    libraryTarget: 'umd'
  },

  resolveLoader: {
    modules: ['tools/loaders', 'node_modules']
  },

  node: {
    __filename: false,
    __dirname: false
  }
}
