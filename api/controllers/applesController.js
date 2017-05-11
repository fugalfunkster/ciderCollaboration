'use strict';

const pgpool = require('../../pgpool');
const internalServerError = require('../responses/internalServerError');
const notFound = require('../responses/notFound');

exports.collection = function(req, res) {
  pgpool.query('SELECT * FROM APPLES')
    .then((result) => { res.status(200).json({ metadata: {}, apples: result.rows }); })
    .catch(err => internalServerError(res, 'Internal Server Error', err));
};

exports.create = function(req, res) {
  const name = req.body.name;
  if (!name) {
    res.status(400).json({ error_message: 'The apple\'s name must be provided in request body' });
    return;
  }

  pgpool.query('INSERT INTO APPLES (name) values ($1) RETURNING *', [name])
    .then((result) => { res.status(201).json({ metadata: {}, apple: result.rows[0] }); })
    .catch(err => internalServerError(res, 'Internal Server Error', err));
};

exports.member = function(req, res) {
  if (!req.params.id) {
    res.status(400).json({ error_message: 'id parameter value required' });
    return;
  }

  pgpool.query('SELECT * FROM APPLES WHERE id = $1', [req.params.id])
    .then((result) => {
      if (result.rowCount !== 1) {
        notFound(res, `Apple not found for id ${req.params.id}`);
      } else {
        res.status(200).json({ metadata: {}, apple: result.rows[0] });
      }
    })
    .catch(err => internalServerError(res, 'Internal Server Error', err));
};

exports.update = function(req, res) {
  res.sendStatus(405);
};

exports.delete = function(req, res) {
  res.sendStatus(405);
};
