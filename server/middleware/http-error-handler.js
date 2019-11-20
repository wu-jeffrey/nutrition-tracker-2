function httpErrorHandler(error, req, res, next) {
  res.status(500).send({error});
}

module.exports = httpErrorHandler;