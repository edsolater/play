import { readFile, writeFile } from 'fs/promises'

const htmlText = await readFavouritesHTML()
const items = parseInfos(htmlText.match(/<DL>(.*?)<\/DL>/s)[0])
await writeParsedData(items)

/**
 *
 * @param {string} htmlText
 * @returns
 */
function parseInfos(htmlText, dictory = []) {
  console.log('html: ', htmlText.length)
  const linkInfos = htmlText.match(/<A(.*?)>(.*?)<\/A>/g)
  const items = Array.from(linkInfos).map((item) => ({
    url: item.match(/HREF="(?<url>.*?)"/)?.groups.url,
    icon: item.match(/ICON="(?<icon>.*?)"/)?.groups.icon,
    date: item.match(/ADD_DATE="(?<date>.*?)"/)?.groups.date,
    name: item.match(/>(?<name>.*?)</)?.groups.name
  }))
  return items
}

async function readFavouritesHTML() {
  return readFile('./data/browser_favorites.html').then((data) => data.toString())
}

/**
 *
 * @param {any[]} items
 */
async function writeParsedData(items) {
  await writeFile('./data/browser_favorites.json', JSON.stringify(items, null, 2))
}
