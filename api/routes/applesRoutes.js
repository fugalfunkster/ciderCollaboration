'use strict';

module.exports = function(app) {
  const apples = require('../controllers/applesController');

  app.route('/api/v1/apples')
    .get(apples.collection)
    .post(apples.create);

  app.route('/api/v1/apples/:id')
    .get(apples.member)
    .put(apples.update)
    .delete(apples.delete);
};
