let request = require('superagent');

class Request {
  constructor(action, endpoint) {
    console.log(action);
    return request[action](endpoint)
  }
}

module.exports = Request;
