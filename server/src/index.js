/**
 * @name index
 * @description entry point for the server app
 */
//const express = require('express');

const logger = require('./service/logger.js');

const preStart = () => {
    logger.init();
};

preStart();

const test = async () => {
    const fs = require('fs');
    const crypto = require('./service/crypto.js');
    const io = require('./interop/io.js');


    const key = fs.readFileSync('/home/leo/.ssh/retropie_rsa');
    const encrypted = await crypto.encrypt(key);

    const pi = {
        id: 1,
        name: 'Leo\'s RetroPie',
        created_on: new Date(),
        private_key: encrypted,
        username: 'pi',
        host: 'retropie.local'
    };

    const systems = await io.getSystemList(pi);
    console.log(systems);
};

test().then(() => console.log('Done!'));