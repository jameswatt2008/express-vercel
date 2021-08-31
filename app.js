const express = require('express');
const helmet = require('helmet');
const { ErrorResponseObject } = require('./common/http');
const routes = require('./routes');
var socketio = require('./socket.io/index');


const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(helmet());
app.use('/', routes);
app.use('/socket', socketio);


// default catch all handler
app.all('*', (req, res) => res.status(404).json(new ErrorResponseObject('route not defined')));

module.exports = app;
