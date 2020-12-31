import './styles/app.scss'
import 'normalize-scss'
import PubSub from 'pubsub-js'

import getFrequencyMacmillan from './components/Macmillan'
import getFrequencyLongman from './components/Longman'
import getFrequencyCollins from './components/Collins'
import getFrequencyCambridge from './components/Cambridge'

class App {
  constructor () {
    this.searchInput = document.querySelector('.search__input')
    this.searchButton = document.querySelector('.search__search-btn')
    this.entries = document.querySelectorAll('.entry')

    this.initListeners()
  }

  initListeners () {
    this.searchInput.addEventListener('keyup', this.searchWithEnter.bind(this))
    this.searchButton.addEventListener('click', this.search.bind(this))

    // DELETE
    window.addEventListener('resize', () => {
      console.log(window.innerWidth)
    })

    PubSub.subscribe('frequency_found', (msg, frequencies) => {
      this.resetEntries()
      this.displayFrequency(frequencies)
    })
  }

  async search () {
    const macmillan = await getFrequencyMacmillan(this.searchInput.value)
    const longman = await getFrequencyLongman(this.searchInput.value)

    getFrequencyCollins(this.searchInput.value)
    getFrequencyCambridge(this.searchInput.value)
    this.searchInput.value = ''

    PubSub.publish('frequency_found', [
      macmillan,
      longman
      // collins: '',
      // cambridge: ''
    ])
  }

  searchWithEnter (e) {
    if (e.key === 'Enter') {
      this.searchButton.click()
    }
  }

  displayFrequency (frequencies) {
    frequencies.forEach(frequency => {
      const entry = document.querySelector(`.${frequency.name}`)
      entry.classList.remove('entry_hidden')

      const entryExplanation =
        entry.querySelector('.entry__frequency-explanation')
      entryExplanation.textContent = frequency.explanation

      const wordLink = entry.querySelector('.entry__dictionary-link')

      if (frequency.notFound) {
        const entryFrequency = entry.querySelector('.entry__frequency')
        entryFrequency.classList.add('entry__frequency_not-found')
        wordLink.classList.add('entry__dictionary-link_not-found')
        return
      }

      const frequencyIcons = entry.querySelectorAll('.entry__frequency-icon')
      frequencyIcons.forEach((icon, i) => {
        if (i < frequency.amount) {
          icon.classList.add('entry__frequency-icon_toggled')
        }
      })

      wordLink.href = frequency.url
      wordLink.textContent = frequency.word
    })
  }

  resetEntries () {
    this.entries.forEach(entry => {
      entry.classList.add('entry_hidden')

      const frequencyIcons = entry.querySelectorAll('.entry__frequency-icon')
      frequencyIcons.forEach(icon => {
        icon.classList.remove('entry__frequency-icon_toggled')
      })

      const entryFrequency = entry.querySelector('.entry__frequency')
      entryFrequency.classList.remove('entry__frequency_not-found')

      const wordLink = entry.querySelector('.entry__dictionary-link')
      wordLink.classList.remove('entry__dictionary-link_not-found')
    })
  }
}

// eslint-disable-next-line no-new
new App()
