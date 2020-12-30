import axios from 'axios'
import $ from 'cheerio'

export default function getFrequencyMacmillan (word, english = 'american') {
  const url = `https://www.macmillandictionary.com/dictionary/${english}/${word}`
  return axios.get(url, { cors: true })
    .then(response => {
      const stars = $('.entry-red-star', response.data)

      let result = {
        word,
        name: 'macmillan',
        amount: stars.length,
        explanation: explanations['star' + stars.length],
        url,
        notFound: false
      }

      if (/Sorry, no search result for/.test(response.data)) {
        result = Object.assign(result, {
          explanation: explanations.notFound,
          notFound: true
        })
      }

      return result
    })
}

const explanations = {
  notFound: 'The word is NOT found.',
  star0: 'The word is NOT included into 7500 most common words.',
  star1: 'Among 7500 of the most common words.',
  star2: 'Among 5000 of the most common words.',
  star3: 'Among 2500 of the most common words.'
}
