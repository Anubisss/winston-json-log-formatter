'use strict';

const logFormatter = (logDate, fixedMetaParams, options) => {
  const date = logDate ? (new Date()).toISOString() : undefined;
  const { level, message, ...meta } = options;

  return JSON.stringify({
    date,
    level,
    message,
    meta: Object.keys(meta).length > 0 ? meta : undefined,
    ...fixedMetaParams,
  });
};

const setupTransport = (winston, logDate = false, fixedMetaParams = null) => {
  winston.add(new winston.transports.Console({
    format: winston.format.printf(logFormatter.bind(null, logDate, fixedMetaParams)),
  }));
};

module.exports = {
  logFormatter,
  setupTransport,
};
