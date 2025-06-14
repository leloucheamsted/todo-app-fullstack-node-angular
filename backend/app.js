const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./models');

const app = express();
app.use(cors({
    origin: 'http://localhost:4200'
})); app.use(bodyParser.json());

require('./routes/task.routes')(app);
require('./routes/category.routes')(app);
require('./routes/tag.routes')(app);

db.sequelize.sync().then(() => {
    require('./init')();
}).catch(err => {
    console.error('Error synchro database:', err);
});

module.exports = app;