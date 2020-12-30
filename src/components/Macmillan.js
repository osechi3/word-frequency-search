import axios from 'axios'
import $ from 'cheerio'

export default function getFrequencyMacmillan (word, english = 'american') {
  const url = `https://www.macmillandictionary.com/dictionary/${english}/${word}`
  return axios.get(url, { cors: true })
    .then(response => {
      const stars = $('.entry-red-star', response.data)

      if (!stars) {
        console.log('The word has no stars or the page is invalid')
        return 0
      }

      console.log(`Macmillan: ${stars.length}/3`)
      return stars.length
    })
}
