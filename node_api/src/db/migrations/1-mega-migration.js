'use strict';

/**
 * Actions summary:
 *
 * createTable "notices", deps: []
 * createTable "categories", deps: []
 * createTable "comments", deps: []
 * createTable "posts", deps: []
 * createTable "users", deps: []
 * createTable "Like", deps: []
 *
 **/

var info = {
  revision: 1,
  name: 'mega-migration',
  created: '2020-08-25T23:18:02.497Z',
  comment: '',
};

var migrationCommands = [
  {
    fn: 'createTable',
    params: [
      'notices',
      {},
      {
        charset: 'utf8mb4',
      },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'categories',
      {},
      {
        charset: 'utf8mb4',
      },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'comments',
      {},
      {
        charset: 'utf8mb4',
      },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'posts',
      {},
      {
        charset: 'utf8mb4',
      },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'users',
      {},
      {
        charset: 'utf8mb4',
      },
    ],
  },
  {
    fn: 'createTable',
    params: [
      'Like',
      {},
      {
        charset: 'utf8mb4',
      },
    ],
  },
];

module.exports = {
  pos: 0,
  up: function (queryInterface) {
    var index = this.pos;
    return new Promise(function (resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log('[#' + index + '] execute: ' + command.fn);
          index++;
          queryInterface[command.fn]
            .apply(queryInterface, command.params)
            .then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  info: info,
};
