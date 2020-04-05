import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { handleDeleteDeck } from '../actions/decks'

class Deck extends React.Component {

  handleDelete = () => {
    const { deck } = this.props
    this.props.dispatch(handleDeleteDeck(deck.id))
    this.props.navigation.goBack();
  }

  deleteDeck = () => {
    const { deck } = this.props
    console.log('Deleteing deck: ', deck);
    this.handleDelete();
    Alert.alert(
      deck.title,
      'Are you sure you want to delete the deck?',
      [
        { text: 'Yes', onPress: () => this.handleDelete() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );

  }


  render() {
    console.log('Deck props: ', this.props);
    const { deck } = this.props

    if (!deck) {
      return null
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 30 }}>{deck.title}</Text>
          <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 20, color: 'darkslategray' }}>{Object.keys(deck.flashcards).length} Cards in Deck</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-start', paddingHorizontal: 50 }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddCard', { deck: deck })}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'darkslategray', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Add Card</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Quiz', { deck: deck })}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'darkgoldenrod', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Start Quiz</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 50, paddingBottom: 100 }}>
          <TouchableOpacity onPress={this.deleteDeck}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'maroon', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Delete Deck</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    deck: state.decks[props.navigation.state.params.deck.id]
  }
}

export default connect(mapStateToProps)(Deck)