'use strict';

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./dist/aggregate-sdk.production.min.js');
} else {
    module.exports = require('./dist/aggregate-sdk.development.js');
}
