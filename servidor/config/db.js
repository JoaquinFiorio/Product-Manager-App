const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const conectarDB = mongoose.connect(process.env.DB_MONGO).then((db) => console.log("db in connected"))
    .catch((err) => console.error(err));

module.exports = conectarDB