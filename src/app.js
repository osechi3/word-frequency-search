import './styles/app.scss'
import 'normalize-scss'

import getFrequencyMacmillan from './components/Macmillan'
import getFrequencyLongman from './components/Longman'
import getFrequencyCollins from './components/Collins'
import getFrequencyCambridge from './components/Cambridge'

const searchInput = document.querySelector('.search__input')
const searchButton = document.querySelector('.search__search-btn')

searchInput.addEventListener('keyup', searchWithEnter.bind(this))
searchButton.addEventListener('click', search)

// DELETE
window.addEventListener('resize', () => {
  console.log(window.innerWidth)
})

function search () {
  getFrequencyMacmillan(searchInput.value)
  getFrequencyLongman(searchInput.value)
  getFrequencyCollins(searchInput.value)
  getFrequencyCambridge(searchInput.value)
  searchInput.value = ''
}

function searchWithEnter (e) {
  if (e.key === 'Enter') {
    searchButton.click()
  }
}
