import { AsyncStorage } from 'react-native'
const DECK_STORAGE_KEY = 'UdaciCards:deck'

export function getDecks () {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then(JSON.parse)
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function clearDecks () {
  return AsyncStorage.removeItem(DECK_STORAGE_KEY)
}
