### Overview

This is a flashcard app built with React Native for the React Udacity Nanodegree program. It provides an interface where users can create decks of flashcards, add flashcards to a deck, run a quiz on any deck with a summary of their performance at the end of the quiz.

This projects demonstartes a couple of react native features and integrations, including: 
- React Native Navigation (v4)
- State management with Redux
- Offline storage with AsyncStorage (expo)
- Local Notifications

###  Running the project

After checking out the project from Git, run the following commands

```
yarn install
yarn start
```

### Data Store Structure
Offilne data is stored in a slightly different form than what was suggested in the course. I've decided to use this simplified structure: 

Decks:
```
{
  "deck-id-1": {
    "id": "deck-id-1",
    "title": "...",
    "flashcards": {
        "card-id-1": {
	    "id": "card-id-1",
	    "question": "...",
	    "answer": "..."
         },
	 ...
     }
  },
  "deck-id-2": {
    "id": "deck-id-2",
    "title": "...",
    "flashcards": {
        "card-id-1": {
	    "id": "card-id-1",
	    "question": "...",
	    "answer": "..."
         },
	 ...
     }
  },
  ...
}
```

### Redux Store Structure

For simplicity, the redux store is structured in the exact same way. Technically we can get rid of the redux store and depend on the offline storage for state. But that may not be convenient for many practical projects.


