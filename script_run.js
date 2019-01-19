const os = require('os');
const fs = require('fs');
const { spawn } = require('child_process');

const script = 'script.bat'

module.exports.process = (data, cb) =>  {
    let bat;
    if(os.type() == 'Linux')   {
        bat = spawn(script, data.split(' '), {shell: true});
    }
    else if(os.type() == 'Windows_NT')   {
        let command = ['/c', script]
        command = command.concat(data.split(' '));
        bat = spawn('cmd.exe', command);
    }

    let output = '';
    bat.stdout.on('data', (data) => {
        output += data.toString();
    });
    bat.on('exit', (code) => {
        cb(output);
    });
}