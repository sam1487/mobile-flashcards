import AsyncStorage from '@react-native-community/async-storage';

function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

let localDecks = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    title: 'Capital Cities',
    flashcards: {
      '8xf0y6ziyjabvozdd253nd-1': {
        id: '8xf0y6ziyjabvozdd253nd-1',
        question: 'USA',
        answer: 'Washington DC'
      },
      '8xf0y6ziyjabvozdd253nd-2': {
        id: '8xf0y6ziyjabvozdd253nd-2',
        question: 'Bangladesh',
        answer: 'Dhaka'
      },
      '8xf0y6ziyjabvozdd253nd-3': {
        id: '8xf0y6ziyjabvozdd253nd-3',
        question: 'France',
        answer: 'Paris'
      },
    }
  },
  "2": {
    id: '2',
    title: 'Easy Words',
    flashcards: {
      '2-1': {
        id: '2-1',
        question: 'Apathy',
        answer: 'Lack of feeling'
      },
      '2-2': {
        id: '2-2',
        question: 'Antipathy',
        answer: 'Deep dislike'
      },
    }
  },
  "3": {
    id: '3',
    title: 'Difficult Words',
    flashcards: {},
  },
}

const storageKey = '@mobile-flashcards:data'

function formatCard(question, answer) {
  return {
    id: generateUID(),
    question: question,
    answer: answer,
  }
}

function formatDeck(title) {
  return {
    id: generateUID(),
    title: title,
    flashcards: {}
  }
}

async function getDecksFromStorage() {
  const decks = await AsyncStorage.getItem(storageKey);
  if (!decks) {
    return {};
  }
  return JSON.parse(decks);
}

export async function _getDecks() {
  const decks = await getDecksFromStorage();
  if (Object.keys(decks).length === 0) {
    // console.log('No data found in storage, loading with default data')
    // return localDecks;
    return {}
  }
  return decks;

  // return new Promise((res, rej) => {
  //   setTimeout(() => res({ ...decks }), 1000)
  // })
}

async function _saveDecks(decks) {
  await AsyncStorage.setItem(storageKey, JSON.stringify(decks));
}

export async function _addDeck(title) {
  const formattedDeck = formatDeck(title)
  const decks = await getDecksFromStorage();
  decks[formattedDeck.id] = formattedDeck;
  await _saveDecks(decks);
  console.log('Returning formatted deck: ', formattedDeck)
  return formattedDeck;
}

export async function _deleteDeck(deckId) {
  const decks = await getDecksFromStorage();
  delete decks[deckId];
  await _saveDecks(decks);
}


export async function _addFlashcard(deckId, question, answer) {
    const formattedCard = formatCard(question, answer);
    const decks = await getDecksFromStorage();
    decks[deckId].flashcards[formattedCard.id] = formattedCard;
    await _saveDecks(decks);
    return formattedCard;
  // return new Promise((res, rej) => {
  //   const formattedCard = formatCard({question, answer});

  //   setTimeout(() => {
  //     decks[deckId].flashcards[formattedCard.id] = formattedCard;
  //     res({deckId: deckId, card: formattedCard});
  //   }, 1000)
  // })
}

