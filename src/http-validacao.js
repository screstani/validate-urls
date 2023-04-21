import chalk from 'chalk';
import axios from 'axios';

function extractLinks(text) {
    const regex = /https?:\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))/gm;
    const capturas = [...text.match(regex)];
    checkStatus(capturas);
}

async function checkStatus(urlArr, method = 'GET') {
    for (const url of urlArr) {
        try {
            const response = await axios.request({
                method,
                url,
                timeout: 5000 // 5 second timeout
            });
            console.log(chalk.blue(`Link:`),chalk.white(`${url}`),chalk.green(`- ${response.status} - ${response.statusText}`));
        } catch (error) {
            console.log(chalk.blue(`Link:`),chalk.white(`${url}`),chalk.red(`- ${error.message}`));
        }
    }
    console.log(chalk.yellow('Fim do Carregamento.'));
}

export default extractLinks;
