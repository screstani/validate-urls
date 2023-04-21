import axios from 'axios';
import chalk from 'chalk';
import extractLinks from './http-validacao.js'

function getError(err) {
    throw new Error(chalk.red(err.code, 'address not found'));
}

async function getPage(website, method = 'GET') {
    try {
        const response = await axios.request({
            method,
            url: website,
            responseType: 'text',
            timeout: 5000 // 5 second timeout
        });
        const text = response.data;
        extractLinks(text);
    } catch (error) {
        console.log(chalk.red(error.message));
    }
}

export default getPage;
