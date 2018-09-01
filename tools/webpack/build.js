/**
 * Created by Wu Jian Ping on 2017/3/20.
 */

import webpack from 'webpack'
import path from 'path'
import serverSharedConfig from './shared'

export default Object.assign({}, serverSharedConfig, {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [{
      test: /\.js$/i,
      use: ['babel-loader'],
      include: [path.join(process.cwd(), 'src')]
    } ]
  },

  externals: [
    (context, request, callback) => {
      const isExternal =
          // the module name start with ('@' or 'a-z') character and contains 'a-z' or '/' or '.' or '-' or '0-9'
          request.match(/^[@a-z][a-z/.\-0-9]*$/i)
          // environment config file, auto generated during build
          // console.log(request + '--------' + Boolean(isExternal))

      callback(null, Boolean(isExternal))
    }
  ],

  plugins: [

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      // 0.4.6
      comments: false,
      compress: {
        sequences: true, // join consecutive statemets with the “comma operator”
        properties: true, // optimize property access: a["foo"] → a.foo
        dead_code: true, // discard unreachable code
        drop_debugger: true, // discard “debugger” statements
        drop_console: true,
        unsafe: false, // some unsafe optimizations (see below)
        conditionals: true, // optimize if-s and conditional expressions
        comparisons: true, // optimize comparisons
        evaluate: true, // evaluate constant expressions
        booleans: true, // optimize boolean expressions
        loops: true, // optimize loops
        unused: true, // drop unused variables/functions
        hoist_funs: true, // hoist function declarations
        hoist_vars: false, // hoist variable declarations
        if_return: true, // optimize if-s followed by return/continue
        join_vars: true, // join var declarations
        cascade: true, // try to cascade `right` into `left` in sequences
        side_effects: true, // drop side-effect-free statements
        warnings: true // warn about potentially dangerous optimizations/code
      }
      // mangle: false

      // beta
      // uglifyOptions: {
      //   comments: false,
      //   compress: {
      //     warnings: false,
      //     drop_debugger: true,
      //     drop_console: true
      //   }
      //   // mangle: false
      // }
    })
  ],
  stats: {
    colors: true,
    warnings: true
  }
})
