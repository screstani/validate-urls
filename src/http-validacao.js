import chalk from 'chalk';
import axios from 'axios';

function extractLinks(text) {
    const regex = /https?:\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))/gm;
    let capturas = [...text.match(regex)];
    checkStatus(capturas)
}

async function checkStatus(urlArr) {
    for (const url of urlArr) {
        const response = await fetch(url);
        if (response.status === 200) {
            console.log(chalk.blue(`Link:`),chalk.white(`${url}`),chalk.green(`- ${response.status} - ${response.statusText}`));
        } else {
            console.log(chalk.blue(`Link:`),chalk.white(`${url}`),chalk.red(`- ${response.status} - ${response.statusText}`));
        }
    }
    console.log(chalk.yellow('Fim do Carregamento.'));
}

export default extractLinks;