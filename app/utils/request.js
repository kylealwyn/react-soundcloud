let request = require('superagent');
let q = require('q');

module.exports = (action, endpoint) => {
  let deferred = q.defer();

  request[action](endpoint)
    .accept('application/json')
    .end((err, results) => {
      if (!err) {
        deferred.resolve(results);
      } else {
        deferred.reject(results);
      }
    });

  return deferred.promise;
};
