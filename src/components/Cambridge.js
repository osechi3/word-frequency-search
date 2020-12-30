import axios from 'axios'
import $ from 'cheerio'

export default function getFrequencyCambridge (word) {
  const url = `https://dictionary.cambridge.org/dictionary/english/${word}`
  return axios.get(url)
    .then(response => {
      const words = $('[data-id="cald4"] .pr.dsense', response.data)
        .text()
        .split('See more results »')

      const wordsFrequency = words.map(textPiece => {
        // console.log(textPiece)
        let meaning = textPiece.match(/\([A-Z\s]*\)/g)
        let frequency = textPiece.match(/\s[A-C][1-2]\s/g)

        if (meaning !== null) {
          meaning = meaning.toString()
        }

        if (frequency !== null) {
          frequency = frequency.toString().trim()
        }

        return {
          meaning,
          frequency
        }
      })

      let resultString = 'Cambridge: '
      wordsFrequency.forEach((word) => {
        if (word.meaning === null || word.frequency === null) {
          return
        }

        resultString += `${word.meaning}: ${word.frequency}; `
      })
      console.log(resultString)
      return resultString
    })
}
