const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
