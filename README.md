# 备份Docker Swarm集群

## Features

- [Webpack 4](https://webpack.js.org/)
- [Babel 7](https://babeljs.io/)
- Supports server auto compile and restart

[![build status](http://gitlab.greatld.com:14444/qcc/app-backup-swarm/badges/master/build.svg)](http://gitlab.greatld.com:14444/qcc/app-backup-swarm/pipelines)
[![Quality Gate](http://10.0.0.213:9000/api/badges/gate?key=qcc:app-backup-swarm)](http://10.0.0.213:9000/dashboard?id=qcc%3Aapp-backup-swarm)

## How to Install

```shell
git clone http://gitlab.greatld.com:14444/qcc/app-backup-swarm.git
cd micro-service-boilerplate
npm install
```

## How to Run and Build

### Run

```shell
npm start
```

### Build

```shell
npm run build
```

## Analyse webpack stats

We have integrated tools for analysing bundled file, after run `npm run build`, try to type the following command in your terminal.

```shell
npm run analyse:server
```

```shell
npm run analyse
```

Made with ♥ by Wu Jian Ping
