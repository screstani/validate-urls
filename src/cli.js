#!/usr/bin/env node
import chalk from 'chalk';
import fs from 'fs';
import { get } from 'http';
import getFile from './index.js';
import validList from './http-validacao.js';

const path = process.argv;

async function printList(valida, result, id = '') {
    if(valida) {
        console.log(
            chalk.yellow('lista validada'), 
            chalk.black.bgGreen(id),
            await validList(result))      
    } else {
        console.log(
            chalk.yellow('lista de links'), 
            chalk.black.bgGreen(id),
            result);
    }
}

async function textProcess(args) {
    const path = args[2];
    const valida = args[3] === '--valida';

    try {
        fs.lstatSync(path);
    } catch(erro) {
        if(erro.code === 'ENOENT') {
            console.log('there is no such file or directory');
            return;
        }
    }
    if(fs.lstatSync(path).isFile()) {
        const resultado = await getFile(args[2]);
        printList(valida, resultado);
    } else if (fs.lstatSync(path).isDirectory()) {
        const files = await fs.promises.readdir(path)
        files.forEach(async (fileName) => {
            const list = await getFile(`${path}/${fileName}`)
            printList(valida, list, fileName);
        })
    }
    
}

textProcess(path);