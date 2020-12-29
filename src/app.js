import './styles/app.scss'
import 'normalize-scss'

const searchInput = document.querySelector('.search__input')
const searchButton = document.querySelector('.search__search-btn')

searchInput.addEventListener('keyup', searchWithEnter.bind(this))
searchButton.addEventListener('click', search)

function search () {
  console.log(searchInput.value)
  searchInput.value = ''
}

function searchWithEnter (e) {
  if (e.key === 'Enter') {
    searchButton.click()
  }
}
