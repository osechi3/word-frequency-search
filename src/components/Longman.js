import axios from 'axios'
import $ from 'cheerio'

export default function getFrequencyLongman (word) {
  const url = `https://www.ldoceonline.com/dictionary/${word}`
  return axios.get(url)
    .then(response => {
      let dots = $('.tooltip.LEVEL', response.data).text().trim().split('')
      dots = dots.filter(dot => dot === '●')

      if (!dots) {
        console.log('The word has no dots or the page is invalid')
        return 0
      }

      console.log(`Longman: ${dots.length}/3`)
      return dots.length
    })
}
