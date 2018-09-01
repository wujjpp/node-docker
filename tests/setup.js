/* eslint-disable */
var Docker = require('../src')
global.docker = new Docker('http://192.168.31.131:2376')
process.env.NODE_ENV = 'test';
/* eslint-enable */
