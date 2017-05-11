'use strict';

function internalServerError(res, msg, err) {
  console.error(err);
  res.status(404).json({ error_message: msg });
}

module.exports = internalServerError;
