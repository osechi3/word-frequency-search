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
      return {
        amount: stars.length,
        explanation: explanations['star' + stars.length],
        url
      }
    })
}

const explanations = {
  star1: 'Among 2500 of the most common words.',
  star2: 'Among 5000 of the most common words.',
  star3: 'Among 7500 of the most common words.'
}
