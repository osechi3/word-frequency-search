import axios from 'axios'
import $ from 'cheerio'

export default function getFrequencyLongman (word) {
  const url = `https://www.ldoceonline.com/dictionary/${word}`
  return axios.get(url)
    .then(response => {
      let dots = $('span.dictentry:first-of-type .tooltip.LEVEL', response.data).text().trim().split('')
      dots = dots.filter(dot => dot === '●')

      let result = {
        word,
        name: 'longman',
        amount: dots.length,
        explanation: explanations['star' + dots.length],
        url,
        notFound: false
      }

      if (/Did you mean:/.test(response.data)) {
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
  star0: 'The word is NOT included into 9000 most important words to learn.',
  star1: 'Among 9000 of the most important words to learn.',
  star2: 'Among 6000 of the most important words to learn.',
  star3: 'Among 3000 of the most important words to learn.'
}
