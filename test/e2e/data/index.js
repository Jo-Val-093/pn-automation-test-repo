'use strict';
const ENV_NAME = process.env.ENV_NAME ;

console.log('**'+ENV_NAME+'**');

switch (ENV_NAME) {

    case 'dev':
        module.exports = require('./dev.js');
        break;
    case 'test':
        module.exports = require('./test.js');
        break;
    case 'pre':
        module.exports = require('./pre.js');
        break;
    case 'pre-us':
        module.exports = require('./pre.js');
        break;
    case 'pre-eu':
        module.exports = require('./pre.js');
        break;
    case 'prod':
        module.exports = require('./prod.js');
        break;
    case 'prod-us':
        module.exports = require('./prod.js');
        break;
    case 'prod-eu':
        module.exports = require('./prod.js');
        break;
    default:
        console.error("Unrecognised NODE_ENV: " + process.env.ENV_NAME);
        process.exit(1);
}