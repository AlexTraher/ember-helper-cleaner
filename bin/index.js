#!/usr/bin/env node

const { getUnusedHelpers } = require('../lib/index.js');

getUnusedHelpers(process.cwd());