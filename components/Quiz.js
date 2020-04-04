import React from 'react'
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addFlashcard, } from '../actions/decks'

class Quiz extends React.Component {
  state = {
    nextIndex: 0,
    correct: 0,
    incorrect: 0,
    showAnswer: false,
  }

  showAnswer = () => {

  }

  computeAccuracy = () => {
    const total = this.state.correct + this.state.incorrect;
    if (total === 0) return 0;

    return (this.state.correct * 100.0) / total;
  }

  handleCorrect = () => {
    this.setState((prevState) => ({
      nextIndex: prevState.nextIndex + 1,
      correct: prevState.correct + 1,
      showAnswer: false
    }));
  } 
  
  handleIncorrect = () => {
    this.setState((prevState) => ({
      nextIndex: prevState.nextIndex + 1,
      incorrect: prevState.incorrect + 1,
      showAnswer: false
    }));
  }

  handleBackToDeck = () => {
    this.props.navigation.goBack();
  }

  renderCompleted = () => {
    const { deck } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'center'}}>
          <Text style={{ textAlign: 'center', fontSize: 30, marginBottom: 30 }}>Quiz Completed!</Text>
          <View style={{alignSelf: 'center', borderRadius: 10, backgroundColor: 'darkslateblue', padding: 20, }}>
            <View style={{flexDirection: 'row', }}>
              <Text style={{ flex: 1, marginVertical: 10, fontSize: 24, color: 'whitesmoke' }}>Correct: </Text>
              <Text style={{ marginVertical: 10, marginLeft: 30, fontSize: 24, color: 'whitesmoke', textAlign: 'right', fontWeight: 'bold'}}>{this.state.correct}</Text>
            </View>
            <View style={{flexDirection: 'row', }}>
              <Text style={{ flex: 1, marginVertical: 10, fontSize: 24, color: 'whitesmoke' }}>Total: </Text>
              <Text style={{ marginVertical: 10, marginLeft: 30, fontSize: 24, color: 'whitesmoke', textAlign: 'right', fontWeight: 'bold'}}>{Object.keys(deck.flashcards).length}</Text>
            </View>
            <View style={{flexDirection: 'row', }}>
              <Text style={{ flex: 1, marginVertical: 10, fontSize: 24, color: 'whitesmoke' }}>Accuracy:</Text>
              <Text style={{ marginVertical: 10, marginLeft: 30, fontSize: 24, color: 'whitesmoke', fontWeight: 'bold'}}>{this.computeAccuracy().toFixed(1)}%</Text>
            </View>
          </View>
        </View>
        <View style={{marginBottom: 50, paddingHorizontal: 50}}>
          <TouchableOpacity onPress={this.handleBackToDeck}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'darkgreen', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Back to Deck</Text>
            </View>
          </TouchableOpacity>
          </View>
      </View>
    );
  }

  renderFlashcard = () => {
    const { deck } = this.props.navigation.state.params;
    const flashcardIds = Object.keys(deck.flashcards);
    const flashcard = deck.flashcards[flashcardIds[this.state.nextIndex]];

    return (
      <View style={{flex: 1}}>
        <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 10, justifyContent: 'flex-start' }}>
          <Text style={{ marginTop: 10, textAlign: 'center', fontSize: 20, color: 'darkgray' }}>{this.state.nextIndex+1} of {flashcardIds.length}</Text>
          <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 30 }}>{flashcard.question}</Text>
          <Text style={{ marginTop: 20, textAlign: 'center', fontSize: 20, color: 'darkslategray' }}>{this.state.showAnswer ? flashcard.answer : ' '}</Text>
          <TouchableOpacity onPress={() => this.setState({showAnswer: true})}>
            <View style={{ marginVertical: 20, marginHorizontal: 100, backgroundColor: 'indigo', borderRadius: 20, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Answer</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end', paddingHorizontal: 50, paddingVertical: 100 }}>
          <TouchableOpacity onPress={this.handleCorrect}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'darkgreen', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Correct</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={this.handleIncorrect}>
            <View style={{ minWidth: '50%', marginVertical: 10, backgroundColor: 'darkred', borderRadius: 5, padding: 10 }}>
              <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontWeight: 'bold' }}>Incorrect</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    console.log('Quiz props: ', this.props);
    const { deck } = this.props.navigation.state.params;
    const flashcardIds = Object.keys(deck.flashcards);

    if (flashcardIds.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Sorry, no flashcards in the deck! Add some cards to start a quiz.</Text>
        </View>
      );
    }

    if (this.state.nextIndex >= flashcardIds.length) {
      return this.renderCompleted();
    } else {
      return this.renderFlashcard();
    }
  }
}

export default connect()(Quiz)