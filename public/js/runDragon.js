var exec = require('child_process').exec, child;

child = exec('~/Documents/dragon/raspberryPi/testServo',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
 child();