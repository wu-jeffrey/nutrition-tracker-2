const db = require('./db/index.js');
const app = require('./app.js');
const PORT = process.env.PORT || 5000;

db.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
  });
