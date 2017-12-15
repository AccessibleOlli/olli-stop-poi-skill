/*
© Copyright IBM Corp. 2017
*/


'use strict';

// Expertise configuration
require('dotenv').config();

// Initialize handler
const {handler} = require('./skill-sdk');
const manifest = require('./manifest.json');
handler.initialize();

// The expertise handler
require('./actions')();
