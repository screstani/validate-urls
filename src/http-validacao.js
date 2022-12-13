import chalk from "chalk";

function extractLinks (arrLinks) {
    return arrLinks.map((objectLink) => Object.values(objectLink).join())
}

async function checkStatus(listaURLs) {
    const arrStatus = await Promise
        .all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return `${response.status} - ${response.statusText}`;
            } catch (erro) {
                return treatError(erro);
            }
        })
    )
    return arrStatus;
}

function treatError(erro) {
    if(erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado'
    } else {
        return 'ocorreu algum erro'
    }
}

export default async function validList(linksList) {
    const links = extractLinks(linksList);
    const status = await checkStatus(links);
    return linksList.map((object, indice) => ({
        ...object, 
        status: status[indice]
    }))
}

