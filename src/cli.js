import chalk from 'chalk';
import getPage from './index.js';

let args = process.argv;
let siteAddress = args[2];

getPage(siteAddress);