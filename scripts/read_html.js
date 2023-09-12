import { readFile } from 'fs/promises'

const fileText = await readFile('./data/browser_favorites.html').then((data) => data.toString())
const items = Array.from(fileText.match(/<A HREF="(.*)" ADD_DATE="(.*)">(.*)<\/A>/g)).map((item) => {
  const url = item.match(/HREF="(?<url>.*?)"/)?.groups.url
  const date = item.match(/ADD_DATE="(?<date>.*?)"/)?.groups.date
  const icon = item.match(/ICON="(?<icon>.*?)"/)?.groups.icon
  const name = item.match(/>(?<name>.*?)</)?.groups.name
  return {
    url,
    icon,
    date,
    name
  }
})
console.log('items: ', items.slice(0, 20))
