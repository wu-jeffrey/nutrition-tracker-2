function httpErrorHandler(error, req, res, next) {
  console.log(error.message);
  res.status(500).send({error});
}

module.exports = httpErrorHandler;