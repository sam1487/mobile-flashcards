export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const DELETE_DECK = 'DELETE_DECK'
export const RECEIVE_FLASHCARDS = 'RECEIVE_FLASHCARDS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_FLASHCARD = 'ADD_FLASHCARD'

function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        deck: {
            id: generateUID(),
            title: title,
            flashcards: {},
        }
    }
}

export function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}

export function receiveFlashcards(flashcards) {
    return {
        type: RECEIVE_FLASHCARDS,
        flashcards
    }
}

export function addFlashcard(deckId, question, answer) {
    return {
        type: ADD_FLASHCARD,
        deckId: deckId,
        flashcard: {
            id: generateUID(),
            question: question,
            answer: answer,
        }

    }
}

