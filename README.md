# winston-json-log-formatter
[![npm version](https://badge.fury.io/js/winston-json-log-formatter.svg)](https://www.npmjs.com/package/winston-json-log-formatter)

This is a very simple Node.js module which creates a console transport (by default) for [winston](https://github.com/winstonjs/winston) to log messages in JSON format.

## Requirements
* Node.js >= 8.3.0
* winston@3

## Install
```npm install winston-json-log-formatter```

## Usage/Features
Import the module in your source code which imports winston also.
```javascript
const winston = require('winston');
const wjlf = require('winston-json-log-formatter');
```

Setup the console transport which will log in JSON.
```javascript
wjlf.setupTransport(winston);
```

You can log dates automatically.
```javascript
wjlf.setupTransport(winston, true);
```

Also you can bind properties to every log message.
```javascript
wjlf.setupTransport(winston, false, { requestId: 'id' });
```

If you want to use the formatter only then you can access it via ```wjlf.logFormatter```


How to log: just use winston.
```javascript
winston.info('test message');
winston.info('message with meta object', { propertyOne: 1, propertyTwo: 'two' });
```

## Example Lambda handler function
```javascript
'use strict';

const winston = require('winston');
const wjlf = require('winston-json-log-formatter');

const handler = async (event, context) => {
  wjlf.setupTransport(winston, true, { awsRequestId: context.awsRequestId, foo: 'bar' });

  winston.log('info', 'starting', {
    nodeVersion: process.version,
    platform: process.platform,
    architecture: process.arch,
    timezoneOffset: new Date().getTimezoneOffset() / 60,
  });

  winston.info('test message');

  winston.error('error occurred', {
    error: {
      message: 'ERR_MSG',
      code: 145,
    },
  });

  return 'ok';
};

module.exports = {
  handler,
};
```

Output log messages are filterable in AWS CloudWatch Logs.


JSON
```json
{"date":"2020-05-03T16:32:32.123Z","level":"info","message":"starting","meta":{"nodeVersion":"v12.16.1","platform":"linux","architecture":"x64","timezoneOffset":0},"awsRequestId":"fc121189-1778-40a0-882b-0f186f61285e","foo":"bar"}
{"date":"2020-05-03T16:32:32.160Z","level":"info","message":"test message","awsRequestId":"fc121189-1778-40a0-882b-0f186f61285e","foo":"bar"}
{"date":"2020-05-03T16:32:32.160Z","level":"error","message":"error occurred","meta":{"error":{"message":"ERR_MSG","code":145}},"awsRequestId":"fc121189-1778-40a0-882b-0f186f61285e","foo":"bar"}
```

AWS CloudWatch Logs
![AWS CloudWatch Logs](https://i.imgur.com/bZnRmye.png)

## License
The MIT License (MIT)
