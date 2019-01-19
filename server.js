const path = require('path');
const express = require('express');
const script = require('./script_run.js');

const server = express();

server.set('view engine', 'ejs');

server.get('/', (req, res) => {
    res.render('index');
});


server.get('/scripts/query.js', (req, res) => {
    res.sendFile(path.resolve('scripts/query.js'));
});

server.get('/scripts/jquery.min.js', (req, res) => {
    res.sendFile(path.resolve('scripts/jquery.min.js'));
});

server.post('/run', (req, res) => {
    req.on('data', data => {
        let d = JSON.parse(data);
        script.process(d.params, (output) => {
            res.send(JSON.stringify({"params":output}));
        });
    });
});

server.listen(8080, () => {
    console.log('Server Started...');
});
