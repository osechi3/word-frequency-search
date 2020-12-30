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

    this.initListeners()
  }

  initListeners () {
    this.searchInput.addEventListener('keyup', this.searchWithEnter.bind(this))
    this.searchButton.addEventListener('click', this.search.bind(this))

    // DELETE
    window.addEventListener('resize', () => {
      console.log(window.innerWidth)
    })

    PubSub.subscribe('frequency_found', (msg, frequency) => {
      this.displayFrequency(frequency)
    })
  }

  async search () {
    const macmillan = await getFrequencyMacmillan(this.searchInput.value)

    getFrequencyLongman(this.searchInput.value)
    getFrequencyCollins(this.searchInput.value)
    getFrequencyCambridge(this.searchInput.value)
    this.searchInput.value = ''

    PubSub.publish('frequency_found', {
      macmillan,
      longman: '',
      collins: '',
      cambridge: ''
    })
  }

  searchWithEnter (e) {
    if (e.key === 'Enter') {
      this.searchButton.click()
    }
  }

  displayFrequency (frequencyObject) {
    // eslint-disable-next-line no-unused-vars
    const { macmillan, longman, collins, cambridge } = frequencyObject

    const macmillanEntry = document.querySelector('.macmillan')

    const frequencyIcons = macmillanEntry.querySelectorAll('.entry__frequency-icon')
    frequencyIcons.forEach((icon, i) => {
      if (i < macmillan.amount) {
        icon.classList.add('entry__frequency-icon_toggled')
      }
    })

    const entryExplanation =
      macmillanEntry.querySelector('.entry__frequency-explanation')
    entryExplanation.textContent = macmillan.explanation

    const wordLink = macmillanEntry.querySelector('.entry__dictionary-link')
    wordLink.href = macmillan.url
  }
}

// eslint-disable-next-line no-new
new App()
