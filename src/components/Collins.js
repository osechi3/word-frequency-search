import axios from 'axios'
import $ from 'cheerio'

export default function getFrequencyCollins (word) {
  const url = `https://www.collinsdictionary.com/dictionary/english/${word}`
  return axios.get(url)
    .then(response => {
      const dots = $('.dictionary.Cob_Adv_Brit.dictentry .word-frequency-img > .roundRed', response.data)

      if (!dots) {
        console.log('The word has no dots or the page is invalid')
        return 0
      }

      console.log(`Collins: ${dots.length}/5`)
      return dots.length
    })
}
