import { receiveDecks } from './decks'
import { _getDecks } from '../utils/_DATA'

export function handleReceiveDecks() {
  return (dispatch) => {
    _getDecks()
      .then((data) => dispatch(receiveDecks(data)))
  }
}