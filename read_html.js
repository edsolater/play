import { readFile, writeFile } from 'fs/promises'
import { parse } from 'node-html-parser'
import { map } from '@edsolater/fnkit'

const htmlText = await readFavouritesHTML()
const source = htmlText.replace(/<p>/g, '').match(/<DL>(.*)<\/DL>/s)[0]
const tree = parse(source)
const root = tree.childNodes[0]
console.log(
  'root: ',
  root.childNodes
    .filter((i) => !i.rawText.match(/^\s+.*/))
    .map((item) => (isHtmlNode(item) ? item.rawText : item.rawText))
)

console.log(
  's: ',
  map(new Set([1]), (i) => i + 1)
)
/**
 *
 * @param {string} text
 * @returns
 */
function splitToArray(text) {
  return Array.from(text.match(/(?:(?<=\s*)<DT><A.*?>.*?<\/A>)|(?:(?<=\s*)<DT><H3.*?>.*?<\/H3>)/gm))
}

/**
 *
 * @param {string} node
 */
function isNodeH3(node) {
  return node.startsWith('<H3')
}

/**
 *
 * @param {string} htmlText
 * @returns
 */
function parseA(htmlText, dictory = []) {
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
/**
 *
 * @param {Node} node
 * @returns {node is HTMLElement}
 */
function isHtmlNode(node) {
  return node.nodeType === 1
}
