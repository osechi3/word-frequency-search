import axios from 'axios'
import $ from 'cheerio'

export default function getFrequencyCollins (word) {
  const url = `https://www.collinsdictionary.com/dictionary/english/${word}`
  return axios.get(url)
    .then(response => {
      const dots = $('div.dictionary.dictentry:first-of-type .word-frequency-img > .roundRed', response.data)

      let result = {
        word,
        name: 'collins',
        amount: dots.length,
        explanation: explanations['star' + dots.length],
        url,
        notFound: false
      }

      if (dots.length < 1) {
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
  star1: 'Used rarely. The word is in the lower 50% of commonly used words.',
  star2: 'Used occasionally. One of the 30,000 most commonly used words.',
  star3: 'In Common Usage. One of the 10,000 most commonly used words.',
  star4: 'Very Common. One of the 4,000 most commonly used words.',
  star5: 'Extremely Common. One of the 1,000 most commonly used words.'
}
