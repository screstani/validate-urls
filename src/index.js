import axios from 'axios';
import chalk from 'chalk';
import extractLinks from './http-validacao.js'

function getError (err) {
    throw new Error(chalk.red(err.code, 'address not found'));
}

async function getPage(website) {
    let data = await axios({
            method: 'get',
            url: website,
            responseType: 'text'
        })
    .then((data) => {
        let text = data.data
        extractLinks(text);

    })
    .catch(getError)
}
export default getPage;
