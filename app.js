// var app = require('express')();
// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// const { log } = require('console');
// const express = require('express');

const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;
// const port = process.env.PORT || 3001
const host = process.env.HOST || ''

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));

//引入db
// let db = require('./db/db');
// let Chat = db.Chat;//表
var usocket = {}, user = [];//user用户id，usocket用户socket
io.on('connection', function (socket) {//连接

    console.log('链接9999888887777', socket)
    socket.broadcast.emit('new message');


    socket.on('new message', (data) => {
        console.log('new message', data);
        // we tell the client to execute 'new message'
        socket.broadcast.emit('new message');
    });

    socket.on('add user', (username) => {
        console.log('add user');

        socket.emit('login');

    });



    socket.on('new_user', (userid) => {//登录
        console.log('new user');
        if (!(userid in usocket)) {
            // socket.userid = userid;
            // usocket[userid] = socket;
            // user.push(userid);
            // console.log('连接' + userid);
            // socket.emit('login', user);//获取在线人
            // socket.broadcast.emit('user_joined', userid, (user.length - 1));//回调
            // console.log('用户表' + user);
        }
    });



    socket.on('send_private_message', function (res) {//私聊   存记录 判断indexof
        console.log('send_private_message');
        socket.broadcast.emit('new message');
        socket.broadcast.emit('send_private_message');



    });



    socket.on('chatmessage', function (msg) {//发广播信息
        console.log('chatmessage')
        socket.broadcast.emit('chatmessage');

        // id = socket.id;
        // io.emit('chatmessage', { msg, id });
        // console.log('message: ' + msg + socket.id);
    });


    socket.on('disconnect', function () {
        console.log('disconnect');
    })
});










module.exports = app;

